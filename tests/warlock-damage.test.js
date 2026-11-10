const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

global.window = global;
const model = require("../warlock-damage-model.js");
const petModel = require("../warlock-pet-model.js");
require("../spells.js");
require("../damage-data.js");
require("../warlock-damage-data.js");
require("../warlock-pet-data.js");

const warlockSpell = name => window.WARLOCK_DAMAGE_SPELLS.find(spell => spell.name === name);
const rank = (spell, value = 1) => spell.ranks.find(entry => entry.rank === value);
const metrics = (spellName, rankValue, talents = {}, extra = {}) => model.metrics(warlockSpell(spellName), rank(warlockSpell(spellName), rankValue), {
  characterLevel: 60,
  spellPower: 0,
  enemyTargets: 1,
  talents,
  ...extra
});

test("talent-granted Priest spells stay hidden until their Settings talent is selected", () => {
  for (const [name, setting] of [["Holy Nova", "holyNovaTalent"], ["Penance", "penanceTalent"], ["Prayer of Mending", "prayerOfMendingTalent"]]) {
    const spell = window.HEALING_SPELLS.find(entry => entry.name === name);
    assert.equal(spell.talentSetting, setting);
    assert.equal(model.isTalentSpellVisible(spell, {}), false);
    assert.equal(model.isTalentSpellVisible(spell, { [setting]: true }), true);
  }
  for (const [name, setting] of [["Holy Nova", "holyNovaTalent"], ["Penance", "penanceTalent"]]) {
    const spell = window.DAMAGE_SPELLS.find(entry => entry.name === name);
    assert.equal(spell.talentSetting, setting);
    assert.equal(model.isTalentSpellVisible(spell, {}), false);
  }
});

