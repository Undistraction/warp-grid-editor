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

const saveMeta = (meta) => {
  localStorage.setItem(`meta`, JSON.stringify(meta))
}

const getMeta = () => {
  const meta = localStorage.meta
  return meta ? JSON.parse(meta) : {}
}

const saveProject = (name, value) => {
  const projects = getProjects()
  const id = uuid()

  const updatedProjects = JSON.stringify([
    ...projects,
    { ...value, id, version: VERSION, name, date: new Date().toUTCString() },
  ])
  localStorage.setItem(`projects`, updatedProjects)
  saveMeta({ lastProjectId: id })
}

const loadProject = (id) => {
  const projects = getProjects()
  const project = findProject(id, projects)
  saveMeta({ lastProjectId: id })
  return project
}

export default {
  saveProject,
  loadProject,
  getProjects,
  saveMeta,
  getMeta,
}
