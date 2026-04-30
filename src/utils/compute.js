import { blendByQuality } from "./quality.js";

export function computeByTempPress(engine, temp, press) {
  let satTemp = 0;
  if (temp > 273.15 && temp <= 647.096) {
    satTemp = engine.Tsat_p(press);
  }

  const activeIndex = temp <= satTemp ? 1 : 0;
  const quality = [0, 0, 0];
  quality[activeIndex] = 1;
  quality[2] = quality[0] + quality[1];

  const tempCalc = [temp, temp, temp];
  const pressCalc = [press, press, press];

  const vol = ["", "", ""];
  vol[activeIndex] = engine.v_pT(press, temp);
  vol[2] = vol[activeIndex];

  const rho = ["", "", ""];
  rho[activeIndex] = 1 / vol[activeIndex];
  rho[2] = rho[activeIndex];

  function point(fn) {
    const values = ["", "", ""];
    values[activeIndex] = fn(press, temp);
    values[2] = values[activeIndex];
    return values;
  }

  return {
    qual_calc: quality,
    qual_vol_calc: quality,
    temp_calc: tempCalc,
    press_calc: pressCalc,
    vol_calc: vol,
    rho_calc: rho,
    h_calc: point((p, t) => engine.h_pT(p, t)),
    u_calc: point((p, t) => engine.u_pT(p, t)),
    s_calc: point((p, t) => engine.s_pT(p, t)),
    Cp_calc: point((p, t) => engine.Cp_pT(p, t)),
    Cv_calc: point((p, t) => engine.Cv_pT(p, t)),
    w_calc: point((p, t) => engine.w_pT(p, t)),
    my_calc: point((p, t) => engine.my_pT(p, t)),
    tc_calc: point((p, t) => engine.tc_pT(p, t)),
    pr_calc: point((p, t) => engine.Pr_pT(p, t)),
    kappa_calc: point((p, t) => engine.Kappa_pT(p, t)),
  };
}

export function computeByPressQual(engine, press, quality) {
  const temp = engine.Tsat_p(press);
  const tempCalc = [temp, temp, temp];
  const pressCalc = [press, press, press];

  const vV = engine.vV_p(press);
  const vL = engine.vL_p(press);
  const volCalc = [vV, vL, blendByQuality(vV, vL, quality)];

  const hV = engine.hV_p(press);
  const hL = engine.hL_p(press);
  const hTotal = blendByQuality(hV, hL, quality);

  return {
    qual_calc: [1, 0, quality],
    qual_vol_calc: [1, 0, engine.vx_ph(press, hTotal)],
    temp_calc: tempCalc,
    press_calc: pressCalc,
    vol_calc: volCalc,
    rho_calc: [1 / volCalc[0], 1 / volCalc[1], 1 / volCalc[2]],
    h_calc: [hV, hL, hTotal],
    u_calc: [engine.uV_p(press), engine.uL_p(press), blendByQuality(engine.uV_p(press), engine.uL_p(press), quality)],
    s_calc: [engine.sV_p(press), engine.sL_p(press), blendByQuality(engine.sV_p(press), engine.sL_p(press), quality)],
    Cp_calc: [engine.CpV_p(press), engine.CpL_p(press), blendByQuality(engine.CpV_p(press), engine.CpL_p(press), quality)],
    Cv_calc: [engine.CvV_p(press), engine.CvL_p(press), blendByQuality(engine.CvV_p(press), engine.CvL_p(press), quality)],
    w_calc: [engine.wV_p(press), engine.wL_p(press), blendByQuality(engine.wV_p(press), engine.wL_p(press), quality)],
    my_calc: [engine.my_ph(press, hV), engine.my_ph(press, hL), engine.my_ph(press, hTotal)],
    tc_calc: [engine.tcV_p(press), engine.tcL_p(press), engine.tc_ph(press, hTotal)],
    pr_calc: [engine.Pr_ph(press, hV), engine.Pr_ph(press, hL), engine.Pr_ph(press, hTotal)],
    kappa_calc: [engine.Kappa_ph(press, hV), engine.Kappa_ph(press, hL), engine.Kappa_ph(press, hTotal)],
  };
}
