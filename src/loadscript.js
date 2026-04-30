import { xsteam2 } from "./xsteam2.js";
import { blendByQuality } from "./utils/quality.js";
import { clampQuality, resolveCalculationRoute, validateSpecPair } from "./utils/calculation-guards.js";
import { computeByPressQual, computeByTempPress } from "./utils/compute.js";
import { formatFixed2 } from "./utils/format-number.js";

function setCalcStatus(state, message) {
  const button = $("#do_calc");
  button.removeClass("btn-outline-primary btn-success btn-danger");
  if (state === "loading") {
    button.addClass("btn-outline-primary");
    button.html(message ?? "Calculating...");
  } else if (state === "success") {
    button.addClass("btn-success");
    button.html(message ?? "Results Available");
  } else {
    button.addClass("btn-danger");
    button.html(message ?? "Calculation error");
  }
}

function setInputAriaInvalid(isInvalid) {
  $("#spec1_value").attr("aria-invalid", isInvalid ? "true" : "false");
  $("#spec2_value").attr("aria-invalid", isInvalid ? "true" : "false");
}

function renderCalculation(model) {
  change_divs(
    model.qual_calc,
    model.qual_vol_calc,
    model.temp_calc,
    model.press_calc,
    model.vol_calc,
    model.rho_calc,
    model.h_calc,
    model.u_calc,
    model.s_calc,
    model.Cp_calc,
    model.Cv_calc,
    model.w_calc,
    model.my_calc,
    model.tc_calc,
    model.pr_calc,
    model.kappa_calc
  );
}

function test_calculate() {
  var num1 = parseFloat(document.getElementById('num1').value);
  var num2 = parseFloat(document.getElementById('num2').value);

  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById('test_result').textContent = "올바른 숫자를 입력해주세요.";
  } else {
    // var result = xsteam2function(num1, num2);
    var result = xsteam2.h_pT(num1 / 10, num2 + 273.15);

    document.getElementById('test_result').textContent = "결과: " + formatFixed2(result);
  }
}

function actual_calculate_temp_press(temp, press) {
  renderCalculation(computeByTempPress(xsteam2, temp, press));
}

function actual_calculate_press_qual(press, qual) {
  qual = clampQuality(qual);
  renderCalculation(computeByPressQual(xsteam2, press, qual));
}

function actual_calculate_press_enthalpy(press, enthalpy) {
  let calc_temp = xsteam2.T_ph(press, enthalpy);
  if (calc_temp > 273.15 && calc_temp <= 647.096) {
    let sat_calc_press = xsteam2.psat_T(calc_temp);
    let hL = xsteam2.hL_p(press);
    let hV = xsteam2.hV_p(press);
    if (enthalpy < hL || enthalpy > hV) {
      return actual_calculate_temp_press(calc_temp, press);
    } else {
      let qual = xsteam2.x_ph(press, enthalpy);
      return actual_calculate_press_qual(press, qual);
    }
  }
  return actual_calculate_temp_press(calc_temp, press);
}

function actual_calculate_press_entropy(press, entropy) {
  let calc_temp = xsteam2.T_ps(press, entropy);
  if (calc_temp > 273.15 && calc_temp <= 647.096) {
    let sat_calc_press = xsteam2.psat_T(calc_temp);
    let sL = xsteam2.sL_p(press);
    let sV = xsteam2.sV_p(press);
    if (entropy < sL || entropy > sV) {
      return actual_calculate_temp_press(calc_temp, press);
    } else {
      let qual = xsteam2.x_ps(press, entropy);
      return actual_calculate_press_qual(press, qual);
    }
  }
  return actual_calculate_temp_press(calc_temp, press);
}

function actual_calculate_enthalpy_entropy(enthalpy, entropy) {
  let calc_press = xsteam2.p_hs(enthalpy, entropy);
  return actual_calculate_press_enthalpy(calc_press, enthalpy);
}

