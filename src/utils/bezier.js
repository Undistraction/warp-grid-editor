// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

import { COORDINATE } from '../const'

const interpolateControlPoint1 = ({
  startPoint,
  midPoint1,
  midPoint2,
  endPoint,
}) => {
  const [x, y] = Object.values(COORDINATE).map((coordinate) => {
    return (
      (1 / 6) *
      (-5 * startPoint[coordinate] +
        18 * midPoint1[coordinate] -
        9 * midPoint2[coordinate] +
        2 * endPoint[coordinate])
    )
  })

  console.log(x, y)
  return {
    x,
    y,
  }
}

const interpolateControlPoint2 = ({
  startPoint,
  midPoint1,
  midPoint2,
  endPoint,
}) => {
  const [x, y] = Object.values(COORDINATE).map((coordinate) => {
    return (
      (1 / 6) *
      (2 * startPoint[coordinate] -
        9 * midPoint1[coordinate] +
        18 * midPoint2[coordinate] -
        5 * endPoint[coordinate])
    )
  })

  console.log('X', x, 'Y', y)
  return {
    x,
    y,
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getBezierCurveFromPoints = (points) => {
  return {
    startPoint: points.startPoint,
    controlPoint1: interpolateControlPoint1(points),
    controlPoint2: interpolateControlPoint2(points),
    endPoint: points.endPoint,
  }
}
