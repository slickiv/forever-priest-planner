const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(require.resolve("../app.js"), "utf8");
const extractFunction = name => {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} exists in app.js`);
  const end = source.indexOf("\n}", start) + 2;
  return source.slice(start, end);
};
const production = {};
vm.runInNewContext(`${extractFunction("compareNumericWithUnknownLast")}; ${extractFunction("sortSpellRows")}`, production);
const compare = production.compareNumericWithUnknownLast;
const sortHealingRows = production.sortSpellRows;

function tableFor(rows, datasetKey) {
  return {
    rows,
    querySelectorAll() { return this.rows; },
    append(row) {
      this.rows.splice(this.rows.indexOf(row), 1);
      this.rows.push(row);
    },
    datasetKey
  };
}

function sortedDamage(values, direction) {
  const rows = values.map((value, index) => ({ id: index, dataset: { value } }));
  rows.sort((a, b) => compare(a.dataset.value, b.dataset.value, direction));
  return rows.map(row => row.dataset.value);
}

test("production healing sort places unknown metrics last and preserves zero and negatives", () => {
  const rows = ["", "0", "-2", "5"].map(value => ({ dataset: { sortExpected: value } }));
  const table = tableFor(rows, "sortExpected");
  sortHealingRows(table, "expected", "asc");
  assert.deepEqual(table.rows.map(row => row.dataset.sortExpected), ["-2", "0", "5", ""]);
  sortHealingRows(table, "expected", "desc");
  assert.deepEqual(table.rows.map(row => row.dataset.sortExpected), ["5", "0", "-2", ""]);
});

test("Priest damage and Warlock production handlers use unknown-last sorting in both directions", () => {
  assert.equal((source.match(/rows\.sort\(\(a,b\)=>compareNumericWithUnknownLast\(/g) || []).length, 2);
  for (const direction of ["asc", "desc"]) {
    const expected = direction === "asc" ? ["-2", "0", "5", ""] : ["5", "0", "-2", ""];
    assert.deepEqual(sortedDamage(["", "0", "-2", "5"], direction), expected);
  }
});

test("nullish, empty, and non-finite metrics stay after known zero and negative values", () => {
  const values = [undefined, null, "", "NaN", "Infinity", "0", "-2"];
  for (const direction of ["asc", "desc"]) {
    const sorted = values.toSorted((a, b) => compare(a, b, direction));
    assert.deepEqual(sorted.slice(0, 2), direction === "asc" ? ["-2", "0"] : ["0", "-2"]);
    assert.equal(sorted.length, values.length);
    assert.ok(sorted.slice(2).every(value => value == null || value === "" || !Number.isFinite(Number(value))));
  }
});

test("healing, Priest damage, and Warlock render unknown sortable metrics as empty data values", () => {
  assert.match(source, /data-sort-range="\$\{m\.heal\?\?""\}"/);
  assert.match(source, /data-sort-expected="\$\{displayedExpected\?\?""\}"/);
  assert.match(source, /data-dps="\$\{m\.expectedDps\?\?""\}"/);
  assert.match(source, /data-dps="\$\{eligible\?m\.expectedDps\?\?"":""\}"/);
  assert.match(source, /data-base="\$\{m\.damageKnown\?m\.totalMin\+m\.totalMax:""\}"/);
  assert.match(source, /data-mana="\$\{m\.mana\?\?""\}"/);
  assert.doesNotMatch(source, /data-(?:sort-[a-z]+|(?:base|damage|dps|mana|efficiency|cast))="\$\{[^}]+\?\?-1\}/);
});
