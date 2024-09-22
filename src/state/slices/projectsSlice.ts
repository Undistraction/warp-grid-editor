import {
  append,
  assocPath,
  curry,
  find,
  findIndex,
  pathEq,
  update,
} from 'ramda'
import { v4 } from 'uuid'
import { StateCreator } from 'zustand'

import type { AppSlice, Project, ProjectsSlice } from '../../types'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const findByUuid = curry((uuid, items) =>
  find(pathEq(uuid, [`meta`, `uuid`]), items)
)

const findIndexByUuid = curry((uuid, items) =>
  findIndex(pathEq(uuid, [`meta`, `uuid`]), items)
)

const updateUuid = curry((uuid, item) =>
  assocPath([`meta`, `uuid`], uuid, item)
)

const setIsSavedToTrue = curry((item) =>
  assocPath([`meta`, `isSaved`], true, item)
)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createProjectsSlice: StateCreator<AppSlice, [], [], ProjectsSlice> = (
  set
) => ({
  projects: [],
  saveProject: (project: Project) =>
    set(({ projects }) => {
      const existingProjectIndex = findIndexByUuid(project.meta.uuid, projects)
      const projectsUpdated =
        existingProjectIndex >= 0
          ? update(existingProjectIndex, project, projects)
          : append(project, projects)
      return {
        projects: projectsUpdated,
      }
    }),
  saveProjectAs: (project: Project) =>
    set(({ projects }) => {
      const newProject = updateUuid(v4(), project)
      return {
        projects: append(newProject, projects),
        project: setIsSavedToTrue(project),
      }
    }),
  loadProject: (uuid: string) => {
    set(({ projects }) => {
      return {
        project: findByUuid(uuid, projects),
      }
    })
  },
})

export default createProjectsSlice
