// import { isArray } from './types'

// const pipe =
//   (funcs) =>
//   (...args) => {
//     return funcs.reduce((acc, func) => {
//       const resolvedAcc = isArray(acc) ? acc : [acc]
//       return func(...acc)
//     }, args)
//   }

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
