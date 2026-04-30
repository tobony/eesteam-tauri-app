import test from "node:test";
import assert from "node:assert/strict";
import { validateSpecPairContract, validateSpecValue } from "../src/utils/spec-validation.js";

test("validateSpecValue rejects NaN", () => {
  const result = validateSpecValue("Press.", Number.NaN);
  assert.equal(result.ok, false);
  assert.equal(result.code, "INVALID_NUMBER");
});

test("validateSpecValue clamps quality range by validation", () => {
  assert.equal(validateSpecValue("Qual.", -0.1).ok, false);
  assert.equal(validateSpecValue("Qual.", 1.1).ok, false);
  assert.equal(validateSpecValue("Qual.", 0.6).ok, true);
});

test("validateSpecValue checks temperature and pressure bounds", () => {
  assert.equal(validateSpecValue("Temp.", 0).ok, false);
  assert.equal(validateSpecValue("Temp.", 300).ok, true);
  assert.equal(validateSpecValue("Press.", -1).ok, false);
  assert.equal(validateSpecValue("Press.", 0).ok, true);
});

test("validateSpecPairContract accepts supported pairs", () => {
  assert.equal(validateSpecPairContract("Press.", "Qual.").ok, true);
  assert.equal(validateSpecPairContract("Temp.", "Press.").ok, true);
});

test("validateSpecPairContract rejects unsupported pairs", () => {
  const result = validateSpecPairContract("Temp.", "Entropy");
  assert.equal(result.ok, false);
  assert.equal(result.code, "UNSUPPORTED_PAIR");
});
