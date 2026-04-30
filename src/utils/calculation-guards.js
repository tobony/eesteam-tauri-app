import { validateSpecPairContract, validateSpecValue } from "./spec-validation.js";

export function clampQuality(quality) {
  if (quality < 0) return 0;
  if (quality > 1) return 1;
  return quality;
}

export function validateSpecPair(specs) {
  const keys = Object.keys(specs);
  if (keys.length !== 2) {
    return { ok: false, code: "SPEC_COUNT_MISMATCH", message: "두 개의 사양을 입력해주세요.", hint: "Enter exactly two specification values." };
  }

  const pairValidation = validateSpecPairContract(keys[0], keys[1]);
  if (!pairValidation.ok) {
    return pairValidation;
  }

  for (const key of keys) {
    const value = specs[key];
    const valueValidation = validateSpecValue(key, value);
    if (!valueValidation.ok) {
      return valueValidation;
    }
  }

  return { ok: true };
}

export function resolveCalculationRoute(specs) {
  if ("Qual." in specs && "Press." in specs) return "press-qual";
  if ("Qual." in specs && "Temp." in specs) return "temp-qual";
  if ("Temp." in specs && "Press." in specs) return "temp-press";
  if ("Press." in specs && "Enthalpy" in specs) return "press-enthalpy";
  if ("Press." in specs && "Entropy" in specs) return "press-entropy";
  if ("Enthalpy" in specs && "Entropy" in specs) return "enthalpy-entropy";
  if ("Enthalpy" in specs && "Qual." in specs) return "enthalpy-qual";
  if ("Entropy" in specs && "Qual." in specs) return "entropy-qual";
  if ("Enthalpy" in specs && "Temp." in specs) return "enthalpy-temp";
  return "unsupported";
}
