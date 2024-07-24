// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const roundToTwoPlaces = (num) => {
  return +(Math.round(num + `e+2`) + `e-2`)
}

export const clampNumberBetween = (min, max, value) => {
  return Math.min(Math.max(value, min), max)
}
