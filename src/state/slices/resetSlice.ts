import { StateCreator } from 'zustand'

import type { AppSlice, ResetSlice } from '../../types'
import { APP_CONFIG_DEFAULT, PROJECT_DEFAULT } from '../defaults'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createResetSlice: StateCreator<AppSlice, [], [], ResetSlice> = (set) => ({
  reset: () => {
    set(() => ({
      projects: [],
      config: APP_CONFIG_DEFAULT,
      project: PROJECT_DEFAULT,
    }))
  },
})

export default createResetSlice
