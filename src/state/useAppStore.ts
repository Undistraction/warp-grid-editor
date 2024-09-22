import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ConfigSlice, ProjectSlice, ProjectsSlice, ResetSlice } from '../types'
import createSelectors from './createSelectors'
import createConfigSlice from './slices/configSlice'
import createProjectSlice from './slices/projectSlice'
import createProjectsSlice from './slices/projectsSlice'
import createResetSlice from './slices/resetSlice'

const useStore = create<
  ProjectSlice & ProjectsSlice & ConfigSlice & ResetSlice
>()(
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

const useAppStore = createSelectors(useStore)

export default useAppStore
