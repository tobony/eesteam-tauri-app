export function blendByQuality(vaporValue, liquidValue, quality) {
  return quality * vaporValue + (1 - quality) * liquidValue;
}
