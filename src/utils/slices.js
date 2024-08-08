import { assocPath, curry, hasPath, pipe, unless } from 'ramda'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const throwError = (message) => () => {
  throw new Error(message)
}

export const updateIfItemExistsOrThrow = curry(
  (errorMessage, pathToValue, value) =>
    pipe(
      unless(hasPath(pathToValue), throwError(errorMessage)),
      assocPath(pathToValue, value)
    )
)
