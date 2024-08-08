import { isNumber } from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const roundToTwoPlaces = (value) => {
  if (!isNumber(value)) return NaN
  return +(Math.round(value + `e+2`) + `e-2`)
}

export const clampNumberBetween = (min, max, value) => {
  if (!isNumber(min) || !isNumber(max) || !isNumber(value)) return NaN
  return Math.min(Math.max(value, min), max)
}

export const getRandomValueBetween = (min, max) => {
  return Math.random() * (max - min) + min
}

export const getRandomValueBetweenRounded = (min, max) => {
  return Math.round(getRandomValueBetween(min, max))
}
