document.addEventListener('DOMContentLoaded', initialize)

function initialize() {
  fill_units("#out_temp_units", "K");
  fill_units("#out_press_units", "MPa");
  fill_units("#out_sos_units", "m/s");
  fill_units("#out_cp_units", "kJ/kg-K");
  fill_units("#out_cv_units", "kJ/kg-K");
  fill_units("#out_s_units", "kJ/kg-K");
  fill_units("#out_h_units", "kJ/kg");
  fill_units("#out_u_units", "kJ/kg");
  fill_units("#out_dens_units", "kg/m3");
  fill_units("#out_vol_units", "m3/kg");
  fill_units("#out_visc_units", "Pa-s");
  fill_units("#out_thcon_units", "W/(m-K)");
  set_global_units("Industrial");
  update_all_values();

  console.log('main 페이지가 로드되었습니다!');
}


let CONVERSION_MAP = {
  K: {
    K: [1, 0, 3],
    C: [1, -273.15, 3],
    R: [1.8, 0, 3],
    F: [1.8, -459.67, 3]
  },
  MPa: {
    Pa: [1000000.0, 0, 0],
    kPa: [1000.0, 0, 3],
    MPa: [1.0, 0, 3],
    GPa: [0.001, 0, 4],
    atm: [9.869232667160128, 0, 3],
    psi: [145.03774389728312, 0, 3],
    "lb_f/in2": [145.03774389728312, 0, 3],
    "lb_f/ft2": [20885.43378837124, 0, 3],
    bar: [10.0, 0, 3],
    mbar: [10000.0, 0, 3],
    torr: [7500.616827041697, 0, 3],
    "kg/mm2": [0.10197162129779283, 0, 3],
    "kg/cm2": [10.197162129779283, 0, 3],
    "kg/m2": [101971.62129779284, 0, 3],
    inHg: [295.2998016471232, 0, 3],
    ftHg: [24.608321648481937, 0, 3],
    cmHg: [750.0615050434136, 0, 3],
    mmHg: [7500.615050434137, 0, 3],
    inH2O: [4014.630920928231, 0, 3],
    ftH2O: [334.5525543589354, 0, 3],
    cmH2O: [10197.162129779283, 0, 3],
    mmH2O: [101971.62129779284, 0, 3]
  },
  "m/s": {
    "m/s": [1.0, 0, 3],
    "m/min": [59.99999999999988, 0, 3],
    "m/hr": [3599.9999999999973, 0, 3],
    "km/hr": [3.599999999999997, 0, 3],
    "yd/s": [1.0936132983377078, 0, 3],
    "yd/min": [65.61679790026247, 0, 3],
    "yd/hr": [3937.0078740157483, 0, 3],
    "ft/s": [3.280839895013123, 0, 3],
    "in/s": [39.37007874015748, 0, 3]
  },

  "kJ/kg": {
    "J/kg": [1000.0, 0, 3],
    "J/g": [1.0, 0, 3],
    "kJ/g": [0.001, 0, 3],
    "cal/kg": [239.0057361376673, 0, 3],
    "cal/g": [0.2390057361376673, 0, 3],
    "kcal/kg": [0.2390057361376673, 0, 3],
    "kcal/g": [0.0002390057361376673, 0, 3],
    "BTU/g": [0.0009484516526770048, 0, 3],
    "BTU/lb": [0.4302104329681789, 0, 3],
    "kJ/kg": [1.0, 0, 3]
  },
  "kJ/kg-K": {
    "J/kg-K": [1000.0, 0, 3],
    "J/g-K": [1.0, 0, 3],
    "kJ/g-K": [0.001, 0, 3],
    "cal/g-K": [0.2390057361376673, 0, 3],
    "kcal/g-K": [0.0002390057361376673, 0, 3],
    "BTU/g-F": [0.0005269175848205582, 0, 3],
    "BTU/lb-F": [0.23900579609343317, 0, 3],
    "cal/kg-K": [239.0057361376673, 0, 3],
    "kcal/kg-K": [0.2390057361376673, 0, 3],
    "kJ/kg-K": [1.0, 0, 3]
  },
  "kJ/kg": {
    "J/kg": [1000.0, 0, 3],
    "J/g": [1.0, 0, 3],
    "kJ/g": [0.001, 0, 3],
    "cal/kg": [239.0057361376673, 0, 3],
    "cal/g": [0.2390057361376673, 0, 3],
    "kcal/kg": [0.2390057361376673, 0, 3],
    "kcal/g": [0.0002390057361376673, 0, 3],
    "BTU/g": [0.0009484516526770048, 0, 3],
    "BTU/lb": [0.4302104329681789, 0, 3],
    "kJ/kg": [1.0, 0, 3]
  },
  "kg/m3": {
    "kg/m3": [1.0, 0, 3],
    "g/cm3": [0.001, 0, 3],
    "lb/ft3": [0.06242796057614477, 0, 3],
    "lb/gal": [0.008345404452019306, 0, 3],
    "lb/in3": [3.6127292000083714e-5, 0, 3],
    "kg/L": [0.001, 0, 3]
  },
  "m3/kg": {
    "m3/kg": [1 / 1.0, 0, 3],
    "cm3/g": [1 / 0.001, 0, 3],
    "ft3/lb": [1 / 0.06242796057614477, 0, 3],
    "gal/lb": [1 / 0.008345404452019306, 0, 3],
    "in3/lb": [1 / 3.6127292000083714e-5, 0, 3],
    "L/kg": [1 / 0.001, 0, 3]
  },
  "Pa-s": {
    "Pa-s": [1.0, 0, 5],
    cP: [1000.0, 0, 5],
    "lb/(ft-h)": [2419.0883105022244, 0, 5],
    "lb/(ft-s)": [0.6719689751395086, 0, 5],
    "mPa-s": [1000.0, 0, 5]
  },
  "W/(m-K)": {
    "W/(m-K)": [1.0, 0, 3],
    "BTU/(hr-ft-F)": [0.5781761274719033, 0, 3],
    "kcal/(hr-m-K)": [0.8604206500956039, 0, 3],
    "cal/(s-cm-K)": [0.002390057361376673, 0, 3]
  }
};

