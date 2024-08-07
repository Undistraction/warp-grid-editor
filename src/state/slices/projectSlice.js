import {
  assocPath,
  curry,
  hasPath,
  join,
  last,
  mapObjIndexed,
  modifyPath,
  pipe,
  unless,
  when,
} from 'ramda'
import { isNotNil } from 'ramda-adjunct'

import { CORNER_POINTS } from '../../const'
import { clampGridSquareToGridDimensions } from '../../utils'
import { getBoundingCurvesApi } from '../../utils/boundingCurvesApi'
import { PROJECT_DEFAULT } from '../defaults'

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

const throwError = (message) => () => {
  throw new Error(message)
}

const joinWithPeriod = join(`.`)

const updateIfItemExistsOrThrow = curry((errorMessage, pathToValue, value) =>
  pipe(
    unless(hasPath(pathToValue), throwError(errorMessage)),
    assocPath(pathToValue, value)
  )
)

const updateGridSquareIfStepUpdate = (state) =>
  modifyPath(
    [`project`, `config`, `gridSquare`],
    when(
      isNotNil,
      clampGridSquareToGridDimensions(state.project.gridDefinition)
    )
  )(state)

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
  // Bounding Curves
  // ---------------------------------------------------------------------------

  setBoundingCurves: (boundingCurves) => {
    set(assocPath([`project`, `boundingCurves`], boundingCurves))
  },

  updateBoundingCurvesPosition: (position) => {
    set(({ project }) => {
      if (!project.boundingCurves) {
        throw new Error(`Project has no bounding curves`)
      }

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

  updateBoundingCurvesNodePosition: curry((nodeId, newPosition) => {
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
  // Other Config
  // ---------------------------------------------------------------------------

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

  linkControlPoints: curry((cornerNodeId, isLinked) => {
    console.log(`@@SET`, isLinked)
    set((state) => {
      const { project } = state
      const boundsApi = getBoundingCurvesApi(
        project.boundingCurves,
        project.config
      )

      return pipe(
        modifyPath(
          [`project`, `boundingCurves`],
          when(
            () => isLinked,
            () => boundsApi.expandControlPoints(cornerNodeId)
          )
        ),
        assocPath([`project`, `config`, `bounds`, `isLinked`], isLinked),
        assocPath(
          [`project`, `config`, `bounds`, `corners`, cornerNodeId, `isLinked`],
          isLinked
        )
      )(state)
    })
  }),

  mirrorControlPoints: (cornerNodeId) => (isMirrored) => {
    set(
      pipe(
        assocPath([`project`, `config`, `bounds`, `isMirrored`], isMirrored),
        assocPath(
          [
            `project`,
            `config`,
            `bounds`,
            `corners`,
            cornerNodeId,
            `isMirrored`,
          ],
          isMirrored
        )
      )
    )
  },

  // ---------------------------------------------------------------------------
  // Config
  // ---------------------------------------------------------------------------

  setConfigValue: curry((pathToValue, value) => {
    const fullPathToValue = [`project`, `config`, ...pathToValue]
    set(
      updateIfItemExistsOrThrow(
        `Config item '${joinWithPeriod(pathToValue)}' does not exist`,
        fullPathToValue,
        value
      )
    )
  }),

  // ---------------------------------------------------------------------------
  // Grid defintion
  // ---------------------------------------------------------------------------

  setGridDefinitionValue: curry((pathToValue, value) => {
    const fullPathToValue = [`project`, `gridDefinition`, ...pathToValue]

    const isStepUpdate =
      last(pathToValue) === `columns` || last(pathToValue) === `rows`

    set((state) => {
      return pipe(
        updateIfItemExistsOrThrow(
          `Grid definition item '${joinWithPeriod(pathToValue)}' does not exist`,
          fullPathToValue,
          value
        ),

        // If the number of rows or columns is updated, we need to ensure that
        // the gridSquare x and y are clamped to the new number of rows or
        // columns.
        when(() => isStepUpdate, updateGridSquareIfStepUpdate)
      )(state)
    })
  }),
})

export default createProjectSlice
