const RANGE_RULES = {
  "Qual.": { min: 0, max: 1, code: "OUT_OF_RANGE", hint: "Quality must be between 0 and 1." },
  "Temp.": { minExclusive: 0, code: "OUT_OF_RANGE", hint: "Temperature must be greater than 0 K." },
  "Press.": { min: 0, code: "OUT_OF_RANGE", hint: "Pressure must be greater than or equal to 0." },
};

const SUPPORTED_PAIRS = new Set([
  "Press.|Qual.",
  "Qual.|Temp.",
  "Press.|Temp.",
  "Enthalpy|Press.",
  "Entropy|Press.",
  "Enthalpy|Entropy",
  "Enthalpy|Qual.",
  "Entropy|Qual.",
  "Enthalpy|Temp.",
]);

function sortedPairKey(spec1Type, spec2Type) {
  return [spec1Type, spec2Type].sort().join("|");
}

export function validateSpecValue(type, value) {
  if (!Number.isFinite(value)) {
    return { ok: false, code: "INVALID_NUMBER", message: `${type} value is invalid.`, hint: "Enter a finite numeric value." };
  }

  const rule = RANGE_RULES[type];
  if (!rule) {
    return { ok: true };
  }

  if (rule.min !== undefined && value < rule.min) {
    return { ok: false, code: rule.code, message: `${type} is out of range.`, hint: rule.hint };
  }

  if (rule.max !== undefined && value > rule.max) {
    return { ok: false, code: rule.code, message: `${type} is out of range.`, hint: rule.hint };
  }

  if (rule.minExclusive !== undefined && value <= rule.minExclusive) {
    return { ok: false, code: rule.code, message: `${type} is out of range.`, hint: rule.hint };
  }

  return { ok: true };
}

export function validateSpecPairContract(spec1Type, spec2Type) {
  const key = sortedPairKey(spec1Type, spec2Type);
  if (!SUPPORTED_PAIRS.has(key)) {
    return {
      ok: false,
      code: "UNSUPPORTED_PAIR",
      message: `${spec1Type} and ${spec2Type} are not supported together.`,
      hint: "Choose one of the supported specification pairs.",
    };
  }
  return { ok: true };
}
