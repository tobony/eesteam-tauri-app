import test from "node:test";
import assert from "node:assert/strict";
import { formatFixed2 } from "../src/utils/format-number.js";

test("formatFixed2 returns two decimals", () => {
  assert.equal(formatFixed2(12), "12.00");
  assert.equal(formatFixed2(12.345), "12.35");
});

test("formatFixed2 returns empty string for non-finite", () => {
  assert.equal(formatFixed2(Number.NaN), "");
  assert.equal(formatFixed2(Number.POSITIVE_INFINITY), "");
});
