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
