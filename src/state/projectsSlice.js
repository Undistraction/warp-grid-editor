// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createProjectsSlice = (set) => ({
  projects: [],
  setProjects: (projects) => set(() => projects),
})

export default createProjectsSlice
