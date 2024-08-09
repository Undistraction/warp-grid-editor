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
        x: Math.max(acc.x, bounds.x.max),
        y: Math.max(acc.y, bounds.y.max),
      }
    },
    { x: 0, y: 0 }
  )
)
