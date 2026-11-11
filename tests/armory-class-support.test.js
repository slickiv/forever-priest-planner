const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(require.resolve("../app.js"), "utf8");
const start = source.indexOf("function parseArmory(html)");
const end = source.indexOf("function armoryUrlFromCharacterName", start);
assert.notEqual(start, -1);
assert.notEqual(end, -1);
const context = { clampRank: (value, max) => Math.max(0, Math.min(max, Number(value) || 0)) };
vm.runInNewContext(`${source.slice(start, end)}\nglobalThis.parseArmory = parseArmory;`, context);

function armoryPage(className, gear = {}) {
  const state = { character: { name: "Test", ...(className===undefined?{}:{class:className}), level: 22, race: "Human", gear, specs: [{ talents: [] }] } };
  return `<script>var characterProfileInitialState = ${JSON.stringify(state)};</script>`;
}

test("Armory imports accept Priest and Warlock and keep Warlock talent imports out of scope", () => {
  const priest = context.parseArmory(armoryPage("Priest"));
  const warlock = context.parseArmory(armoryPage("Warlock"));
  assert.equal(priest.className, "priest");
  assert.equal(priest.talentsAvailable, true);
  assert.equal(warlock.className, "warlock");
  assert.equal(warlock.talentsAvailable, false);
  assert.equal(context.parseArmory(armoryPage({name:"Warlock"})).className, "warlock");
});

test("Armory imports continue rejecting unsupported classes and non-cloth armor", () => {
  assert.throws(() => context.parseArmory(armoryPage("Paladin")), /Armory imports are not supported/);
  assert.throws(() => context.parseArmory(armoryPage()), /does not identify its character class/);
  const result = context.parseArmory(armoryPage("Warlock", {
    head: { name: "Cloth Hood", item_subclass: { name: "Cloth" }, stats: [] },
    chest: { name: "Mail Shirt", item_subclass: { name: "Mail" }, stats: [] }
  }));
  assert.ok(result.gear.head);
  assert.equal(result.gear.chest, undefined);
});

test("Armory submit selects the imported class and rerenders damage with updated character data", () => {
  assert.match(source, /damagePrefs\.class=result\.className;document\.querySelector\("#damageClass"\)\.value=result\.className;saveDamagePrefs\(\);/);
  assert.match(source, /if\(result\.talentsAvailable\)[\s\S]*?renderSpells\(\);\s*}\s*renderDamageSpells\(\);/);
});
