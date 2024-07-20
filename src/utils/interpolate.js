// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

import { COORDINATE } from '../const'

const DEFAULT_PRECISION = 15

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const validateRatio = (ratio) => {
  if (ratio < 0 || ratio > 1) {
    throw new Error(`Ratio must be between 0 and 1, but was '${ratio}'`)
  }
}

const getApproximatePointsOnCurve = (curve, precision) => {
  const points = []

  for (let i = 0; i <= precision; i++) {
    const ratio = i / precision
    points.push(interpolatePointOnCurveLinear(ratio, curve))
  }

  return points
}

const getCumulativeLengths = (pointsApproximate) => {
  const cumulativeLengths = [0]
  for (let i = 1; i < pointsApproximate.length; i++) {
    // Find distance between current and previous approximate points
    const lastApproximatePoint = pointsApproximate[i - 1]
    const thisApproximatePoint = pointsApproximate[i]
    const distance = getDistanceBetweenPoints(
      lastApproximatePoint,
      thisApproximatePoint
    )

    // Add the next cummulative length
    const lastCummulativeLength = cumulativeLengths[i - 1]
    cumulativeLengths.push(lastCummulativeLength + distance)
  }

  return cumulativeLengths
}

const findClosestPointOnCurve = (
  cumulativeLengths,
  curve,
  targetLength,
  precision
) => {
  let point = null
  for (let i = 1; i < cumulativeLengths.length; i++) {
    if (cumulativeLengths[i] >= targetLength) {
      const ratio =
        (i -
          1 +
          (targetLength - cumulativeLengths[i - 1]) /
            (cumulativeLengths[i] - cumulativeLengths[i - 1])) /
        precision
      point = interpolatePointOnCurveLinear(ratio, curve)
      break
    }
  }
  return point
}

const interpolateDimensionLinear = (
  axis,
  ratio,
  { controlPoint1, controlPoint2, startPoint, endPoint }
) => {
  return (
    // (1−v)C1(u)
    Math.pow(1 - ratio, 3) * startPoint[axis] +
    3 * ratio * Math.pow(1 - ratio, 2) * controlPoint1[axis] +
    3 * ratio * ratio * (1 - ratio) * controlPoint2[axis] +
    ratio * ratio * ratio * endPoint[axis]
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getDistanceBetweenPoints = (point1, point2) =>
  Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))

export const interpolatePointOnCurveEvenlySpaced = (
  ratio,
  curve,
  // Get an approximation using an arbitrary number of points. Increase for more
  // accuracy at cost of performance
  { precision = DEFAULT_PRECISION } = {}
) => {
  validateRatio(ratio)

  // Approximate the curve with a high number of points
  const pointsApproximate = getApproximatePointsOnCurve(curve, precision)

  // Calculate the cumulative arc length
  const cumulativeLengths = getCumulativeLengths(pointsApproximate)

  const totalLength = cumulativeLengths[cumulativeLengths.length - 1]
  const targetLength = ratio * totalLength

  // Interpolate new point based on the cumulative arc length
  return findClosestPointOnCurve(
    cumulativeLengths,
    curve,
    targetLength,
    precision
  )
}

export const interpolatePointOnCurveLinear = (ratio, curve) => {
  validateRatio(ratio)

  return {
    x: interpolateDimensionLinear(COORDINATE.X, ratio, curve),
    y: interpolateDimensionLinear(COORDINATE.Y, ratio, curve),
    ratio,
  }
}
