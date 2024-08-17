import {
  assocPath,
  curry,
  last,
  mapObjIndexed,
  modifyPath,
  pipe,
  when,
} from 'ramda'

import {
  expandAllBoundingCurvesControlPoints,
  expandBoundingCurvesCornerControlPoints,
  moveBoundingCurves,
  toggleZeroExpandBoundingCurvesControlPoints,
  updateBoundingCurvesNodePosition,
  zeroAllBoundingCurvesControlPoints,
  zeroBoundingCurvesCornerControlPoints,
} from '../../utils/boundingCurves'
import { clampGridSquareToGridDimensions } from '../../utils/grid'
import { updateIfItemExistsOrThrow } from '../../utils/slices'
import { joinWithPeriod } from '../../utils/string'
import { PROJECT_DEFAULT } from '../defaults'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const updateAllCornerPoints = (name, value) => (corners) => ({
  ...mapObjIndexed(
    (corner) => ({
      ...corner,
      [name]: value,
    }),
    corners
  ),
})

const updateGridSquareIfStepUpdate = (state) =>
  modifyPath(
    [`project`, `config`, `gridSquare`, `value`],
    clampGridSquareToGridDimensions(state.project.gridDefinition)
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
    set(modifyPath([`project`, `boundingCurves`], moveBoundingCurves(position)))
  },

  updateBoundingCurvesNodePosition: curry((nodeId, newPosition) => {
    set(({ project }) => {
      const updatedBoundingCurves = updateBoundingCurvesNodePosition(
        project.config,
        nodeId,
        newPosition,
        project.boundingCurves
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
    set(
      modifyPath(
        [`project`, `boundingCurves`],
        zeroAllBoundingCurvesControlPoints
      )
    )
  },

  mirrorControlPointsGlobal: (isMirrored) => {
    set(
      pipe(
        assocPath([`project`, `config`, `bounds`, `isMirrored`], isMirrored),
        modifyPath(
          [`project`, `config`, `bounds`, `corners`],
          updateAllCornerPoints(`isMirrored`, isMirrored)
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
          updateAllCornerPoints(`isLinked`, isLinked)
        ),
        modifyPath(
          [`project`, `boundingCurves`],
          when(() => isLinked, expandAllBoundingCurvesControlPoints)
        )
      )
    )
  },

  // ---------------------------------------------------------------------------
  // Other Config
  // ---------------------------------------------------------------------------

  zeroControlPoints: (cornerNodeId) => () => {
    set(
      modifyPath(
        [`project`, `boundingCurves`],
        zeroBoundingCurvesCornerControlPoints(cornerNodeId)
      )
    )
  },

  expandControlPoints: (cornerNodeId) => () => {
    set(
      modifyPath(
        [`project`, `boundingCurves`],
        expandBoundingCurvesCornerControlPoints(cornerNodeId)
      )
    )
  },

  toggleZeroExpandControlPoints: (cornerNodeId) => () => {
    set(
      modifyPath(
        [`project`, `boundingCurves`],
        toggleZeroExpandBoundingCurvesControlPoints(cornerNodeId)
      )
    )
  },

  linkControlPoints: curry((cornerNodeId, isLinked) => {
    set(
      pipe(
        modifyPath(
          [`project`, `boundingCurves`],
          when(
            () => isLinked,
            expandBoundingCurvesCornerControlPoints(cornerNodeId)
          )
        ),
        assocPath([`project`, `config`, `bounds`, `isLinked`], isLinked),
        assocPath(
          [`project`, `config`, `bounds`, `corners`, cornerNodeId, `isLinked`],
          isLinked
        )
      )
    )
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

  setProjectConfigValue: curry((pathToValue, value) => {
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

    set(
      pipe(
        updateIfItemExistsOrThrow(
          `Grid definition item '${joinWithPeriod(pathToValue)}' does not exist`,
          fullPathToValue,
          value
        ),

        // If the number of rows or columns is updated, we need to ensure that
        // the gridSquare x and y are clamped to the new number of rows or
        // columns.
        when(() => isStepUpdate, updateGridSquareIfStepUpdate)
      )
    )
  }),
})

export default createProjectSlice
