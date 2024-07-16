import { Bezier } from 'bezier-js'
import { AXIS, INTERPOLATION_STRATEGY } from './const'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const DEFAULT_PRECISION = 1000

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const validateRatio = (ratio) => {
  if (ratio < 0 || ratio > 1) {
    throw new Error(`Ratio must be between 0 and 1, but was '${ratio}'`)
  }
}

const getCoordinatesFromSlashedString = (pair) =>
  pair.split('/').map(parseFloat)

const getCurvePropsAsArray = (curve) => {
  return [
    curve.startPoint.x,
    curve.startPoint.y,
    curve.controlPoint1.x,
    curve.controlPoint1.y,
    curve.controlPoint2.x,
    curve.controlPoint2.y,
    curve.endPoint.x,
    curve.endPoint.y,
  ]
}

const getArePointsEqual = (point1, point2) => {
  return point1.x === point2.x && point1.y === point2.y
}

const getDistanceBetweenPoints = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  )
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

export const getDeltasBetweenPoints = (point1, point2) => {
  const deltaX = point1.x - point2.x
  const deltaY = point1.y - point2.y
  return { deltaX, deltaY }
}

const interpolateBetweenPointsLinear = (range, point1, point2) => {
  const { deltaX, deltaY } = getDeltasBetweenPoints(point2, point1)

  return {
    x: point1.x + range * deltaX,
    y: point1.y + range * deltaY,
  }
}

const interpolateControlPoints = (ratio, curve1, curve2) => ({
  controlPoint1: interpolateBetweenPointsLinear(
    ratio,
    curve1.controlPoint1,
    curve2.controlPoint1
  ),
  controlPoint2: interpolateBetweenPointsLinear(
    ratio,
    curve1.controlPoint2,
    curve2.controlPoint2
  ),
})

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

const interpolatePointOnCurveLinear = (ratio, curve) => {
  return {
    x: interpolateDimensionLinear(AXIS.X, ratio, curve),
    y: interpolateDimensionLinear(AXIS.Y, ratio, curve),
    ratio,
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const isArray = Array.isArray
export const isInt = Number.isInteger
export const isUndefined = (value) => typeof value === 'undefined'
export const isNull = (value) => value === null
export const isNil = (value) => isUndefined(value) || isNull(value)
export const isString = (value) =>
  typeof value === 'string' || value instanceof String
export const isObject = (value) => typeof value === 'object'

export const getBezier = (curve) => {
  return new Bezier(...getCurvePropsAsArray(curve))
}

export const getCurveFromArray = ([
  startPoint,
  controlPoint1,
  controlPoint2,
  endPoint,
]) => ({
  startPoint,
  controlPoint1,
  controlPoint2,
  endPoint,
})

export const getSubcurveBetweenRatios = (curve, ratioStart, ratioEnd) => {
  const startPoint = interpolatePointOnCurveLinear(ratioStart, curve)
  const endPoint = interpolatePointOnCurveLinear(ratioEnd, curve)

  return getBezier(curve).split(startPoint.ratio, endPoint.ratio)
}

export const getIntersectionBetweenCurves = (curve1, curve2) => {
  const curve1Bezier = getBezier(curve1)
  const curve2Bezier = getBezier(curve2)
  let results = curve1Bezier
    .intersects(curve2Bezier)
    .map((coordinateString) => {
      const [point] = getCoordinatesFromSlashedString(coordinateString)
      const result = curve1Bezier.get(point)

      return {
        x: result.x,
        y: result.y,
        ratio: result.t,
      }
    })

  if (getArePointsEqual(curve1.startPoint, curve2.startPoint)) {
    results = [{ ...curve1.startPoint, ratio: 0 }, ...results]
  } else if (getArePointsEqual(curve1.startPoint, curve2.endPoint)) {
    results = [{ ...curve1.startPoint, ratio: 0 }, ...results]
  } else if (getArePointsEqual(curve1.endPoint, curve2.endPoint)) {
    results = [...results, { ...curve1.endPoint, ratio: 1 }]
  } else if (getArePointsEqual(curve1.endPoint, curve2.startPoint)) {
    results = [...results, { ...curve1.endPoint, ratio: 1 }]
  }

  return results
}

export const interpolatePointOnCurveEvenlySpaced = (
  ratio,
  curve,
  // Get an approximation using an arbitrary number of points. Increase for more
  // accuracy at cost of performance
  { precision = DEFAULT_PRECISION } = {}
) => {
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

export const interpolateBetweenCurves = (
  ratio,
  { curve1, curve2 },
  { curve3, curve4 },
  { interpolationStrategy }
) => {
  validateRatio(ratio)

  const getInterpolatedPointsOnCurve =
    interpolationStrategy === INTERPOLATION_STRATEGY.EVEN
      ? interpolatePointOnCurveEvenlySpaced
      : interpolatePointOnCurveLinear

  // Use ratio to find a point on the first curve which will be the starting
  // point of our curve.
  const startPoint = getInterpolatedPointsOnCurve(ratio, curve1)

  // Use ratio to find a point on the opposite curve which will be the ending
  // point of our curve.
  const endPoint = getInterpolatedPointsOnCurve(ratio, curve2)

  // Get a curve that is interpolated between our start and end points
  const { controlPoint1, controlPoint2 } = interpolateControlPoints(
    endPoint.ratio,
    curve3,
    curve4
  )

  return {
    startPoint,
    endPoint,
    controlPoint1,
    controlPoint2,
  }
}

const reverseCurve = ({
  startPoint,
  endPoint,
  controlPoint1,
  controlPoint2,
}) => {
  return {
    startPoint: endPoint,
    controlPoint1: controlPoint2,
    controlPoint2: controlPoint1,
    endPoint: startPoint,
  }
}

export const getPointOnSurface = (
  {
    // C1
    bottom,
    // C2
    top,
    // C3
    left,
    // C4
    right,
  },
  u,
  v,
  axis
) => {
  const cornerBottomLeft = bottom.startPoint
  const cornerBottomRight = bottom.endPoint
  const cornerTopLeft = top.startPoint
  const cornerTopRight = top.endPoint

  const leftReversed = reverseCurve(left)
  const rightReversed = reverseCurve(right)

  // (1-v)C1(u) +
  return (
    (1 - v) * interpolatePointOnCurveEvenlySpaced(u, bottom)[axis] +
    // vC2(u)
    v * interpolatePointOnCurveEvenlySpaced(u, top)[axis] +
    // (1-u)C3(v) +
    (1 - u) * interpolatePointOnCurveEvenlySpaced(v, leftReversed)[axis] +
    // uC4(v) -
    u * interpolatePointOnCurveEvenlySpaced(v, rightReversed)[axis] -
    // (1-u)(1-v)P00
    (1 - u) * (1 - v) * cornerBottomLeft[axis] -
    // u(1-v)P10
    u * (1 - v) * cornerBottomRight[axis] -
    // (1−u)vP01
    (1 - u) * v * cornerTopLeft[axis] -
    u * v * cornerTopRight[axis]
  )
}
