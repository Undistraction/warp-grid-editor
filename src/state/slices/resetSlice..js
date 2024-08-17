// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import { APP_CONFIG_DEFAULT, PROJECT_DEFAULT } from '../defaults'

const createResetSlice = (set) => ({
  reset: () => {
    set(() => ({
      projects: [],
      config: APP_CONFIG_DEFAULT,
      project: PROJECT_DEFAULT,
    }))
  },
})

export default createResetSlice
