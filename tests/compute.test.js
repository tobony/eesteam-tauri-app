import test from "node:test";
import assert from "node:assert/strict";
import { computeByPressQual, computeByTempPress } from "../src/utils/compute.js";

const engine = {
  Tsat_p: () => 400,
  v_pT: () => 2,
  h_pT: () => 10,
  u_pT: () => 11,
  s_pT: () => 12,
  Cp_pT: () => 13,
  Cv_pT: () => 14,
  w_pT: () => 15,
  my_pT: () => 16,
  tc_pT: () => 17,
  Pr_pT: () => 18,
  Kappa_pT: () => 19,
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

test("computeByPressQual builds blended totals", () => {
  const model = computeByPressQual(engine, 1, 0.25);
  assert.equal(model.temp_calc[0], 400);
  assert.equal(model.vol_calc[2], 2);
  assert.equal(model.h_calc[2], 40);
  assert.equal(model.qual_vol_calc[2], 0.8);
});

test("computeByTempPress chooses liquid branch under saturation", () => {
  const model = computeByTempPress(engine, 350, 1);
  assert.equal(model.qual_calc[1], 1);
  assert.equal(model.vol_calc[1], 2);
  assert.equal(model.h_calc[1], 10);
});
