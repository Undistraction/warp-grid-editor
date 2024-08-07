// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import { PROJECT_DEFAULT } from '../defaults'

const createResetSlice = (set) => ({
  reset: () => {
    set(() => ({
      projects: [],
      config: null,
      project: PROJECT_DEFAULT,
    }))
  },
})

export default createResetSlice