function actual_calculate_enthalpy_quality(enthalpy, qual) {
  qual = clampQuality(qual);
  if (typeof xsteam2.p_hx !== "function") {
    throw new Error("xsteam2.p_hx is not available in current engine.");
  }
  let calc_press = xsteam2.p_hx(enthalpy, qual);
  return actual_calculate_press_qual(calc_press, qual);
}

function actual_calculate_entropy_quality(entropy, qual) {
  qual = clampQuality(qual);
  if (typeof xsteam2.p_sx !== "function") {
    throw new Error("xsteam2.p_sx is not available in current engine.");
  }
  let calc_press = xsteam2.p_sx(entropy, qual);
  return actual_calculate_press_qual(calc_press, qual);
}

function actual_calculate_enthalpy_temp(enthalpy, temp) {
  let calc_press = xsteam2.p_Th(temp, enthalpy);
  return actual_calculate_press_enthalpy(calc_press, enthalpy);
}

function actual_calculate_temp_qual(temp, qual) {
  qual = clampQuality(qual);

  // Let's get all the properties
  let qual_calc = [1, 0, qual];
  let press = xsteam2.psat_T(temp);
  let press_calc = [press, press, press];
  let temp_calc = [temp, temp, temp];

  let vol_vap = xsteam2.vV_T(temp);
  let vol_liq = xsteam2.vL_T(temp);
  let vol_calc = [vol_vap, vol_liq, blendByQuality(vol_vap, vol_liq, qual)];

  let rho_calc = [1 / vol_calc[0], 1 / vol_calc[1], 1 / vol_calc[2]];

  let h_vap = xsteam2.hV_T(temp);
  let h_liq = xsteam2.hL_T(temp);
  let h_tot = blendByQuality(h_vap, h_liq, qual);
  let h_calc = [h_vap, h_liq, h_tot];

  let qual_vol_calc = [1, 0, xsteam2.vx_ph(press, h_tot)];

  let u_vap = xsteam2.uV_T(temp);
  let u_liq = xsteam2.uL_T(temp);
  let u_calc = [u_vap, u_liq, blendByQuality(u_vap, u_liq, qual)];

  let s_vap = xsteam2.sV_T(temp);
  let s_liq = xsteam2.sL_T(temp);
  let s_calc = [s_vap, s_liq, blendByQuality(s_vap, s_liq, qual)];

  let Cp_vap = xsteam2.CpV_T(temp);
  let Cp_liq = xsteam2.CpL_T(temp);
  let Cp_calc = [Cp_vap, Cp_liq, blendByQuality(Cp_vap, Cp_liq, qual)];

  let Cv_vap = xsteam2.CvV_T(temp);
  let Cv_liq = xsteam2.CvL_T(temp);
  let Cv_calc = [Cv_vap, Cv_liq, blendByQuality(Cv_vap, Cv_liq, qual)];

  let w_vap = xsteam2.wV_T(temp);
  let w_liq = xsteam2.wL_T(temp);
  let w_calc = [w_vap, w_liq, blendByQuality(w_vap, w_liq, qual)];

  let my_vap = xsteam2.my_ph(press, h_vap);
  let my_liq = xsteam2.my_ph(press, h_liq);
  let my_tot = xsteam2.my_ph(press, h_tot);
  let my_calc = [my_vap, my_liq, my_tot];

  let tc_vap = xsteam2.tcV_T(temp);
  let tc_liq = xsteam2.tcL_T(temp);
  let tc_calc = [tc_vap, tc_liq, xsteam2.tc_ph(press, h_tot)];

  let st_vap = "";
  let st_liq = xsteam2.st_t(temp);
  let st_calc = ["", st_liq, ""];

  let pr_vap = xsteam2.Pr_ph(press, h_vap);
  let pr_liq = xsteam2.Pr_ph(press, h_liq);
  let pr_tot = xsteam2.Pr_ph(press, h_tot);
  let pr_calc = [pr_vap, pr_liq, pr_tot];

  let kappa_vap = xsteam2.Kappa_ph(press, h_vap);
  let kappa_liq = xsteam2.Kappa_ph(press, h_liq);
  let kappa_tot = xsteam2.Kappa_ph(press, h_tot);

  let kappa_calc = [kappa_vap, kappa_liq, kappa_tot];

  change_divs(
    qual_calc,
    qual_vol_calc,
    temp_calc,
    press_calc,
    vol_calc,
    rho_calc,
    h_calc,
    u_calc,
    s_calc,
    Cp_calc,
    Cv_calc,
    w_calc,
    my_calc,
    tc_calc,
    pr_calc,
    kappa_calc
  );
}