let UNIT_SET_MAP = {
  SI: {
    "#out_temp_units": "K",
    "#out_press_units": "MPa",
    "#out_sos_units": "m/s",
    "#out_cp_units": "kJ/kg-K",
    "#out_cv_units": "kJ/kg-K",
    "#out_s_units": "kJ/kg-K",
    "#out_h_units": "kJ/kg",
    "#out_u_units": "kJ/kg",
    "#out_dens_units": "kg/m3",
    "#out_vol_units": "m3/kg",
    "#out_visc_units": "Pa-s",
    "#out_thcon_units": "W/(m-K)"
  },
  Metric: {
    "#out_temp_units": "C",
    "#out_press_units": "MPa",
    "#out_sos_units": "m/s",
    "#out_cp_units": "kJ/kg-K",
    "#out_cv_units": "kJ/kg-K",
    "#out_s_units": "kJ/kg-K",
    "#out_h_units": "kJ/kg",
    "#out_u_units": "kJ/kg",
    "#out_dens_units": "kg/m3",
    "#out_vol_units": "m3/kg",
    "#out_visc_units": "cP",
    "#out_thcon_units": "W/(m-K)"
  },
  Industrial: {
    "#out_temp_units": "C",
    "#out_press_units": "bar",
    "#out_sos_units": "m/s",
    "#out_cp_units": "kJ/kg-K",
    "#out_cv_units": "kJ/kg-K",
    "#out_s_units": "kJ/kg-K",
    "#out_h_units": "kJ/kg",
    "#out_u_units": "kJ/kg",
    "#out_dens_units": "kg/m3",
    "#out_vol_units": "m3/kg",
    "#out_visc_units": "cP",
    "#out_thcon_units": "W/(m-K)"
  },
  Imperial: {
    "#out_temp_units": "F",
    "#out_press_units": "psi",
    "#out_sos_units": "ft/s",
    "#out_cp_units": "BTU/lb-F",
    "#out_cv_units": "BTU/lb-F",
    "#out_s_units": "BTU/lb-F",
    "#out_h_units": "BTU/lb",
    "#out_u_units": "BTU/lb",
    "#out_dens_units": "lb/ft3",
    "#out_vol_units": "ft3/lb",
    "#out_visc_units": "cP",
    "#out_thcon_units": "BTU/(hr-ft-F)"
  }
};

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

