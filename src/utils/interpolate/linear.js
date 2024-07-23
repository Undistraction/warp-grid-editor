import { COORDINATE } from '../../const'
import { roundTo10 } from '../math'
import { validateRatio } from '../validation'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

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

export const interpolatePointOnCurveLinear = (ratio, curve) => {
  // Round the ratio to 10 decimal places to avoid rounding issues where the
  // number is fractionally over 1 or below 0
  const ratioRounded = roundTo10(ratio)
  validateRatio(ratioRounded)

  return {
    x: interpolateDimensionLinear(COORDINATE.X, ratioRounded, curve),
    y: interpolateDimensionLinear(COORDINATE.Y, ratioRounded, curve),
    ratio,
  }
}
