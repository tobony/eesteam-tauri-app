export function formatFixed2(value) {
  if (!Number.isFinite(value)) {
    return "";
  }
  return value.toFixed(2);
}
