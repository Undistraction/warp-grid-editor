import { pipe } from 'ramda'
import { isArray, isNumber, isPlainObj } from 'ramda-adjunct'

import type { Point } from '../types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Offsets = number | number[] | Point

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getPointFromArg = (numberOrPointOrArray: Offsets) => {
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

export const getDistanceBetweenPoints = (point1: Point, point2: Point) =>
  Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))

export const getDistanceBetweenPointsXY = (point1: Point, point2: Point) => [
  point2.x - point1.x,
  point2.y - point1.y,
]

export const getAngleOfTranslationRads = ([distanceX, distanceY]: number[]) =>
  Math.atan2(distanceY, distanceX)

export const getAngleBetweenPoints = pipe(
  getDistanceBetweenPointsXY,
  getAngleOfTranslationRads
)

export const getInverseAngleRads = (value: number) => value - Math.PI

export const getPointAtDistanceAndAngle = (
  origin: Point,
  angleRads: number,
  distance: number
) => {
  return {
    x: origin.x + Math.round(Math.cos(angleRads) * distance),
    y: origin.y + Math.round(Math.sin(angleRads) * distance),
  }
}

export const degreesToRadians = (degrees: number) => {
  if (!isNumber(degrees)) {
    return NaN
  }

  return degrees * (Math.PI / 180)
}

export const radiansToDegrees = (radians: number) => {
  if (!isNumber(radians)) {
    return NaN
  }

  return radians * (180 / Math.PI)
}

export const pointAdd = (offsets: Offsets, point: Point) => {
  const offsetsResolved = getPointFromArg(offsets)

  return {
    x: point.x + offsetsResolved.x,
    y: point.y + offsetsResolved.y,
  }
}

export const pointSubtract = (offsets: Offsets, point: Point) => {
  const offsetsResolved = getPointFromArg(offsets)

  return {
    x: point.x - offsetsResolved.x,
    y: point.y - offsetsResolved.y,
  }
}

export const pointsAreEqual = (point1: Point, point2: Point) =>
  point1.x === point2.x && point1.y === point2.y