function check_specs_and_units() {
  $("#ready_to_calc").html("false");
  $("#do_calc").addClass("disabled");
  $("#do_calc").addClass("btn-outline-primary");
  $("#do_calc").removeClass("btm-primary");

  let spec1_type = $("#spec1_type").val();
  let spec2_type = $("#spec2_type").val();
  let spec1_value = $("#spec1_value").val();
  let spec2_value = $("#spec2_value").val();

  //console.log('spec1_type:' + spec1_type);
  //console.log('spec2_type:' + spec2_type);
  //console.log('spec1_value:' + spec1_value);
  //console.log('spec2_value:' + spec2_value);

  if (spec1_type === spec2_type) {
    $("#do_calc").html("Choose two diffferent specifications...");
    $("#ready_to_calc").html("false");
    return;
  }
  if (isBlank(spec1_value) || isBlank(spec2_value)) {
    $("#do_calc").html(
      "specify two valid values"
    );
    $("#ready_to_calc").html("false");
    return;
  }
  if (isFinite(spec1_value) && isFinite(spec2_value)) {
    // Okay now ready to process!
    $("#ready_to_calc").html("true");
    $("#do_calc").html("Calculate");
    $("#do_calc").toggleClass("disabled");
    $("#do_calc").removeClass("btn-outline-primary");
    $("#do_calc").addClass("btn-primary");
    return;
  }
}

function set_global_units(global_units) {
  let unit_set = UNIT_SET_MAP[global_units];
  let avail_units = Object.keys(unit_set);
  avail_units.sort();
  for (let i = 0; i < avail_units.length; i++) {
    let u = unit_set[avail_units[i]];
    let tag = avail_units[i];
    let tag_unit = u;
    $(tag).val(tag_unit);
  }
  set_spec_units($("#spec1_type").val(), "#spec1_units", global_units);
  set_spec_units($("#spec2_type").val(), "#spec2_units", global_units);
  update_all_values();
}

function set_spec_units(spec_type, tgt_select, global_units) {
  let default_units = {
    SI: {
      "Temp.": "K",
      "Press.": "MPa",
      Enthalpy: "kJ/kg",
      Entropy: "kJ/kg-K"
    },
    Imperial: {
      "Temp.": "F",
      "Press.": "psi",
      Enthalpy: "BTU/lb",
      Entropy: "BTU/lb-F"
    },
    Industrial: {
      "Temp.": "C",
      "Press.": "bar",
      Enthalpy: "kJ/kg",
      Entropy: "kJ/kg-K"
    },
    Metric: {
      "Temp.": "C",
      "Press.": "MPa",
      Enthalpy: "kJ/kg",
      Entropy: "kJ/kg-K"
    }
  };
  $("select" + tgt_select).empty();
  // console.log(global_units);
  if (spec_type === "Temp.") {
    fill_units(tgt_select, "K");
  } else if (spec_type === "Press.") {
    fill_units(tgt_select, "MPa");
  } else if (spec_type === "Enthalpy") {
    fill_units(tgt_select, "kJ/kg");
  } else if (spec_type === "Entropy") {
    fill_units(tgt_select, "kJ/kg-K");
  }
  $(tgt_select).val(default_units[global_units][spec_type]);
}


function update_all_values() {
  let v = $("select#out_temp_units").val();
  update_units("K", v, ["#out_temp_value"], ["#out_temp_value_tot"]);

  v = $("select#out_press_units").val();
  update_units("MPa", v, ["#out_press_value"], ["#out_press_value_tot"]);

  v = $("select#out_vol_units").val();
  update_units(
    "m3/kg",
    v,
    ["#out_vol_tot_value_calc"],
    ["#out_vol_value_tot"]
  );

  v = $("select#out_dens_units").val();
  update_units(
    "kg/m3",
    v,
    ["#out_dens_tot_value_calc"],
    ["#out_dens_value_tot"]
  );

  v = $("select#out_h_units").val();
  update_units(
    "kJ/kg",
    v,
    ["#out_h_tot_value_calc"],
    ["#out_h_value_tot"]
  );

  v = $("select#out_u_units").val();
  update_units(
    "kJ/kg",
    v,
    ["#out_u_tot_value_calc"],
    ["#out_u_value_tot"]
  );

  v = $("select#out_s_units").val();
  update_units(
    "kJ/kg-K",
    v,
    ["#out_s_tot_value_calc"],
    ["#out_s_value_tot"]
  );

  v = $("select#out_cp_units").val();
  update_units(
    "kJ/kg-K",
    v,
    ["#out_cp_tot_value_calc"],
    ["#out_cp_value_tot"]
  );

  v = $("select#out_cv_units").val();
  update_units(
    "kJ/kg-K",
    v,
    ["#out_cv_tot_value_calc"],
    ["#out_cv_value_tot"]
  );

  v = $("select#out_sos_units").val();
  update_units(
    "m/s",
    v,
    ["#out_sos_tot_value_calc"],
    ["#out_sos_value_tot"]
  );

  v = $("select#out_visc_units").val();
  update_units(
    "Pa-s",
    v,
    ["#out_visc_tot_value_calc"],
    ["#out_visc_value_tot"]
  );

  v = $("select#out_thcon_units").val();
  update_units(
    "W/(m-K)",
    v,
    ["#out_thcon_tot_value_calc"],
    ["#out_thcon_value_tot"]
  );

  //Following values are unitless and require no conversion
}

