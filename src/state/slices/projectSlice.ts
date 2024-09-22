import {
  assocPath,
  curry,
  last,
  mapObjIndexed,
  modifyPath,
  pipe,
  when,
} from 'ramda'
import { StateCreator } from 'zustand'

import type {
  AppSlice,
  BoundingCurves,
  CornersConfig,
  Point,
  Project,
  ProjectSlice,
} from '../../types'
import {
  expandAllBoundingCurvesControlPoints,
  expandBoundingCurvesCornerControlPoints,
  moveBoundingCurves,
  moveBoundingCurvesNodePosition,
  toggleZeroExpandBoundingCurvesControlPoints,
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

const modifySlice =
  // These are diliberately loose as we don't know the type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pathToField: string[], f: (a: any) => any) => (projectSlice: ProjectSlice) =>
    modifyPath(pathToField, f, projectSlice) as ProjectSlice

const updateAllCornerPoints =
  (name: string, value: boolean) => (corners: CornersConfig) => ({
    ...mapObjIndexed(
      (corner) => ({
        ...corner,
        [name]: value,
      }),
      corners
    ),
  })

const updateGridSquareIfStepUpdate = (
  projectSlice: ProjectSlice
): ProjectSlice =>
  modifySlice(
    [`project`, `config`, `gridSquare`, `value`],
    clampGridSquareToGridDimensions(projectSlice.project.gridDefinition)
  )(projectSlice)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createProjectSlice: StateCreator<AppSlice, [], [], ProjectSlice> = (
  set
) => ({
  project: PROJECT_DEFAULT,
  // ---------------------------------------------------------------------------
  // Root setter
  // ---------------------------------------------------------------------------

  setProject: (project: Project) =>
    set(() => ({
      project,
    })),

  // ---------------------------------------------------------------------------
  // Meta
  // ---------------------------------------------------------------------------

  setName: (name: string) => {
    set(assocPath([`project`, `meta`, `name`], name))
  },

  setIsSaved: () => {
    set(assocPath([`project`, `meta`, `isSaved`], true))
  },

  // ---------------------------------------------------------------------------
  // Bounding Curves
  // ---------------------------------------------------------------------------

  setBoundingCurves: (boundingCurves: BoundingCurves) => {
    set(assocPath([`project`, `boundingCurves`], boundingCurves))
  },

  updateBoundingCurvesPosition: (position: Point) =>
    set(
      modifySlice([`project`, `boundingCurves`], moveBoundingCurves(position))
    ),

  updateBoundingCurvesNodePosition: curry((nodeId, newPosition) => {
    set((state: AppSlice): ProjectSlice => {
      const { project } = state

      if (!project.boundingCurves) {
        return state
      }

      return {
        project: {
          ...project,
          boundingCurves: moveBoundingCurvesNodePosition(
            project.config,
            nodeId,
            newPosition,
            project.boundingCurves
          ),
        },
      }
    })
  }),

  // ---------------------------------------------------------------------------
  // Global config
  // ---------------------------------------------------------------------------

  zeroControlPointsGlobal: () => {
    set(
      modifySlice(
        [`project`, `boundingCurves`],
        zeroAllBoundingCurvesControlPoints
      )
    )
  },

  mirrorControlPointsGlobal: (isMirrored: boolean) => {
    set(
      pipe(
        assocPath([`project`, `config`, `bounds`, `isMirrored`], isMirrored),
        modifySlice(
          [`project`, `config`, `bounds`, `corners`],
          updateAllCornerPoints(`isMirrored`, isMirrored)
        )
      )
    )
  },

  linkControlPointsGlobal: (isLinked: boolean) => {
    set(
      pipe(
        assocPath([`project`, `config`, `bounds`, `isLinked`], isLinked),
        modifySlice(
          [`project`, `config`, `bounds`, `corners`],
          updateAllCornerPoints(`isLinked`, isLinked)
        ),
        modifySlice(
          [`project`, `boundingCurves`],
          when(() => isLinked, expandAllBoundingCurvesControlPoints)
        )
      )
    )
  },

  // ---------------------------------------------------------------------------
  // Other Config
  // ---------------------------------------------------------------------------

  zeroControlPoints: (cornerNodeId: string) => () => {
    set(
      modifySlice(
        [`project`, `boundingCurves`],
        zeroBoundingCurvesCornerControlPoints(cornerNodeId)
      )
    )
  },

  expandControlPoints: (cornerNodeId: string) => () => {
    set(
      modifySlice(
        [`project`, `boundingCurves`],
        expandBoundingCurvesCornerControlPoints(cornerNodeId)
      )
    )
  },

  toggleZeroExpandControlPoints: (cornerNodeId: string) => () => {
    set(
      modifySlice(
        [`project`, `boundingCurves`],
        toggleZeroExpandBoundingCurvesControlPoints(cornerNodeId)
      )
    )
  },
  linkControlPoints: curry((cornerNodeId, isLinked) => {
    const modifyIfLinked = (boundingCurves: BoundingCurves) => {
      return isLinked
        ? expandBoundingCurvesCornerControlPoints(cornerNodeId, boundingCurves)
        : boundingCurves
    }

    return set(
      pipe(
        modifySlice([`project`, `boundingCurves`], modifyIfLinked),
        assocPath([`project`, `config`, `bounds`, `isLinked`], isLinked),
        assocPath(
          [`project`, `config`, `bounds`, `corners`, cornerNodeId, `isLinked`],
          isLinked
        )
      )
    )
  }),

  mirrorControlPoints: (cornerNodeId: string) => (isMirrored: boolean) => {
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

  setProjectConfigValue: curry((pathToValue: string[], value: unknown) => {
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

  setGridDefinitionValue: curry((pathToValue: string[], value: unknown) => {
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
