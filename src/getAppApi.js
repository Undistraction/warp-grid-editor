import { BOUNDS_POINT_IDS, CORNER_POINTS } from './const'
import { getBoundsApi } from './utils/boundsApi'
import { copyToClipboard } from './utils/clipboard'
import localStorageApi from './utils/localStorageApi'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getAppApi = ({ setProjects, setProject, coonsPatch, project }) => {
  const updateConfigBounds = (nodeId) => (newPosition) => {
    const boundsApi = getBoundsApi(project.boundingCurves, project.config)
    const updatedBoundingCurves = boundsApi.updateNodePosition(
      nodeId,
      newPosition
    )
    setProject({ ...project, boundingCurves: updatedBoundingCurves })
  }

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

  const zeroControlPointsGlobal = () => {
    const updatedBoundingCurves = CORNER_POINTS.reduce((acc, name) => {
      const boundsApi = getBoundsApi(acc)
      return boundsApi.zeroControlPoints(name)
    }, project.boundingCurves)

    setProject({ ...project, boundingCurves: updatedBoundingCurves })
  }

  const linkControlPointsGlobal = (isLinked) => {
    const updatedBoundingCurves = isLinked
      ? CORNER_POINTS.reduce((acc, cornerNodeId) => {
          const boundsApi = getBoundsApi(acc)
          return boundsApi.expandControlPoints(cornerNodeId)
        }, project.boundingCurves)
      : project.boundingCurves

    setProject({
      ...project,
      boundingCurves: updatedBoundingCurves,
      config: {
        ...project.config,
        global: {
          ...project.config.global,
          isLinked,
        },
        bounds: {
          ...project.config.bounds,
          [BOUNDS_POINT_IDS.TOP_LEFT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.TOP_LEFT],
            isLinked,
          },
          [BOUNDS_POINT_IDS.TOP_RIGHT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.TOP_RIGHT],
            isLinked,
          },
          [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.BOTTOM_LEFT],
            isLinked,
          },
          [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.BOTTOM_RIGHT],
            isLinked,
          },
        },
      },
    })
  }

  const mirrorControlPointsGlobal = (isMirrored) => {
    setProject({
      ...project,
      config: {
        ...project.config,
        global: {
          ...project.config.global,
          isMirrored,
        },
        bounds: {
          ...project.config.bounds,
          [BOUNDS_POINT_IDS.TOP_LEFT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.TOP_LEFT],
            isMirrored,
          },
          [BOUNDS_POINT_IDS.TOP_RIGHT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.TOP_RIGHT],
            isMirrored,
          },
          [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.BOTTOM_LEFT],
            isMirrored,
          },
          [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
            ...project.config.bounds[BOUNDS_POINT_IDS.BOTTOM_RIGHT],
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
    mirrorControlPointsGlobal,
    linkControlPointsGlobal,
    zeroControlPointsGlobal,
    mirrorControlPoints,
    zeroControlPoints,
    linkControlPoints,
    updateConfigBoundsPosition,
    updateConfigBounds,
    loadProject,
    saveProject,
    exportBounds,
    exportCellBounds,
    exportGridDefinition,
  }
}

export default getAppApi
