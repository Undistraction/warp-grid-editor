import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import createConfigSlice from './configSlice'
import createSelectors from './createSelectors'
import createProjectSlice from './projectSlice'
import createProjectsSlice from './projectsSlice'

const useAppStoreBase = create(
  persist(
    (...a) => ({
      ...createConfigSlice(...a),
      ...createProjectSlice(...a),
      ...createProjectsSlice(...a),
    }),
    {
      name: `warp-grid-editor`,
    }
  )
)

const useAppStore = createSelectors(useAppStoreBase)

export default useAppStore
