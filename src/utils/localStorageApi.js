import { isNil } from 'ramda'
import { v4 as uuid } from 'uuid'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const VERSION = 1

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const findProject = (id, projects) => {
  return projects.find((project) => project.id === id)
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getProjects = () => {
  const { projects } = localStorage
  return isNil(projects) ? [] : JSON.parse(projects)
}

const saveApp = (app) => {
  localStorage.setItem(`app`, JSON.stringify(app))
}

const getApp = () => {
  const app = localStorage.app
  return app ? JSON.parse(app) : {}
}

const saveProject = (name, value) => {
  const projects = getProjects()
  const id = uuid()

  const updatedProjects = JSON.stringify([
    ...projects,
    { ...value, id, version: VERSION, name, date: new Date().toUTCString() },
  ])
  localStorage.setItem(`projects`, updatedProjects)
  saveApp({ lastProjectId: id })
}

const loadProject = (id) => {
  const projects = getProjects()
  const project = findProject(id, projects)
  saveApp({ lastProjectId: id })
  return project
}

export default {
  saveProject,
  loadProject,
  getProjects,
  saveApp,
  getApp,
}
