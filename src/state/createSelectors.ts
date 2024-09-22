import { AppSlice } from '../types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSelectors = (_store: any) => {
  const store = _store
  store.use = {}
  for (const key of Object.keys(store.getState())) {
    store.use[key] = () =>
      store((state: AppSlice) => state[key as keyof typeof state])
  }

  return store
}

export default createSelectors
