import { assocPath, curry } from 'ramda'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const updateObject = curry((o, setO, pathToProp, value) => {
  const oUpdated = assocPath(pathToProp, value, o)
  setO(oUpdated)
})
