import { isString } from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const VALID_GUTTER_REGEXP = /^\d+(px)$/

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPixelNumberString = (value: any) => {
  return isString(value) && VALID_GUTTER_REGEXP.test(value)
}

export const isNumericString = (value: any) => {
  return isString(value) && !isNaN(value as any) && !isNaN(parseFloat(value))
}
/* eslint-enable @typescript-eslint/no-explicit-any */
