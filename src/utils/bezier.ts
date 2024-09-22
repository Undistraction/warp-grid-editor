import { Bezier } from 'bezier-js'
import { pipe, reduce } from 'ramda'

// eslint-disable-next-line import/named
import { Curve } from '../types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Bounds = {
  xMax: number
  yMax: number
  xMin: number
  yMin: number
}

type BezierArgs = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getBezier = ({
  startPoint,
  endPoint,
  controlPoint1,
  controlPoint2,
}: Curve) => {
  const args: BezierArgs = [
    startPoint.x,
    startPoint.y,
    controlPoint1.x,
    controlPoint1.y,
    controlPoint2.x,
    controlPoint2.y,
    endPoint.x,
    endPoint.y,
  ]

  return new Bezier(...args)
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getBounds = pipe(
  Object.values,
  reduce(
    (acc: Bounds, curve: Curve) => {
      const bounds = getBezier(curve).bbox()
      return {
        xMax: Math.max(acc.xMax, bounds.x.max),
        yMax: Math.max(acc.yMax, bounds.y.max),
        xMin: Math.min(acc.xMin, bounds.x.min),
        yMin: Math.min(acc.yMin, bounds.y.min),
      }
    },
    { xMax: 0, yMax: 0, xMin: Infinity, yMin: Infinity }
  )
)
