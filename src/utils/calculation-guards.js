export function clampQuality(quality) {
  if (quality < 0) return 0;
  if (quality > 1) return 1;
  return quality;
}

export function validateSpecPair(specs) {
  const keys = Object.keys(specs);
  if (keys.length !== 2) {
    return { ok: false, message: "두 개의 사양을 입력해주세요." };
  }

  for (const key of keys) {
    const value = specs[key];
    if (!Number.isFinite(value)) {
      return { ok: false, message: `${key} 값이 올바르지 않습니다.` };
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
