import test from "node:test";
import assert from "node:assert/strict";
import fixtures from "./fixtures/if97-sample.json" with { type: "json" };
import { computeByPressQual } from "../src/utils/compute.js";

const engine = {
  Tsat_p: () => 400,
  vV_p: () => 5,
  vL_p: () => 1,
  hV_p: () => 100,
  hL_p: () => 20,
  vx_ph: () => 0.8,
  uV_p: () => 50,
  uL_p: () => 10,
  sV_p: () => 9,
  sL_p: () => 3,
  CpV_p: () => 30,
  CpL_p: () => 6,
  CvV_p: () => 25,
  CvL_p: () => 5,
  wV_p: () => 900,
  wL_p: () => 500,
  my_ph: (_p, h) => h / 100,
  tcV_p: () => 2,
  tcL_p: () => 1,
  tc_ph: () => 1.5,
  Pr_ph: (_p, h) => h / 10,
  Kappa_ph: (_p, h) => h / 20,
};

test("IF97 fixtures around quality boundary", () => {
  for (const item of fixtures) {
    const model = computeByPressQual(engine, item.input.press, item.input.quality);
    assert.equal(model.h_calc[2], item.expected.h_total, item.name);
  }
});
