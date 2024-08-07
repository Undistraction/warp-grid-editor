// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import { isNumber } from 'ramda-adjunct'

export const getDistanceBetweenPoints = (point1, point2) =>
  Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))

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
