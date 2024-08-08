import { pipe } from 'ramda'
import { isArray, isNumber, isPlainObj } from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getPointFromArg = (numberOrPointOrArray) => {
  if (isArray(numberOrPointOrArray)) {
    return {
      x: numberOrPointOrArray[0],
      y: numberOrPointOrArray[1],
    }
  }

  if (isPlainObj(numberOrPointOrArray)) {
    return numberOrPointOrArray
  }

  return { x: numberOrPointOrArray, y: numberOrPointOrArray }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getDistanceBetweenPoints = (point1, point2) =>
  Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))

export const getDistanceBetweenPointsXY = (point1, point2) => [
  point2.x - point1.x,
  point2.y - point1.y,
]

export const getAngleOfTranslationRads = ([distanceX, distanceY]) =>
  Math.atan2(distanceY, distanceX)

export const getAngleBetweenPoints = pipe(
  getDistanceBetweenPointsXY,
  getAngleOfTranslationRads
)

export const getInverseAngleRads = (value) => value - Math.PI

export const getPointAtDistanceAndAngle = (origin, angleRads, distance) => {
  return {
    x: origin.x + Math.round(Math.cos(angleRads) * distance),
    y: origin.y + Math.round(Math.sin(angleRads) * distance),
  }
}

export const degreesToRadians = (degrees) => {
  if (!isNumber(degrees)) {
    return NaN
  }

  return degrees * (Math.PI / 180)
}

export const radiansToDegrees = (radians) => {
  if (!isNumber(radians)) {
    return NaN
  }

  return radians * (180 / Math.PI)
}

export const pointAdd = (offsets, point) => {
  const offsetsResolved = getPointFromArg(offsets)

  return {
    x: point.x + offsetsResolved.x,
    y: point.y + offsetsResolved.y,
  }
}

export const pointSubtract = (offsets, point) => {
  const offsetsResolved = getPointFromArg(offsets)

  return {
    x: point.x - offsetsResolved.x,
    y: point.y - offsetsResolved.y,
  }
}
