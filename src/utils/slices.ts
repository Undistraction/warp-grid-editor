import { assocPath, curry, hasPath, pipe, unless } from 'ramda'

import type { AppSlice } from '../types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const throwError = (message: string) => () => {
  throw new Error(message)
}

export const updateIfItemExistsOrThrow = curry(
  (errorMessage: string, pathToValue: string[], value: unknown) =>
    (appSlice: AppSlice) =>
      pipe(
        unless(hasPath(pathToValue), throwError(errorMessage)),
        assocPath(pathToValue, value)
      )(appSlice)
)
