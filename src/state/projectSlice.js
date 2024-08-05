import { assocPath, mapObjIndexed, modifyPath, pipe, when } from 'ramda'
import { CORNER_POINTS } from '../const'
import { getBoundsApi } from '../utils/boundsApi'

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
    const boundsApi = getBoundsApi(acc)
    return boundsApi.expandControlPoints(id)
  }, boundingCurves)

const zeroControlPoints = (boundingCurves) =>
  CORNER_POINTS.reduce((acc, name) => {
    const boundsApi = getBoundsApi(acc)
    return boundsApi.zeroControlPoints(name)
  }, boundingCurves)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const createProjectSlice = (set) => ({
  project: null,
  // ---------------------------------------------------------------------------
  // Root setter
  // ---------------------------------------------------------------------------
  setProject: (project) =>
    set(() => ({
      project,
    })),
  // ---------------------------------------------------------------------------
  // Global config
  // ---------------------------------------------------------------------------
  zeroControlPointsGlobal: () => {
    set(modifyPath([`project`, `boundingCurves`], zeroControlPoints))
  },
  mirrorControlPointsGlobal: (isMirrored) => {
    set(
      pipe(
        assocPath([`project`, `config`, `global`, `isMirrored`], isMirrored),
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
        assocPath([`project`, `config`, `global`, `isLinked`], isLinked),
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
  // Point-specific config
  // ---------------------------------------------------------------------------
  updateBounds: (nodeId) => (newPosition) => {
    set(({ project }) => {
      const boundsApi = getBoundsApi(project.boundingCurves, project.config)
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
  },
})

export default createProjectSlice
