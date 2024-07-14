import { xsteam2 } from "./xsteam2.js";

function test_calculate() {
  var num1 = parseFloat(document.getElementById('num1').value);
  var num2 = parseFloat(document.getElementById('num2').value);

  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById('test_result').textContent = "올바른 숫자를 입력해주세요.";
  } else {
    // var result = xsteam2function(num1, num2);
    var result = xsteam2.h_pT(num1 / 10, num2 + 273.15);

    document.getElementById('test_result').textContent = "결과: " + result.toFixed(2);
  }
}

function actual_calculate_temp_press(temp, press) {
  let sat_temp_calc = 0.0;
  if (temp > 273.15 && temp <= 647.096) {
    //Let's find if it's a vapor or liquid
    sat_temp_calc = xsteam2.Tsat_p(press);
  }
  //assume it's a vapor, if temp is less than Tsat, it's a liquid
  let active_index = 0;
  if (temp <= sat_temp_calc) {
    //It's a liquid
    active_index = 1;
  }

  // Let's get all the properties
  let qual_calc = [0, 0, 0];
  if (active_index == 0) {
    qual_calc[0] = 1;
    qual_calc[2] = qual_calc[0] + qual_calc[1];
  } else {
    qual_calc[1] = 1;
  }

  let temp_calc = temp;
  temp_calc = [temp_calc, temp_calc, temp_calc];
  let press_calc = [press, press, press];

  let vol_calc = ["", "", ""];
  vol_calc[active_index] = xsteam2.v_pT(press, temp);
  vol_calc[2] = vol_calc[active_index];

  let rho_calc = ["", "", ""];
  rho_calc[active_index] = 1 / vol_calc[active_index];
  rho_calc[2] = rho_calc[active_index];

  let h_calc = ["", "", ""];
  h_calc[active_index] = xsteam2.h_pT(press, temp);
  h_calc[2] = h_calc[active_index];

  let qual_vol_calc = qual_calc;

  let u_calc = ["", "", ""];
  u_calc[active_index] = xsteam2.u_pT(press, temp);
  u_calc[2] = u_calc[active_index];

  let s_calc = ["", "", ""];
  s_calc[active_index] = xsteam2.s_pT(press, temp);
  s_calc[2] = s_calc[active_index];

  let Cp_calc = ["", "", ""];
  Cp_calc[active_index] = xsteam2.Cp_pT(press, temp);
  Cp_calc[2] = Cp_calc[active_index];

  let Cv_calc = ["", "", ""];
  Cv_calc[active_index] = xsteam2.Cv_pT(press, temp);
  Cv_calc[2] = Cv_calc[active_index];

  let w_calc = ["", "", ""];
  w_calc[active_index] = xsteam2.w_pT(press, temp);
  w_calc[2] = w_calc[active_index];

  let my_calc = ["", "", ""];
  my_calc[active_index] = xsteam2.my_pT(press, temp);
  my_calc[2] = my_calc[active_index];

  let tc_calc = ["", "", ""];
  tc_calc[active_index] = xsteam2.tc_pT(press, temp);
  tc_calc[2] = tc_calc[active_index];

  let st_calc = ["", "", ""];
  st_calc[active_index] = xsteam2.st_t(temp);
  st_calc[2] = st_calc[active_index];

  let pr_calc = ["", "", ""];
  pr_calc[active_index] = xsteam2.Pr_pT(press, temp);
  pr_calc[2] = pr_calc[active_index];

  let kappa_calc = ["", "", ""];
  kappa_calc[active_index] = xsteam2.Kappa_pT(press, temp);
  kappa_calc[2] = kappa_calc[active_index];

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

function actual_calculate_press_qual(press, qual) {
  if (qual < 0) {
    qual = 0;
  } else if (qual > 1) {
    qual = 1;
  }

  // Let's get all the properties
  let qual_calc = [1, 0, qual];
  let temp_calc = xsteam2.Tsat_p(press);
  temp_calc = [temp_calc, temp_calc, temp_calc];
  let press_calc = [press, press, press];

  let vol_vap = xsteam2.vV_p(press);
  let vol_liq = xsteam2.vL_p(press);
  let vol_calc = [vol_vap, vol_liq, qual * vol_vap + (1 - qual) * vol_liq];

  let rho_calc = [1 / vol_calc[0], 1 / vol_calc[1], 1 / vol_calc[2]];

  let h_vap = xsteam2.hV_p(press);
  let h_liq = xsteam2.hL_p(press);
  let h_tot = qual * h_vap + (1 - qual) * h_liq;
  let h_calc = [h_vap, h_liq, h_tot];

  let qual_vol_calc = [1, 0, xsteam2.vx_ph(press, h_tot)];

  let u_vap = xsteam2.uV_p(press);
  let u_liq = xsteam2.uL_p(press);
  let u_calc = [u_vap, u_liq, qual * u_vap + (1 - qual) * u_liq];

  let s_vap = xsteam2.sV_p(press);
  let s_liq = xsteam2.sL_p(press);
  let s_calc = [s_vap, s_liq, qual * s_vap + (1 - qual) * s_liq];

  let Cp_vap = xsteam2.CpV_p(press);
  let Cp_liq = xsteam2.CpL_p(press);
  let Cp_calc = [Cp_vap, Cp_liq, qual * Cp_vap + (1 - qual) * Cp_liq];

  let Cv_vap = xsteam2.CvV_p(press);
  let Cv_liq = xsteam2.CvL_p(press);
  let Cv_calc = [Cv_vap, Cv_liq, qual * Cv_vap + (1 - qual) * Cv_liq];

  let w_vap = xsteam2.wV_p(press);
  let w_liq = xsteam2.wL_p(press);
  let w_calc = [w_vap, w_liq, qual * w_vap + (1 - qual) * w_liq];

  let my_vap = xsteam2.my_ph(press, h_vap);
  let my_liq = xsteam2.my_ph(press, h_liq);
  let my_tot = xsteam2.my_ph(press, h_tot);
  let my_calc = [my_vap, my_liq, my_tot];

  let tc_vap = xsteam2.tcV_p(press);
  let tc_liq = xsteam2.tcL_p(press);
  let tc_calc = [tc_vap, tc_liq, xsteam2.tc_ph(press, h_tot)];

  let st_vap = "";
  let st_liq = xsteam2.st_p(press);
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
  if (qual < 0) {
    qual = 0;
  } else if (qual > 1.0) {
    qual = 1.0;
  }
  let calc_press = xsteam2.p_hx(enthalpy, qual);
  return actual_calculate_press_qual(calc_press, qual);
}

function actual_calculate_entropy_quality(entropy, qual) {
  if (qual < 0) {
    qual = 0;
  } else if (qual > 1.0) {
    qual = 1.0;
  }
  let calc_press = xsteam2.p_sx(entropy, qual);
  return actual_calculate_press_qual(calc_press, qual);
}

function actual_calculate_enthalpy_temp(enthalpy, temp) {
  let calc_press = xsteam2.p_Th(temp, enthalpy);
  return actual_calculate_press_enthalpy(calc_press, enthalpy);
}

function actual_calculate_temp_qual(temp, qual) {
  if (qual < 0) {
    qual = 0;
  } else if (qual > 1) {
    qual = 1;
  }

  // Let's get all the properties
  let qual_calc = [1, 0, qual];
  let press = xsteam2.psat_T(temp);
  let press_calc = [press, press, press];
  let temp_calc = [temp, temp, temp];

  let vol_vap = xsteam2.vV_T(temp);
  let vol_liq = xsteam2.vL_T(temp);
  let vol_calc = [vol_vap, vol_liq, qual * vol_vap + (1 - qual) * vol_liq];

  let rho_calc = [1 / vol_calc[0], 1 / vol_calc[1], 1 / vol_calc[2]];

  let h_vap = xsteam2.hV_T(temp);
  let h_liq = xsteam2.hL_T(temp);
  let h_tot = qual * h_vap + (1 - qual) * h_liq;
  let h_calc = [h_vap, h_liq, h_tot];

  let qual_vol_calc = [1, 0, xsteam2.vx_ph(press, h_tot)];

  let u_vap = xsteam2.uV_T(temp);
  let u_liq = xsteam2.uL_T(temp);
  let u_calc = [u_vap, u_liq, qual * u_vap + (1 - qual) * u_liq];

  let s_vap = xsteam2.sV_T(temp);
  let s_liq = xsteam2.sL_T(temp);
  let s_calc = [s_vap, s_liq, qual * s_vap + (1 - qual) * s_liq];

  let Cp_vap = xsteam2.CpV_T(temp);
  let Cp_liq = xsteam2.CpL_T(temp);
  let Cp_calc = [Cp_vap, Cp_liq, qual * Cp_vap + (1 - qual) * Cp_liq];

  let Cv_vap = xsteam2.CvV_T(temp);
  let Cv_liq = xsteam2.CvL_T(temp);
  let Cv_calc = [Cv_vap, Cv_liq, qual * Cv_vap + (1 - qual) * Cv_liq];

  let w_vap = xsteam2.wV_T(temp);
  let w_liq = xsteam2.wL_T(temp);
  let w_calc = [w_vap, w_liq, qual * w_vap + (1 - qual) * w_liq];

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
});

