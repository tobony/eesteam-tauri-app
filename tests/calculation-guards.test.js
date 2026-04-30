import test from "node:test";
import assert from "node:assert/strict";
import { clampQuality, resolveCalculationRoute, validateSpecPair } from "../src/utils/calculation-guards.js";

test("clampQuality clamps outside range", () => {
  assert.equal(clampQuality(-0.4), 0);
  assert.equal(clampQuality(1.8), 1);
  assert.equal(clampQuality(0.6), 0.6);
});

test("validateSpecPair rejects non-finite values", () => {
  const result = validateSpecPair({ "Press.": Number.NaN, "Temp.": 400 });
  assert.equal(result.ok, false);
});

test("resolveCalculationRoute returns expected route", () => {
  assert.equal(resolveCalculationRoute({ "Press.": 1, "Qual.": 0.5 }), "press-qual");
  assert.equal(resolveCalculationRoute({ "Temp.": 450, "Entropy": 7 }), "unsupported");
});
