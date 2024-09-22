// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSelectors = (_store: any) => {
  const store = _store
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.use[k] = () => store((s: any) => s[k])
  }

  return store
}

export default createSelectors
