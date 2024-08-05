import { create } from 'zustand'
import createConfigSlice from './configSlice'
import createSelectors from './createSelectors'
import createProjectSlice from './projectSlice'
import createProjectsSlice from './projectsSlice'

const useAppStoreBase = create((...a) => ({
  ...createConfigSlice(...a),
  ...createProjectSlice(...a),
  ...createProjectsSlice(...a),
}))

const useAppStore = createSelectors(useAppStoreBase)

export default useAppStore
