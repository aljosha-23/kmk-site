const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { createRequire } = require("node:module");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const filename = resolve(__dirname, "../src/lib/concrete-cover.ts");
const compiled = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const mod = { exports: {} };
new Function("exports", "require", "module", compiled.outputText)(mod.exports, createRequire(filename), mod);
const { calculateCover, exposures, serbiaCover } = mod.exports;
const base = { exposure: "XC3", life: 50, strength: 30, slab: false, quality: false, diameter: 16, aggregate: 32, abrasion: "none", ground: "formwork", irregular: false, control: "normal", deviation: 10 };

test("XC3, S4, phi16: c_min=25 and c_nom=35 mm", () => {
  const r = calculateCover(base);
  assert.equal(r.structuralClass, 4); assert.equal(r.bond, 16); assert.equal(r.durability, 25); assert.equal(r.nominal, 35);
});
test("GF Belgrade TBK1 lecture, slides 37–39: XC3, C30/37, 50 years, phi10 => 35 mm", () => {
  const r = calculateCover({ ...base, diameter: 10 });
  assert.equal(r.bond, 10); assert.equal(r.durability, 25);
  assert.equal(r.minimum, 25); assert.equal(r.nominal, 35);
});
test("100 years adds two classes; 3 independent reductions stop at S1", () => {
  assert.equal(calculateCover({ ...base, life: 100 }).structuralClass, 6);
  assert.equal(calculateCover({ ...base, strength: 40, slab: true, quality: true }).structuralClass, 1);
});
test("Strength thresholds follow table 4.3N, distinct from durability column grouping", () => {
  for (const [exposure, exp] of Object.entries(exposures)) {
    assert.equal(calculateCover({ ...base, exposure, strength: exp.strength }).structuralClass, 3);
    const below = exp.strength === 30 ? 25 : exp.strength - 5;
    assert.equal(calculateCover({ ...base, exposure, strength: below }).structuralClass, 4);
  }
  assert.equal(exposures.XS2.strength, 45); assert.equal(exposures.XS1.strength, 40);
});
test("All durability values match table 4.4N", () => {
  const expected = [[10,10,10,15,20,25,30],[10,10,15,20,25,30,35],[10,10,20,25,30,35,40],[10,15,25,30,35,40,45],[15,20,30,35,40,45,50],[20,25,35,40,45,50,55]];
  assert.deepEqual(serbiaCover.durability, expected);
  for (const [exposure, exp] of Object.entries(exposures)) {
    assert.equal(calculateCover({ ...base, exposure, strength: 25 }).durability, expected[3][exp.column]);
  }
});
test("Aggregate correction applies strictly above 32 mm and bond may govern", () => {
  assert.equal(calculateCover({ ...base, diameter: 32 }).bond, 32);
  assert.equal(calculateCover({ ...base, diameter: 32, aggregate: 33 }).nominal, 47);
  assert.equal("rounded" in calculateCover({ ...base, diameter: 32, aggregate: 33 }), false);
});
test("Surface and abrasion add to minimum; substrate floor applied before deviation", () => {
  assert.equal(calculateCover({ ...base, irregular: true, abrasion: "XM3" }).nominal, 55);
  assert.equal(calculateCover({ ...base, ground: "prepared" }).nominal, 50);
  assert.equal(calculateCover({ ...base, ground: "soil" }).nominal, 85);
  assert.equal(calculateCover({ ...base, diameter: 32, ground: "soil" }).nominal, 85);
});
test("Execution allowances require the appropriate control regime", () => {
  assert.throws(() => calculateCover({ ...base, deviation: 5 }));
  assert.equal(calculateCover({ ...base, control: "measured", deviation: 5 }).nominal, 30);
  assert.throws(() => calculateCover({ ...base, control: "measured", deviation: 4 }));
  assert.equal(calculateCover({ ...base, control: "precise", deviation: 0 }).nominal, 25);
});
test("Reject invalid numeric values", () => {
  assert.equal(calculateCover({ ...base, diameter: 32 }).bond, 32);
  for (const diameter of [0, 2, 3, 5, 17, -1, NaN, Infinity, 32.1, 33, 100]) assert.throws(() => calculateCover({ ...base, diameter }));
  for (let diameter = 4; diameter <= 32; diameter += 2) assert.equal(calculateCover({ ...base, diameter }).bond, diameter);
  for (const aggregate of [0, -1, NaN, 126]) assert.throws(() => calculateCover({ ...base, aggregate }));
  assert.throws(() => calculateCover({ ...base, deviation: NaN }));
});
