// Linear interpolation
export const lerp = (ratio, point1, point2) => {
  const ratioRemaining = 1 - ratio
  return {
    x: ratioRemaining * point1.x + ratio * point2.x,
    y: ratioRemaining * point1.y + ratio * point2.y,
  }
}

// Bilinear interpolation
export const blerb = (ratioX, ratioY, p00, p01, p10, p11) => {
  const a = lerp(ratioX, p00, p01)
  const b = lerp(ratioX, p10, p11)
  return lerp(ratioY, a, b)
}
