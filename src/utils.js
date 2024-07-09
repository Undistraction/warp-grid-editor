import { Bezier } from 'bezier-js'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const DEFAULT_PRECISION = 1000

const BEZIER_POINT_NAMES = [
  'startPoint',
  'endPoint',
  'controlPoint1',
  'controlPoint2',
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const validateRatio = (ratio) => {
  if (ratio < 0 || ratio > 1) {
    throw new Error(`Ratio must be between 0 and 1, but was '${ratio}'`)
  }
}

const getDistanceBetweenPoints = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  )
}

const getInterpolatedPointsOnCurve = (curve, precision) => {
  const points = []

  for (let i = 0; i <= precision; i++) {
    const ratio = i / precision
    points.push(getInterpolatedPointOnCurve(ratio, curve))
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

const getInterpolatedPointOnCurveEvenlyDistributed = (
  cumulativeLengths,
  curve,
  targetLength,
  precision
) => {
  let point = null
  for (let j = 1; j < cumulativeLengths.length; j++) {
    if (cumulativeLengths[j] >= targetLength) {
      const t =
        (j -
          1 +
          (targetLength - cumulativeLengths[j - 1]) /
            (cumulativeLengths[j] - cumulativeLengths[j - 1])) /
        precision
      point = getInterpolatedPointOnCurve(t, curve)
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

const interpolateBetweenPoints = (range, point1, point2) => {
  const { deltaX, deltaY } = getDeltasBetweenPoints(point2, point1)

  return {
    x: point1.x + range * deltaX,
    y: point1.y + range * deltaY,
  }
}

const interpolateCurvePoints = (range, curve1, curve2) => {
  return BEZIER_POINT_NAMES.reduce((acc, name) => {
    acc[name] = interpolateBetweenPoints(range, curve1[name], curve2[name])
    return acc
  }, {})
}

const getBezier = (curve) => {
  return new Bezier(...getCurvePropsAsArray(curve))
}

const getIntersectionBetweenCurves = (curve1, curve2) => {
  const curve1Bezier = getBezier(curve1)
  const curve2Bezier = getBezier(curve2)

  return curve1Bezier.intersects(curve2Bezier).map((pair) => {
    var t = pair.split('/').map((v) => parseFloat(v))
    const point = curve1Bezier.get(t[0])
    return point
  })
}

const getIntersectionWithCurveSet = (curve, intersectionCurves) => {
  return intersectionCurves.reduce((acc, intersectionCurve) => {
    const points = getIntersectionBetweenCurves(curve, intersectionCurve)
    return [...acc, ...points]
  }, [])
}

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

const getPointOffsetByDeltas = (point, deltas) => {
  return {
    x: point.x + deltas.deltaX,
    y: point.y + deltas.deltaY,
  }
}

const getCornerPoints = (x, y, width, height) => {
  const rightBounds = x + width
  const bottomBounds = y + height

  return {
    topLeft: { x, y },
    topRight: { x: rightBounds, y },
    bottomRight: { x: rightBounds, y: bottomBounds },
    bottomLeft: { x, y: bottomBounds },
  }
}

const getInterpolatedAxis = (
  axis,
  ratio,
  { controlPoint1, controlPoint2, startPoint, endPoint }
) => {
  return (
    Math.pow(1 - ratio, 3) * startPoint[axis] +
    3 * ratio * Math.pow(1 - ratio, 2) * controlPoint1[axis] +
    3 * ratio * ratio * (1 - ratio) * controlPoint2[axis] +
    ratio * ratio * ratio * endPoint[axis]
  )
}

const getInterpolatedPointOnCurve = (ratio, curve) => {
  return {
    x: getInterpolatedAxis('x', ratio, curve),
    y: getInterpolatedAxis('y', ratio, curve),
  }
}

const getInterpolatedPointsOnCurveEvenlyDistributed = (
  ratio,
  curve,
  // Get an approximation using an arbitrary number of points. Increase for more
  // accuracy at cost of performance
  { precision = DEFAULT_PRECISION } = {}
) => {
  // Approximate the curve with a high number of points
  const pointsApproximate = getInterpolatedPointsOnCurve(curve, precision)

  // Calculate the cumulative arc length
  const cumulativeLengths = getCumulativeLengths(pointsApproximate)

  const totalLength = cumulativeLengths[cumulativeLengths.length - 1]
  const targetLength = ratio * totalLength

  // Interpolate new point based on the cumulative arc length
  let point = getInterpolatedPointOnCurveEvenlyDistributed(
    cumulativeLengths,
    curve,
    targetLength,
    precision
  )

  return point
}

// Simple stategy is to:
// 1. find the correct start and end points on the adjacent edges
// 2. Move the start and end points to those
// 3. Move the control points half of the distance that the start/end points
//    moved.
// This gives a fairly pleasing result
const simpleStrategy = (interpolatedCurve, ratio, curve1, curve2) => {
  // Use ratio to find a point on the first curve which will be the starting
  // point of our curve.
  const startPoint = getInterpolatedPointsOnCurveEvenlyDistributed(
    ratio,
    curve1
  )

  // Use ratio to find a point on the opposite curve which will be the ending
  // point of our curve.
  const endPoint = getInterpolatedPointsOnCurveEvenlyDistributed(ratio, curve2)

  const startDeltas = getDeltasBetweenPoints(
    interpolatedCurve.startPoint,
    startPoint
  )
  const endDeltas = getDeltasBetweenPoints(interpolatedCurve.endPoint, endPoint)

  const controlPoint1Interpolated = getPointOffsetByDeltas(
    interpolatedCurve.controlPoint1,
    startDeltas
  )
  const controlPoint2Interpolated = getPointOffsetByDeltas(
    interpolatedCurve.controlPoint2,
    endDeltas
  )

  return {
    startPoint,
    endPoint,
    controlPoint1: controlPoint1Interpolated,
    controlPoint2: controlPoint2Interpolated,
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getBoundingCurves = ({ x, y, width, height }) => {
  const corners = getCornerPoints(x, y, width, height)

  const boundingCurves = {
    top: {
      startPoint: corners.topLeft,
      endPoint: corners.topRight,
    },
    right: {
      startPoint: corners.topRight,
      endPoint: corners.bottomRight,
    },
    bottom: {
      startPoint: corners.bottomLeft,
      endPoint: corners.bottomRight,
    },
    left: {
      startPoint: corners.topLeft,
      endPoint: corners.bottomLeft,
    },
  }

  return boundingCurves
}

export const getIntersectionsBetweenCurveSets = (
  curvesFromLeftToRight,
  curvesFromTopToBottom
) => {
  return curvesFromLeftToRight.reduce((acc, curve) => {
    const points = getIntersectionWithCurveSet(curve, curvesFromTopToBottom)
    return [...acc, ...points]
  }, [])
}

export const interpolatCurve = (
  ratio,
  { curve1, curve2 },
  { curve3, curve4 },
  { strategy = true } = {}
) => {
  validateRatio(ratio)

  // Get a curve that is interpolated between our start and end points
  const interpolatedCurve = interpolateCurvePoints(ratio, curve3, curve4)

  // Because the bounds are curves, if we only interpolate between oppostite
  // edges, the start and end points of the curve will not lie on their
  // respective adjacent curves, so we need to adjust for this.

  return strategy
    ? simpleStrategy(interpolatedCurve, ratio, curve1, curve2)
    : interpolatedCurve
}
