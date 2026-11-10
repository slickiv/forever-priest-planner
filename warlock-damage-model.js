/* Pure Warlock spell parsing and damage calculations. Shared by the browser and node tests. */
(function attachWarlockDamageModel(root) {
  function tooltipBase(spell, rank, modelLevel) {
    const text = rank.tooltip || "";
    const directMatch = text.match(/(?:causing|causes|dealing|deals) (\d+)(?: to (\d+))? [A-Za-z]+ damage/i) || text.match(/for (\d+)(?: to (\d+))? [A-Za-z]+ damage/i);
    let direct = directMatch ? { min: Number(directMatch[1]), max: Number(directMatch[2] || directMatch[1]) } : null;
    if (!direct && spell.kind === "direct-dot") {
      const hit = text.match(/for (\d+)(?: to (\d+))? [A-Za-z]+ damage/i);
      if (hit) direct = { min: Number(hit[1]), max: Number(hit[2] || hit[1]) };
    }

    const damageTick = text.match(/(?:dealing|causing) (\d+)(?: to (\d+))? [A-Za-z]+ damage every (\d+) sec(?:ond)?s?/i);
    const damageTickNoPeriod = text.match(/(?:dealing|causing) (\d+)(?: to (\d+))? [A-Za-z]+ damage every sec(?:ond)?s?/i);
    const leechTick = text.match(/Transfers (\d+) health(?: from the target to the caster)? every (\d+) sec(?:ond)?s?/i);
    const hellfire = text.match(/causing (\d+)(?: to (\d+))? [A-Za-z]+ damage to himself and (\d+)(?: to (\d+))? [A-Za-z]+ damage to all nearby enemies every (\d+) sec/i);
    const ticking = damageTick || (leechTick ? [leechTick[0], leechTick[1], leechTick[1], leechTick[2]] : null) || (damageTickNoPeriod ? [damageTickNoPeriod[0], damageTickNoPeriod[1], damageTickNoPeriod[2] || damageTickNoPeriod[1], "1"] : null) || (hellfire ? [hellfire[0], hellfire[3], hellfire[4] || hellfire[3], hellfire[5]] : null);
    const duration = Number(rank.duration) || 0;
    const period = ticking ? Number(ticking[3]) : rank.effects?.find(effect => effect.periodMs)?.periodMs / 1000 || 0;
    const ticks = period ? Math.round(duration / period) : 0;
    let periodicTotal = null;
    let tickRange = null;
    if (spell.kind === "direct-dot") {
      const match = text.match(/and then an additional (\d+)(?: to (\d+))? [A-Za-z]+ damage over (\d+) sec/i);
      if (match) periodicTotal = { min: Number(match[1]), max: Number(match[2] || match[1]) };
    } else if (ticking) {
      tickRange = { min: Number(ticking[1]), max: Number(ticking[2] || ticking[1]) };
      if (ticks) periodicTotal = { min: tickRange.min * ticks, max: tickRange.max * ticks };
    } else if (spell.kind.includes("dot")) {
      const damageOver = text.match(/(?:causing|dealing|for) (\d+)(?: to (\d+))? [A-Za-z]+ damage over (\d+) sec/i);
      const delayed = text.match(/causing (\d+)(?: to (\d+))? [A-Za-z]+ damage after (\d+) sec/i);
      const match = damageOver || delayed;
      if (match) periodicTotal = { min: Number(match[1]), max: Number(match[2] || match[1]) };
    }
    if (rank.tooltipDamageTotal != null) periodicTotal = { min: Number(rank.tooltipDamageTotal), max: Number(rank.tooltipDamageTotal) };

    const rangeFromEffect = effect => {
      if (!effect || effect.basePoints == null || effect.basePoints === 0) return null;
      const level = Math.max(Number(modelLevel) || 0, Number(rank.level) || 0);
      // Match saved client rank tooltips exactly at acquisition; apply the client PPL and variance above that level.
      if (level === Number(rank.level) && rank.tooltipRange) return { min: Number(rank.tooltipRange.min), max: Number(rank.tooltipRange.max) };
      const capped = effect.maxLevel == null ? level : Math.min(level, effect.maxLevel);
      const growth = Math.max(0, capped - (effect.baseLevel ?? rank.level));
      const mean = effect.basePoints + (effect.perLevel || 0) * growth;
      const spread = effect.variance || 0;
      return { min: Math.round(mean * (1 - spread / 2)), max: Math.round(mean * (1 + spread / 2)) };
    };
    const directEffectRange = rangeFromEffect(rank.effects?.find(effect => effect.type === "E_SCHOOL_DAMAGE"));
    const periodicEffectRange = rangeFromEffect(rank.effects?.find(effect => ["A_PERIODIC_DAMAGE", "A_PERIODIC_LEECH"].includes(effect.aura)));
    if (directEffectRange) direct = directEffectRange;
    if (periodicEffectRange && ticks) {
      tickRange = periodicEffectRange;
      periodicTotal = { min: tickRange.min * ticks, max: tickRange.max * ticks };
    }
    if (!direct && spell.kind === "direct") return { direct: null, periodicTotal: null, tickRange: null, ticks: 0, period };
    if (["dot", "channel-dot", "aoe-dot"].includes(spell.kind)) return { direct: null, periodicTotal, tickRange: tickRange || (periodicTotal && ticks ? { min: periodicTotal.min / ticks, max: periodicTotal.max / ticks } : null), ticks, period };
    return { direct, periodicTotal, tickRange, ticks, period };
  }

  function metrics(spell, rank, context = {}) {
    const talents = context.talents || {};
    const modelLevel = Math.max(Number(context.characterLevel) || 0, Number(rank.level) || 0);
    const base = tooltipBase(spell, rank, modelLevel);
    const effects = rank.effects || [];
    const directEffect = effects.find(effect => effect.type === "E_SCHOOL_DAMAGE");
    const periodicEffect = effects.find(effect => ["A_PERIODIC_DAMAGE", "A_PERIODIC_LEECH"].includes(effect.aura));
    const directCoef = directEffect?.spellPowerCoefficient || 0;
    const tickCoef = periodicEffect?.spellPowerCoefficient || 0;
    const demonicKnowledgeRate = [0, 0.33, 0.67, 1][Number(talents.warlockDemonicKnowledge) || 0] || 0;
    const demonicKnowledgeBonus = talents.warlockDemonicKnowledgeActive ? (Number(context.characterLevel) || Number(rank.level) || 0) * demonicKnowledgeRate : 0;
    const spellPower = (Number(context.spellPower) || 0) + demonicKnowledgeBonus;
    const immolateRequired = spell.name === "Conflagrate" || spell.name === "Incinerate";
    const eligible = !(spell.name === "Conflagrate" && !talents.warlockTargetImmolate);
    const immolateBonus = spell.name === "Incinerate" && talents.warlockTargetImmolate ? 1.25 : 1;
    const directBaseMin = base.direct?.min ?? null;
    const directBaseMax = base.direct?.max ?? null;
    const dotBaseMin = base.periodicTotal?.min ?? null;
    const dotBaseMax = base.periodicTotal?.max ?? null;
    const destructionBonuses = [0, 0.03, 0.07, 0.10];
    const damageMultipliers = [];
    if (spell.name === "Corruption" && talents.warlockImprovedCorruption) damageMultipliers.push(1 + 0.02 * talents.warlockImprovedCorruption);
    if (spell.school === "Shadow" && talents.warlockShadowMastery) damageMultipliers.push(1 + 0.02 * talents.warlockShadowMastery);
    if (spell.tree === "Destruction" && talents.warlockAgonizingFlames) damageMultipliers.push(1 + destructionBonuses[talents.warlockAgonizingFlames]);
    const damageMultiplier = damageMultipliers.reduce((product, multiplier) => product * multiplier, 1);
    const directMin = base.direct ? (base.direct.min + spellPower * directCoef) * damageMultiplier : null;
    const directMax = base.direct ? (base.direct.max + spellPower * directCoef) * damageMultiplier : null;
    const dotMin = base.periodicTotal ? (base.periodicTotal.min + spellPower * tickCoef * base.ticks) * damageMultiplier : null;
    const dotMax = base.periodicTotal ? (base.periodicTotal.max + spellPower * tickCoef * base.ticks) * damageMultiplier : null;
    const damageKnown = Boolean(base.direct || base.periodicTotal);
    const totalMin = damageKnown ? (directMin ?? 0) * immolateBonus + (dotMin ?? 0) : null;
    const totalMax = damageKnown ? (directMax ?? 0) * immolateBonus + (dotMax ?? 0) : null;
    const eventMean = damageKnown ? (totalMin + totalMax) / 2 : null;
    const isAoe = spell.kind === "aoe" || spell.kind === "aoe-dot" || spell.name === "Hellfire";
    const targets = isAoe ? Math.max(1, Math.min(10, Number(context.enemyTargets) || 1)) : 1;
    const critEligible = Boolean(base.direct || spell.periodicCanCrit);
    const shadowCritBonus = spell.school === "Shadow" ? Number(talents.warlockMalevolence) || 0 : 0;
    const agonyCritBonus = spell.name === "Searing Pain" ? destructionBonuses[talents.warlockAgonizingFlames] * 100 : 0;
    const conflagCritBonus = spell.name === "Conflagrate" ? [0, 8, 17, 25][talents.warlockFireAndBrimstone] : 0;
    const critChance = critEligible ? Math.max(0, Math.min(100, (Number(talents.baseCrit) || 0) + shadowCritBonus + agonyCritBonus + conflagCritBonus)) / 100 : 0;
    const afflictionCritSpells = ["Corruption", "Bane of Agony", "Bane of Doom", "Drain Soul", "Drain Life", "Siphon Life", "Wrack"];
    const pandemicBonus = afflictionCritSpells.includes(spell.name) ? [0, 33, 67, 100][talents.warlockPandemic] : 0;
    const ruinBonus = spell.tree === "Destruction" ? (Number(talents.warlockRuin) || 0) * 20 : 0;
    const critMultiplier = 1.5 + Math.max(pandemicBonus || 0, ruinBonus) / 200;
    const castTime = spell.name === "Corruption" ? Math.max(0, rank.castSeconds - 0.4 * (Number(talents.warlockImprovedCorruption) || 0)) : rank.castSeconds;
    const cast = castTime > 0 ? castTime : 1.5;
    const channel = spell.kind === "channel-dot" || spell.kind === "aoe-dot";
    const cycle = Math.max(channel ? rank.duration : cast, rank.cooldown || 0, base.ticks ? rank.duration : 0);
    const mana = rank.mana ?? null;
    const isAoeSpell = spell.kind === "aoe" || spell.kind === "aoe-dot" || spell.name === "Hellfire";
    const baneScenario = talents.warlockTalentBaneOfHavoc ? Number(talents.warlockBaneOfHavocScenario) || 0 : 0;
    let targetMultiplier = targets;
    if (isAoeSpell && baneScenario === 1) targetMultiplier = targets + 0.15 * Math.max(0, targets - 1);
    if (isAoeSpell && baneScenario === 2) targetMultiplier = targets * 1.15;
    if (!isAoeSpell && baneScenario === 3) targetMultiplier = 1.15;
    if (baneScenario === 4) targetMultiplier = 1;
    const baneScenarioNote = baneScenario === 1 && isAoeSpell ? "Bane: marked target is among AoE hits" : baneScenario === 2 && isAoeSpell ? "Bane: marked target is outside AoE" : baneScenario === 3 && !isAoeSpell ? "Bane: single-target hit also transfers 15%" : baneScenario === 4 ? "Bane: hit is only on marked target" : "";
    const expected = damageKnown ? eventMean * (critChance ? 1 + critChance * (critMultiplier - 1) : 1) * targetMultiplier : null;
    return { ...base, directBaseMin, directBaseMax, dotBaseMin, dotBaseMax, directMin: directMin == null ? null : directMin * immolateBonus, directMax: directMax == null ? null : directMax * immolateBonus, dotMin, dotMax, totalMin, totalMax, damageKnown, spellPower, demonicKnowledgeBonus, directCoef, tickCoef, damageMultiplier, talentDamageMultiplier: damageMultiplier, castTime, expectedDps: damageKnown && cycle ? expected / cycle : null, perMana: damageKnown && mana ? expected / mana : null, mana, cycle, critChance, critMultiplier, targets, isAoe, eligible, immolateRequired, targetMultiplier, baneScenarioNote };
  }

  function isTalentSpellVisible(spell, settings = {}) {
    return !spell.talentSetting || Boolean(settings[spell.talentSetting]);
  }

  function filterTalentVisibleSpells(spells, settings = {}) {
    return (spells || []).filter(spell => isTalentSpellVisible(spell, settings));
  }

  const api = { tooltipBase, metrics, isTalentSpellVisible, filterTalentVisibleSpells };
  root.WARLOCK_DAMAGE_MODEL = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window === "undefined" ? globalThis : window);
