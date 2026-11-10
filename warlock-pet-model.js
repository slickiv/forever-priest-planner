/* Per-cast pet damage only; this deliberately does not infer pet uptime or DPS. */
(function attachWarlockPetModel(root) {
  function perCast(spell, rank, context = {}) {
    const talents = context.talents || {};
    const petBonusLevel = Number(context.characterLevel) || Number(rank.level) || 0;
    const demonicKnowledgeRate = [0, 0.33, 0.67, 1][Number(talents.warlockDemonicKnowledge) || 0] || 0;
    const demonicKnowledgeBonus = talents.warlockDemonicKnowledgeActive ? petBonusLevel * demonicKnowledgeRate : 0;
    const spellPower = Math.max(0, Number(context.petSpellPower) || 0) + demonicKnowledgeBonus;
    const baseMin = rank.tooltipRange ? Number(rank.tooltipRange.min) : Math.round(rank.baseValue * (1 - (rank.variance || 0) / 2));
    const baseMax = rank.tooltipRange ? Number(rank.tooltipRange.max) : Math.round(rank.baseValue * (1 + (rank.variance || 0) / 2));
    const unholyPower = 1 + 0.02 * (Number(talents.warlockUnholyPower) || 0);
    const improvedImp = spell.pet === "Imp" && spell.name === "Firebolt" && talents.warlockImprovedImp ? 1.1 : 1;
    const improvedSayaad = spell.pet.startsWith("Sayaad") && spell.name === "Lash of Pain" ? 1 + 0.1 * (Number(talents.warlockImprovedSayaad) || 0) : 1;
    const masterDemonologist = spell.pet === "Imp" || spell.pet.startsWith("Sayaad") ? 1 + 0.02 * (Number(talents.warlockMasterDemonologist) || 0) : 1;
    const damageMultiplier = unholyPower * improvedImp * improvedSayaad * masterDemonologist;
    const coefficientDamage = spellPower * rank.coefficient;
    return {
      baseMin: Math.round(baseMin),
      baseMax: Math.round(baseMax),
      min: (baseMin + coefficientDamage) * damageMultiplier,
      max: (baseMax + coefficientDamage) * damageMultiplier,
      spellPower,
      coefficient: rank.coefficient,
      demonicKnowledgeBonus,
      damageMultiplier,
      cycle: Math.max(spell.castSeconds || 1.5, spell.cooldown || 0)
    };
  }

  const api = { perCast };
  root.WARLOCK_PET_MODEL = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window === "undefined" ? globalThis : window);