test("every talent-acquired spell record has a Settings gate", () => {
  const html = fs.readFileSync(require.resolve("../index.html"), "utf8");
  const settingIds = new Set([...html.matchAll(/id="([^"]+)"/g)].map(match => match[1]));
  for (const spells of [window.HEALING_SPELLS, window.DAMAGE_SPELLS, window.WARLOCK_DAMAGE_SPELLS]) {
    for (const spell of spells) {
      if (spell.acquisition === "talent" || spell.talentRank || spell.talentPoints) {
        assert.ok(spell.talentSetting, `${spell.name} is talent-acquired but has no Settings gate`);
        assert.ok(settingIds.has(spell.talentSetting), `${spell.name} Settings gate #${spell.talentSetting} is missing`);
        assert.equal(model.isTalentSpellVisible(spell, {}), false, `${spell.name} must be hidden when its talent is unselected`);
        assert.equal(model.isTalentSpellVisible(spell, { [spell.talentSetting]: true }), true, `${spell.name} should appear after its talent is selected`);
      }
    }
  }
});

test("Warlock direct and periodic damage catalog matches its audited rank inventory", () => {
  const expectedRanks = {
    "Immolate": 8, "Shadow Bolt": 10, "Searing Pain": 6, "Rain of Fire": 4,
    "Shadowburn": 6, "Conflagrate": 6, "Hellfire": 3, "Incinerate": 3,
    "Soul Fire": 2, "Corruption": 7, "Bane of Agony": 6, "Drain Soul": 4,
    "Drain Life": 6, "Siphon Life": 4, "Wrack": 1, "Death Coil": 3,
    "Bane of Doom": 1, "Inferno": 1
  };
  assert.equal(window.WARLOCK_DAMAGE_SPELLS.length, 18);
  assert.equal(window.WARLOCK_DAMAGE_SPELLS.reduce((sum, spell) => sum + spell.ranks.length, 0), 81);
  assert.deepEqual(Object.fromEntries(window.WARLOCK_DAMAGE_SPELLS.map(spell => [spell.name, spell.ranks.length])), expectedRanks);
  const ids = window.WARLOCK_DAMAGE_SPELLS.flatMap(spell => spell.ranks.map(entry => entry.id));
  assert.equal(new Set(ids).size, ids.length, "rank IDs must be unique");
  for (const spell of window.WARLOCK_DAMAGE_SPELLS) {
    assert.deepEqual(spell.ranks.map(entry => entry.rank), spell.ranks.map((_, index) => index + 1), `${spell.name} rank sequence`);
  }
});

test("Warlock spell descriptions appear once per card, not in every rank row", () => {
  const source = fs.readFileSync(require.resolve("../app.js"), "utf8");
  const start = source.indexOf("function renderWarlockDamageSpells");
  const end = source.indexOf("function renderDamageSpells", start);
  const renderer = source.slice(start, end);
  assert.equal((renderer.match(/spell\.description/g) || []).length, 1);
  assert.match(renderer, /m\.immolateRequired\?"Requires Immolate on target":""/);
});

test("instant Warlock cooldowns drive per-cast DPS and display only the GCD plus cooldown", () => {
  const fixtures = [
    ["Death Coil", 120, [272, 359, 454]],
    ["Shadowburn", 15, [66, 80, 118, 148, 203, 266]],
    ["Conflagrate", 10, [95, 122, 146, 194, 239, 282]]
  ];
  for (const [spellName, cooldown, means] of fixtures) {
    const spell = warlockSpell(spellName);
    assert.equal(spell.tree, spellName === "Death Coil" ? "Affliction" : "Destruction");
    spell.ranks.forEach((entry, index) => {
      assert.equal(entry.cooldown, cooldown, `${spellName} R${entry.rank} cooldown`);
      const result = model.metrics(spell, entry, {
        characterLevel: entry.level,
        spellPower: 0,
        talents: { warlockTargetImmolate: true }
      });
      assert.equal(result.cycle, cooldown, `${spellName} R${entry.rank} repeat interval`);
      assert.ok(Math.abs(result.expectedDps - means[index] / cooldown) < 1e-10, `${spellName} R${entry.rank} DPS`);
    });
  }
  const appSource = fs.readFileSync(require.resolve("../app.js"), "utf8");
  assert.match(appSource, /`1\.5s GCD`/);
  assert.doesNotMatch(appSource, /`Instant · 1\.5s GCD`/);
});

test("Wrack matches the November 10 tooltip while withholding the accelerated DoT rotation", () => {
  const spell = warlockSpell("Wrack");
  const entry = rank(spell, 1);
  const effect = entry.effects.find(value => value.aura === "A_PERIODIC_DAMAGE");
  assert.deepEqual([entry.id, entry.level, effect.basePoints, effect.perLevel, effect.baseLevel, effect.maxLevel, effect.spellPowerCoefficient], [1316697, 40, 25.2, 1.75, 40, 60, 0.2]);
  assert.equal(entry.effects.find(value => value.aura === "A_DUMMY").value, 100);
  const current = metrics("Wrack", 1, { warlockTalentWrack: true });
  assert.equal(current.tickRange.min, 60);
  assert.equal(current.tickRange.max, 60);
  assert.equal(current.totalMin, 360);
  assert.equal(current.totalMax, 360);
  assert.match(spell.description, /partial-channel tick timing is not established/);
  assert.match(spell.description, /Icy Veins renders 61/);
});

test("pet attack view includes audited ranks and reports per-cast damage only", () => {
  const attacks = window.WARLOCK_PET_ATTACKS;
  const firebolt = attacks.find(spell => spell.name === "Firebolt");
  const lash = attacks.find(spell => spell.name === "Lash of Pain");
  assert.deepEqual(firebolt.ranks.map(entry => [entry.rank, entry.level, entry.id]), [
    [1, 1, 3110], [2, 8, 7799], [3, 18, 7800], [4, 28, 7801], [5, 38, 7802], [6, 48, 11762], [7, 58, 11763]
  ]);
  assert.deepEqual(lash.ranks.map(entry => [entry.rank, entry.level, entry.id]), [
    [1, 20, 7814], [2, 28, 7815], [3, 36, 7816], [4, 44, 11778], [5, 52, 11779], [6, 60, 11780]
  ]);
  const ids = attacks.flatMap(spell => spell.ranks.map(entry => entry.id));
  assert.equal(new Set(ids).size, 13);
  const updatedFireRanges = firebolt.ranks.slice(0, 4).map(entry => {
    const result = petModel.perCast(firebolt, entry);
    return [result.baseMin, result.baseMax, result.min, result.max];
  });
  assert.deepEqual(updatedFireRanges, [[6, 8, 6, 8], [12, 14, 12, 14], [15, 19, 15, 19], [18, 22, 18, 22]]);
  const fire = petModel.perCast(firebolt, rank(firebolt, 1));
  assert.equal(fire.cycle, 2);
  const sayaad = petModel.perCast(lash, rank(lash, 1), {
    characterLevel: 60,
    talents: { warlockUnholyPower: 5, warlockImprovedSayaad: 3, warlockMasterDemonologist: 5 }
  });
  assert.equal(sayaad.cycle, 12, "12-second Lash cooldown governs its cast interval");
  assert.equal(sayaad.damageMultiplier, 1.1 * 1.3 * 1.1);
  assert.equal(sayaad.min, 16 * 1.1 * 1.3 * 1.1);
  const demonic = petModel.perCast(lash, rank(lash, 1), {
    characterLevel: 60,
    petSpellPower: 10,
    talents: { warlockDemonicKnowledge: 3, warlockDemonicKnowledgeActive: true }
  });
  assert.equal(demonic.demonicKnowledgeBonus, 60);
  assert.equal(demonic.spellPower, 70);
  const playerSpell = metrics("Shadow Bolt", 1, { warlockDemonicKnowledge: 3, warlockDemonicKnowledgeActive: true });
  assert.equal(playerSpell.demonicKnowledgeBonus, 60);
  assert.equal(playerSpell.spellPower, 60);
  const html = fs.readFileSync(require.resolve("../index.html"), "utf8");
  for (const id of ["warlockDemonicKnowledge", "warlockDemonicKnowledgeActive", "warlockPetSpellPower", "warlockUnholyPower", "warlockImprovedImp", "warlockImprovedSayaad", "warlockMasterDemonologist"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test("Priest Renew and Power Word: Shield retain their tooltip-calibrated calculations", () => {
  const source = fs.readFileSync(require.resolve("../app.js"), "utf8");
  const start = source.indexOf("function spellMetrics(spell, rank) {");
  const end = source.indexOf("\nfunction fmt(", start);
  assert.ok(start >= 0 && end > start, "find spellMetrics function in app.js");
  const talents = new Proxy({ holySpecialization: 0, baseCrit: 0 }, { get: (target, key) => target[key] ?? 0 });
  const values = { bonusHealing: "45", manaReduction: "0", partyTargets: "1", enemyTargets: "1", bonusSpellDamage: "0" };
  const context = {
    window,
    talents,
    characterLevel: 22,
    number: value => Number(value) || 0,
    sumInfo: () => ({ value: 0 }),
    document: { querySelector: selector => ({ value: values[selector.slice(1)] ?? "0" }) }
  };
  vm.createContext(context);
  vm.runInContext(`${source.slice(start, end)}\nglobalThis.calculate = spellMetrics;`, context);
  const get = (name, rankNumber) => {
    const spell = window.HEALING_SPELLS.find(entry => entry.name === name);
    return context.calculate(spell, spell.ranks.find(entry => entry[0] === rankNumber));
  };
  const shield = get("Power Word: Shield", 3);
  assert.equal(shield.heal, 164);
  assert.equal(shield.mana, 130);
  assert.equal(shield.amountLabel, "Absorb");
  assert.equal(shield.critHeal, null);
  const renew = get("Renew", 3);
  assert.equal(renew.heal, 170);
  assert.equal(renew.healPerEvent, 34);
  assert.equal(renew.critHeal, 51);
  assert.equal(renew.mana, 105);
});

test("Improved Corruption applies its rank damage and cast-time values", () => {
  const r1 = metrics("Corruption", 1, { warlockImprovedCorruption: 3 });
  assert.equal(r1.damageMultiplier, 1.06);
  assert.ok(Math.abs(r1.castTime - 0.8) < 1e-12);
  const r2 = metrics("Corruption", 1, { warlockImprovedCorruption: 5 });
  assert.equal(r2.damageMultiplier, 1.1);
  assert.equal(r2.castTime, 0);
});

test("Shadow Mastery and Malevolence apply only to Shadow spells", () => {
  const shadow = metrics("Shadow Bolt", 1, { warlockShadowMastery: 5, warlockMalevolence: 4, baseCrit: 10 });
  const fire = metrics("Immolate", 1, { warlockShadowMastery: 5, warlockMalevolence: 4, baseCrit: 10 });
  assert.equal(shadow.damageMultiplier, 1.1);
  assert.equal(shadow.critChance, 0.14);
  assert.equal(fire.damageMultiplier, 1);
  assert.equal(fire.critChance, 0.1);
});

test("Pandemic and Ruin increase the crit multiplier by the tooltip's bonus", () => {
  const affliction = metrics("Corruption", 1, { warlockPandemic: 3, baseCrit: 10 });
  const destruction = metrics("Shadow Bolt", 1, { warlockRuin: 5, baseCrit: 10 });
  assert.equal(affliction.critMultiplier, 2);
  assert.equal(affliction.critChance, 0.1, "periodic spells use their spell-level periodic crit flag");
  assert.equal(destruction.critMultiplier, 2);
  assert.ok(Math.abs(affliction.expectedDps - (affliction.totalMin + affliction.totalMax) / 2 * 1.1 / affliction.cycle) < 1e-10);
});

test("Agonizing Flames and Fire and Brimstone use the non-linear rank values", () => {
  assert.equal(metrics("Shadow Bolt", 1, { warlockAgonizingFlames: 2 }).damageMultiplier, 1.07);
  assert.equal(metrics("Searing Pain", 1, { warlockAgonizingFlames: 3 }).critChance, 0.1);
  assert.equal(metrics("Conflagrate", 1, { warlockFireAndBrimstone: 2, warlockTargetImmolate: true }).critChance, 0.17);
});

test("Bane of Havoc handles marked-target geometry independently of AoE target count", () => {
  const aoe = { name: "Test AoE", school: "Fire", tree: "Destruction", kind: "aoe" };
  const oneHit = { rank: 1, level: 1, mana: 10, castSeconds: 1, duration: 0, tooltip: "Deals 100 Fire damage" };
  const getFactor = (scenario, enemyTargets) => model.metrics(aoe, oneHit, {
    talents: { warlockTalentBaneOfHavoc: true, warlockBaneOfHavocScenario: scenario }, enemyTargets
  }).targetMultiplier;
  assert.equal(getFactor(1, 1), 1);
  assert.equal(getFactor(1, 3), 3.3);
  assert.ok(Math.abs(getFactor(2, 3) - 3.45) < 1e-12);
  assert.equal(getFactor(3, 3), 3);
  assert.equal(getFactor(4, 3), 1);
  const single = { ...aoe, kind: "direct" };
  assert.equal(model.metrics(single, oneHit, { talents: { warlockTalentBaneOfHavoc: true, warlockBaneOfHavocScenario: 3 } }).targetMultiplier, 1.15);
});

test("Inferno keeps impact damage, cooldown average and mana unknown distinct", () => {
  const result = metrics("Inferno", 1, {}, { enemyTargets: 4 });
  assert.deepEqual(result.direct, { min: 200, max: 200 });
  assert.equal(result.totalMin, 200);
  assert.equal(result.targetMultiplier, 4);
  assert.equal(result.cycle, 3600);
  assert.equal(result.expectedDps, 200 * 4 / 3600);
  assert.equal(result.mana, null);
  assert.equal(result.perMana, null);
});
