// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const times = (callback, n) => {
  let result = []
  for (let i = 0; i < n; i++) {
    result.push(callback(i))
  }
  return result
}