function fill_units(target_select_div, base_unit) {
  let unit_conv = CONVERSION_MAP[base_unit];
  let avail_units = Object.keys(unit_conv);
  avail_units.sort();
  for (let i = 0; i < avail_units.length; i++) {
    $("select" + target_select_div).append(
      $("<option>").val(avail_units[i]).html(avail_units[i])
    );
  }
}
function convert_value(base_value, base_unit, new_units) {
  if (base_value === "") {
    return "";
  }
  let unit_conv = CONVERSION_MAP[base_unit][new_units];
  let scale = unit_conv[0];
  let offset = unit_conv[1];
  let prec = unit_conv[2];
  return (base_value * scale + offset).toFixed(prec);
}
function convert_to_base_value(cur_value, cur_unit, base_unit) {
  if (base_unit === "" || cur_unit === "") {
    return "";
  }
  let unit_conv = CONVERSION_MAP[base_unit];
  let avail_units = Object.keys(unit_conv);
  for (let i = 0; i < avail_units.length; i++) {
    if (cur_unit === avail_units[i]) {
      let scale_offset_prec = unit_conv[cur_unit];
      let scale = scale_offset_prec[0];
      let offset = scale_offset_prec[1];
      return (cur_value - offset) / scale;
    }
  }
  return "";
}
function update_units(
  base_unit,
  new_units,
  source_values_divs,
  dest_values_divs
) {
  let sources_count = source_values_divs.length;
  let dest_count = dest_values_divs.length;
  if (
    !Number.isInteger(sources_count) ||
    !Number.isInteger(dest_count) ||
    dest_count != sources_count
  ) {
    alert("Bad call to update_units");
    return;
  }
  for (let i = 0; i < sources_count; i++) {
    $(dest_values_divs[i]).html(
      convert_value($(source_values_divs[i]).html(), base_unit, new_units)
    );
  }
}

function convert_spec_to_SI(spec_type, spec_unit, spec_value) {
  if (spec_type == "Qual.") {
    return spec_value;
  } else if (spec_type == "Temp.") {
    return convert_to_base_value(spec_value, spec_unit, "K");
  } else if (spec_type == "Press.") {
    return convert_to_base_value(spec_value, spec_unit, "MPa");
  } else if (spec_type == "Enthalpy") {
    return convert_to_base_value(spec_value, spec_unit, "kJ/kg");
  } else if (spec_type == "Entropy") {
    return convert_to_base_value(spec_value, spec_unit, "kJ/kg-K");
  }
}

function to_prec(x, p) {
  if (x === "") {
    return "";
  }
  return x.toFixed(p);
}

function change_divs(
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
) {
  //Now fill out the divs
  $("#out_qual_tot_value_calc").html(qual_calc[2].toFixed(5));
  $("#out_qual_vol_tot_value_calc").html(qual_vol_calc[2].toFixed(5));
  $("#out_press_value").html(press_calc[0]);
  $("#out_temp_value").html(temp_calc[0]);
  $("#out_h_tot_value_calc").html(h_calc[2]);
  $("#out_u_tot_value_calc").html(u_calc[2]);
  $("#out_s_tot_value_calc").html(s_calc[2]);
  $("#out_dens_tot_value_calc").html(rho_calc[2]);
  $("#out_vol_tot_value_calc").html(vol_calc[2]);
  $("#out_cp_tot_value_calc").html(Cp_calc[2]);
  $("#out_cv_tot_value_calc").html(Cv_calc[2]);
  $("#out_sos_tot_value_calc").html(w_calc[2]);
  $("#out_visc_tot_value_calc").html(my_calc[2]);
  $("#out_thcon_tot_value_calc").html(tc_calc[2]);
  $("#out_pr_tot_value_calc").html(to_prec(pr_calc[2], 4));
  $("#out_cpcv_tot_value_calc").html(to_prec(kappa_calc[2], 4));
  update_all_values();
}