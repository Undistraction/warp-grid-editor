import { Bezier } from 'bezier-js'
import { pipe, reduce } from 'ramda'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getBezier = ({ startPoint, endPoint, controlPoint1, controlPoint2 }) => {
  const args = [
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
    (acc, curve) => {
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
