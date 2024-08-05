// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createConfigSlice = (set) => ({
  config: null,
  setConfig: (config) => set(() => config),
})

export default createConfigSlice
