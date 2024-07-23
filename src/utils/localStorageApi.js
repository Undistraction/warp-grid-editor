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

const save = (name, value) => {
  const projects = getProjects()
  const id = uuid()

  const updatedProjects = JSON.stringify([
    ...projects,
    { ...value, id, version: VERSION, name, date: new Date().toUTCString() },
  ])
  localStorage.setItem('projects', updatedProjects)
}

const load = (id) => {
  const projects = getProjects()
  return findProject(id, projects)
}

export default {
  save,
  load,
  getProjects,
}