document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('do_calc').addEventListener('click', actual_calculate);
  document.getElementById('spec1_value').addEventListener('keydown', (event) => {
    if (event.key === "Enter") actual_calculate();
  });
  document.getElementById('spec2_value').addEventListener('keydown', (event) => {
    if (event.key === "Enter") actual_calculate();
  });
});

function actual_calculate() {
  setCalcStatus("loading", "Calculating...");
  setInputAriaInvalid(false);
  let spec1_type = $("#spec1_type").val();
  let spec1_unit = $("#spec1_units").val();
  let spec1_value = Number.parseFloat($("#spec1_value").val());
  let spec1_si_value = convert_spec_to_SI(
    spec1_type,
    spec1_unit,
    spec1_value
  );

  let spec2_type = $("#spec2_type").val();
  let spec2_unit = $("#spec2_units").val();
  let spec2_value = Number.parseFloat($("#spec2_value").val());
  let spec2_si_value = convert_spec_to_SI(
    spec2_type,
    spec2_unit,
    spec2_value
  );

  // console.log(spec1_type + ':' + spec1_si_value);
  // console.log(spec2_type + ':' + spec2_si_value);
  let specs_and_values = {};
  specs_and_values[spec1_type] = spec1_si_value;
  specs_and_values[spec2_type] = spec2_si_value;

  let status = "Results Available";
  const validation = validateSpecPair(specs_and_values);
  if (!validation.ok) {
    $("#ready_to_calc").html("false");
    $("#do_calc").addClass("disabled");
    $("#do_calc").addClass("btn-outline-primary");
    $("#do_calc").removeClass("btm-primary");
    setCalcStatus("error", validation.hint ? `${validation.message} ${validation.hint}` : validation.message);
    setInputAriaInvalid(true);
    return;
  }

  // Possible specs...
  // ('T', 's'),
  const route = resolveCalculationRoute(specs_and_values);
  try {
    switch (route) {
      case "press-qual":
        actual_calculate_press_qual(specs_and_values["Press."], specs_and_values["Qual."]);
        break;
      case "temp-qual":
        actual_calculate_temp_qual(specs_and_values["Temp."], specs_and_values["Qual."]);
        break;
      case "temp-press":
        actual_calculate_temp_press(specs_and_values["Temp."], specs_and_values["Press."]);
        break;
      case "press-enthalpy":
        actual_calculate_press_enthalpy(specs_and_values["Press."], specs_and_values["Enthalpy"]);
        break;
      case "press-entropy":
        actual_calculate_press_entropy(specs_and_values["Press."], specs_and_values["Entropy"]);
        break;
      case "enthalpy-entropy":
        actual_calculate_enthalpy_entropy(specs_and_values["Enthalpy"], specs_and_values["Entropy"]);
        break;
      case "enthalpy-qual":
        actual_calculate_enthalpy_quality(specs_and_values["Enthalpy"], specs_and_values["Qual."]);
        break;
      case "entropy-qual":
        actual_calculate_entropy_quality(specs_and_values["Entropy"], specs_and_values["Qual."]);
        break;
      case "enthalpy-temp":
        actual_calculate_enthalpy_temp(specs_and_values["Enthalpy"], specs_and_values["Temp."]);
        break;
      default:
        status = "Not a supported specification!";
    }
  } catch (error) {
    status = `Calculation error: ${error.message}`;
    setInputAriaInvalid(true);
  }
  $("#ready_to_calc").html("false");
  $("#do_calc").addClass("disabled");
  if (status === "Results Available") {
    setCalcStatus("success", status);
  } else {
    setCalcStatus("error", status);
  }
}
