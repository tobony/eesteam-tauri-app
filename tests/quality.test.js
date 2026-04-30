import test from "node:test";
import assert from "node:assert/strict";
import { blendByQuality } from "../src/utils/quality.js";

test("returns vapor value when quality is 1", () => {
  assert.equal(blendByQuality(10, 1, 1), 10);
});

test("returns liquid value when quality is 0", () => {
  assert.equal(blendByQuality(10, 1, 0), 1);
});

test("returns weighted average for mixed quality", () => {
  assert.equal(blendByQuality(10, 2, 0.25), 4);
});
