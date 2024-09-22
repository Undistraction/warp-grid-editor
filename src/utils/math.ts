import { reduce } from 'ramda'
import { isNumber } from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const roundToTwoPlaces = (value: number) => {
  if (!isNumber(value)) return NaN
  const n = value.toString() + `e+2`
  return +(Math.round(parseFloat(n)).toString() + `e-2`)
}

export const clampNumberBetween = (min: number, max: number, value: number) => {
  if (!isNumber(min) || !isNumber(max) || !isNumber(value)) return NaN
  return Math.min(Math.max(value, min), max)
}

export const getRandomValueBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const getRandomValueBetweenRounded = (min: number, max: number) => {
  return Math.round(getRandomValueBetween(min, max))
}

export const reduceMax = reduce(Math.max, 0)
