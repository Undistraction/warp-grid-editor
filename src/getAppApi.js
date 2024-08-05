import { getBoundsApi } from './utils/boundsApi'
import { copyToClipboard } from './utils/clipboard'
import localStorageApi from './utils/localStorageApi'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getAppApi = ({ setProjects, setProject, coonsPatch, project }) => {
  const updateConfigBoundsPosition = (position) => {
    const boundsApi = getBoundsApi(project.boundingCurves, project.config)
    const updatedBoundingCurves = boundsApi.translateToPoint(position)
    setProject({ ...project, boundingCurves: updatedBoundingCurves })
  }

  const linkControlPoints = (cornerNodeId) => (isLinked) => {
    const boundsApi = getBoundsApi(project.boundingCurves, project.config)

    setProject({
      ...project,
      boundingCurves: isLinked
        ? boundsApi.expandControlPoints(cornerNodeId)
        : project.boundingCurves,
      config: {
        ...project.config,
        global: {
          ...project.config.global,
          // If any individual control points are unmirrored set global to false
          isLinked: !isLinked ? false : project.config.global.isLinked,
        },
        bounds: {
          ...project.config.bounds,
          [cornerNodeId]: { ...project.config.bounds[cornerNodeId], isLinked },
        },
      },
    })
  }

  const zeroControlPoints = (cornerNodeId) => () => {
    const boundsApi = getBoundsApi(project.boundingCurves, project.config)
    const updatedBoundingCurves = boundsApi.zeroControlPoints(cornerNodeId)
    setProject({
      ...project,
      boundingCurves: updatedBoundingCurves,
    })
  }

  const mirrorControlPoints = (cornerNodeId) => (isMirrored) => {
    setProject({
      ...project,
      config: {
        ...project.config,
        global: {
          ...project.config.global,
          // If any individual control points are unmirrored set global to false
          isMirrored: !isMirrored ? false : project.config.global.isMirrored,
        },
        bounds: {
          ...project.config.bounds,
          [cornerNodeId]: {
            ...project.config.bounds[cornerNodeId],
            isMirrored,
          },
        },
      },
    })
  }

  const saveProject = (id) => {
    localStorageApi.saveProject(id, project)
    setProjects(localStorageApi.getProjects())
  }

  const loadProject = (id) => {
    const result = localStorageApi.loadProject(id)
    setProject(result)
  }

  const exportBounds = () => {
    copyToClipboard(project.boundingCurves)
  }

  const exportCellBounds = () => {
    const cellBounds = coonsPatch.getAllCellBounds()
    copyToClipboard(cellBounds)
  }

  const exportGridDefinition = () => {
    copyToClipboard(project.gridDefinition)
  }

  return {
    mirrorControlPoints,
    zeroControlPoints,
    linkControlPoints,
    updateConfigBoundsPosition,
    loadProject,
    saveProject,
    exportBounds,
    exportCellBounds,
    exportGridDefinition,
  }
}

export default getAppApi
