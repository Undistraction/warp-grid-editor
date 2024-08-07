import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import createSelectors from './createSelectors'
import createConfigSlice from './slices/configSlice'
import createProjectSlice from './slices/projectSlice'
import createProjectsSlice from './slices/projectsSlice'
import createResetSlice from './slices/resetSlice.'

const useAppStoreBase = create(
  persist(
    (...a) => {
      return {
        ...createConfigSlice(...a),
        ...createProjectSlice(...a),
        ...createProjectsSlice(...a),
        ...createResetSlice(...a),
      }
    },
    {
      name: `warp-grid-editor`,
    }
  )
)

const useAppStore = createSelectors(useAppStoreBase)

export default useAppStore
