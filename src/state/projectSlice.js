import { assocPath, curry, mapObjIndexed, modifyPath, pipe, when } from 'ramda'
import { v4 } from 'uuid'

import {
  BOUNDS_POINT_IDS,
  CORNER_POINTS,
  INTERPOLATION_STRATEGY,
  LINE_STRATEGY,
  PROJECT_VERSION,
} from '../const'
import { getBoundingCurvesApi } from '../utils/boundingCurvesApi'

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const GRID_DEFINITION_DEFAULT = {
  columns: 25,
  rows: 25,
  gutter: 0,
  lineStrategy: LINE_STRATEGY.CURVES,
  interpolationStrategy: INTERPOLATION_STRATEGY.EVEN,
  precision: 20,
}

const CONFIG_DEFAULT = {
  grid: {
    shouldUseComplexColumnsRows: false,
    shouldDrawIntersections: false,
  },
  bounds: {
    shouldDrawBounds: true,
    shouldDrawCornerPoints: true,
    isLinked: true,
    isMirrored: false,
    corners: {
      [BOUNDS_POINT_IDS.TOP_LEFT]: { isLinked: true, isMirrored: false },
      [BOUNDS_POINT_IDS.TOP_RIGHT]: { isLinked: true, isMirrored: false },
      [BOUNDS_POINT_IDS.BOTTOM_LEFT]: { isLinked: true, isMirrored: false },
      [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: { isLinked: true, isMirrored: false },
    },
  },
}

const PROJECT_DEFAULT = {
  meta: {
    name: `New project`,
    date: new Date().toUTCString(),
    version: PROJECT_VERSION,
    uuid: v4(),
  },
  config: CONFIG_DEFAULT,
  gridDefinition: GRID_DEFINITION_DEFAULT,
  boundingCurves: null,
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const updateCornerPoints = (name, value) => (corners) => ({
  ...mapObjIndexed(
    (corner) => ({
      ...corner,
      [name]: value,
    }),
    corners
  ),
})

const expandControlPoints = (boundingCurves) =>
  CORNER_POINTS.reduce((acc, id) => {
    const boundsApi = getBoundingCurvesApi(acc)
    return boundsApi.expandControlPoints(id)
  }, boundingCurves)

const zeroControlPoints = (boundingCurves) =>
  CORNER_POINTS.reduce((acc, name) => {
    const boundsApi = getBoundingCurvesApi(acc)
    return boundsApi.zeroControlPoints(name)
  }, boundingCurves)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createProjectSlice = (set) => ({
  project: PROJECT_DEFAULT,
  // ---------------------------------------------------------------------------
  // Root setter
  // ---------------------------------------------------------------------------
  setProject: (project) =>
    set(() => ({
      project,
    })),
  // ---------------------------------------------------------------------------
  // Name
  // ---------------------------------------------------------------------------
  setProjectName: (name) => {
    set(assocPath([`project`, `meta`, `name`], name))
  },

  // ---------------------------------------------------------------------------
  // Global config
  // ---------------------------------------------------------------------------

  zeroControlPointsGlobal: () => {
    set(modifyPath([`project`, `boundingCurves`], zeroControlPoints))
  },

  mirrorControlPointsGlobal: (isMirrored) => {
    set(
      pipe(
        assocPath([`project`, `config`, `bounds`, `isMirrored`], isMirrored),
        modifyPath(
          [`project`, `config`, `bounds`, `corners`],
          updateCornerPoints(`isMirrored`, isMirrored)
        )
      )
    )
  },

  linkControlPointsGlobal: (isLinked) => {
    set(
      pipe(
        assocPath([`project`, `config`, `bounds`, `isLinked`], isLinked),
        modifyPath(
          [`project`, `config`, `bounds`, `corners`],
          updateCornerPoints(`isLinked`, isLinked)
        ),
        modifyPath(
          [`project`, `boundingCurves`],
          when(() => isLinked, expandControlPoints)
        )
      )
    )
  },

  // ---------------------------------------------------------------------------
  // Bounding Curves
  // ---------------------------------------------------------------------------

  setBoundingCurves: (boundingCurves) => {
    set(assocPath([`project`, `boundingCurves`], boundingCurves))
  },

  updateBoundingCurvesPosition: (position) => {
    set(({ project }) => {
      const boundsApi = getBoundingCurvesApi(
        project.boundingCurves,
        project.config
      )
      const updatedBoundingCurves = boundsApi.translateToPoint(position)
      return {
        project: {
          ...project,
          boundingCurves: updatedBoundingCurves,
        },
      }
    })
  },

  // ---------------------------------------------------------------------------
  // Other config
  // ---------------------------------------------------------------------------

  updateBoundingCurvesCornerNode: curry((nodeId, newPosition) => {
    set(({ project }) => {
      const boundsApi = getBoundingCurvesApi(
        project.boundingCurves,
        project.config
      )
      const updatedBoundingCurves = boundsApi.updateNodePosition(
        nodeId,
        newPosition
      )
      return {
        project: {
          ...project,
          boundingCurves: updatedBoundingCurves,
        },
      }
    })
  }),

  zeroControlPoints: (cornerNodeId) => () => {
    set(({ project }) => {
      const boundsApi = getBoundingCurvesApi(
        project.boundingCurves,
        project.config
      )

      const updatedBoundingCurves = boundsApi.zeroControlPoints(cornerNodeId)
      return {
        project: {
          ...project,
          boundingCurves: updatedBoundingCurves,
        },
      }
    })
  },

  linkControlPoints: (cornerNodeId) => (isLinked) => {
    set(({ project }) => {
      const boundsApi = getBoundingCurvesApi(
        project.boundingCurves,
        project.config
      )

      return {
        project: {
          ...project,
          boundingCurves: isLinked
            ? boundsApi.expandControlPoints(cornerNodeId)
            : project.boundingCurves,
          config: {
            ...project.config,
            bounds: {
              // If any individual control points are unmirrored set global to
              // false
              isLinked: !isLinked ? false : project.config.bounds.isLinked,
              ...project.config.bounds,
              corners: {
                ...project.config.bounds.corners,
                [cornerNodeId]: {
                  ...project.config.bounds.corners[cornerNodeId],
                  isLinked,
                },
              },
            },
          },
        },
      }
    })
  },

  mirrorControlPoints: (cornerNodeId) => (isMirrored) => {
    set(({ project }) => {
      return {
        project: {
          ...project,
          config: {
            ...project.config,
            bounds: {
              ...project.config.bounds,
              // If any individual control points are unmirrored set global to false
              isMirrored: !isMirrored
                ? false
                : project.config.bounds.isMirrored,
              corners: {
                ...project.config.bounds.corners,
                [cornerNodeId]: {
                  ...project.config.bounds.corners[cornerNodeId],
                  isMirrored,
                },
              },
            },
          },
        },
      }
    })
  },

  setConfigValue: curry((pathToValue, value) => {
    set(assocPath([`project`, `config`, ...pathToValue], value))
  }),

  // ---------------------------------------------------------------------------
  // Grid defintion
  // ---------------------------------------------------------------------------

  setGridDefinitionValue: curry((pathToValue, value) => {
    set(assocPath([`project`, `gridDefinition`, ...pathToValue], value))
  }),
})

export default createProjectSlice
