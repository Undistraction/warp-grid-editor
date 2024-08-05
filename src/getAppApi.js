import { BOUNDS_POINT_IDS, CORNER_POINTS } from './const'
import { getBoundsApi } from './utils/boundsApi'
import { copyToClipboard } from './utils/clipboard'
import localStorageApi from './utils/localStorageApi'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getAppApi = ({
  boundingCurves,
  setBoundingCurves,
  config,
  setConfig,
  setSavedProjects,
  gridDefinition,
  setGridDefinition,
  setProject,
  coonsPatch,
}) => {
  const updateBounds = (nodeId) => (newPosition) => {
    const boundsApi = getBoundsApi(boundingCurves, config)
    const updatedBoundingCurves = boundsApi.updateNodePosition(
      nodeId,
      newPosition
    )
    setBoundingCurves(updatedBoundingCurves)
  }

  const updateBoundsPosition = (position) => {
    const boundsApi = getBoundsApi(boundingCurves, config)
    const newBoundingCurves = boundsApi.translateToPoint(position)
    setBoundingCurves(newBoundingCurves)
  }

  const linkControlPoints = (cornerNodeId) => (isLinked) => {
    const boundsApi = getBoundsApi(boundingCurves, config)
    if (isLinked) {
      const updatedBoundingCurves = boundsApi.expandControlPoints(cornerNodeId)
      setBoundingCurves(updatedBoundingCurves)
    }
    setConfig({
      ...config,
      global: {
        ...config.global,
        // If any individual control points are unmirrored set global to false
        isLinked: !isLinked ? false : config.global.isLinked,
      },
      bounds: {
        ...config.bounds,
        [cornerNodeId]: { ...config.bounds[cornerNodeId], isLinked },
      },
    })
  }

  const zeroControlPoints = (cornerNodeId) => () => {
    const boundsApi = getBoundsApi(boundingCurves, config)
    const updatedBoundingCurves = boundsApi.zeroControlPoints(cornerNodeId)
    setBoundingCurves(updatedBoundingCurves)
  }

  const mirrorControlPoints = (cornerNodeId) => (isMirrored) => {
    setConfig({
      ...config,
      global: {
        ...config.global,
        // If any individual control points are unmirrored set global to false
        isMirrored: !isMirrored ? false : config.global.isMirrored,
      },
      bounds: {
        ...config.bounds,
        [cornerNodeId]: { ...config.bounds[cornerNodeId], isMirrored },
      },
    })
  }

  const zeroControlPointsGlobal = () => {
    const updatedBoundingCurves = CORNER_POINTS.reduce((acc, name) => {
      const boundsApi = getBoundsApi(acc)
      return boundsApi.zeroControlPoints(name)
    }, boundingCurves)

    setBoundingCurves(updatedBoundingCurves)
  }

  const linkControlPointsGlobal = (isLinked) => {
    const updatedBoundingCurves = CORNER_POINTS.reduce((acc, cornerNodeId) => {
      const boundsApi = getBoundsApi(acc)
      return boundsApi.expandControlPoints(cornerNodeId)
    }, boundingCurves)

    setBoundingCurves(updatedBoundingCurves)

    setConfig({
      ...config,
      global: {
        ...config.global,
        isLinked,
      },
      bounds: {
        ...config.bounds,
        [BOUNDS_POINT_IDS.TOP_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_LEFT],
          isLinked,
        },
        [BOUNDS_POINT_IDS.TOP_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_RIGHT],
          isLinked,
        },
        [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_LEFT],
          isLinked,
        },
        [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_RIGHT],
          isLinked,
        },
      },
    })
  }

  const mirrorControlPointsGlobal = (isMirrored) => {
    setConfig({
      ...config,
      global: {
        ...config.global,
        isMirrored,
      },
      bounds: {
        ...config.bounds,
        [BOUNDS_POINT_IDS.TOP_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_LEFT],
          isMirrored,
        },
        [BOUNDS_POINT_IDS.TOP_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_RIGHT],
          isMirrored,
        },
        [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_LEFT],
          isMirrored,
        },
        [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_RIGHT],
          isMirrored,
        },
      },
    })
  }

  const saveProject = (id) => {
    localStorageApi.save(id, {
      grid: gridDefinition,
      boundingCurves,
      config,
    })
    setSavedProjects(localStorageApi.getProjects())
  }

  const loadProject = (id) => {
    const result = localStorageApi.load(id)
    setProject(result)
    setConfig(result.config)
    setGridDefinition(result.grid)
    setBoundingCurves(result.boundingCurves)
  }

  const exportBounds = () => {
    copyToClipboard(boundingCurves)
  }

  const exportCellBounds = () => {
    const cellBounds = coonsPatch.getAllCellBounds()
    copyToClipboard(cellBounds)
    console.log(`cellBounds`, cellBounds)
  }

  const exportGridDefinition = () => {
    copyToClipboard(gridDefinition)
    console.log(`gridDefinition`, gridDefinition)
  }

  return {
    mirrorControlPointsGlobal,
    linkControlPointsGlobal,
    zeroControlPointsGlobal,
    mirrorControlPoints,
    zeroControlPoints,
    linkControlPoints,
    updateBoundsPosition,
    updateBounds,
    loadProject,
    saveProject,
    exportBounds,
    exportCellBounds,
    exportGridDefinition,
  }
}

export default getAppApi