function actual_calculate() {
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

  //console.log(specs_and_values);
  status = "Results Available";

  // Possible specs...
  // ('T', 's'),
  if ("Qual." in specs_and_values && "Press." in specs_and_values) {
    actual_calculate_press_qual(
      specs_and_values["Press."],
      specs_and_values["Qual."]
    );
  } else if ("Qual." in specs_and_values && "Temp." in specs_and_values) {
    actual_calculate_temp_qual(
      specs_and_values["Temp."],
      specs_and_values["Qual."]
    );
  } else if (
    "Temp." in specs_and_values &&
    "Press." in specs_and_values
  ) {
    actual_calculate_temp_press(
      specs_and_values["Temp."],
      specs_and_values["Press."]
    );
  } else if (
    "Press." in specs_and_values &&
    "Enthalpy" in specs_and_values
  ) {
    actual_calculate_press_enthalpy(
      specs_and_values["Press."],
      specs_and_values["Enthalpy"]
    );
  } else if (
    "Press." in specs_and_values &&
    "Entropy" in specs_and_values
  ) {
    actual_calculate_press_entropy(
      specs_and_values["Press."],
      specs_and_values["Entropy"]
    );
  } else if (
    "Enthalpy" in specs_and_values &&
    "Entropy" in specs_and_values
  ) {
    actual_calculate_enthalpy_entropy(
      specs_and_values["Enthalpy"],
      specs_and_values["Entropy"]
    );
  } else if (
    "Enthalpy" in specs_and_values &&
    "Qual." in specs_and_values
  ) {
    actual_calculate_enthalpy_quality(
      specs_and_values["Enthalpy"],
      specs_and_values["Qual."]
    );
  } else if (
    "Entropy" in specs_and_values &&
    "Qual." in specs_and_values
  ) {
    actual_calculate_entropy_quality(
      specs_and_values["Entropy"],
      specs_and_values["Qual."]
    );
  } else if (
    "Enthalpy" in specs_and_values &&
    "Temp." in specs_and_values
  ) {
    actual_calculate_enthalpy_temp(
      specs_and_values["Enthalpy"],
      specs_and_values["Temp."]
    );
  } else if (
    "Entropy" in specs_and_values &&
    "Temp." in specs_and_values
  ) {
    actual_calculate_enthalpy_temp(
      specs_and_values["Entropy"],
      specs_and_values["Temp."]
    );
  } else {
    status = "Not a supported specification!";
  }
  $("#ready_to_calc").html("false");
  $("#do_calc").addClass("disabled");
  $("#do_calc").addClass("btn-outline-primary");
  $("#do_calc").removeClass("btm-primary");
  $("#do_calc").html(status);
}