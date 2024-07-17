import BezierEasing from 'bezier-easing'
import { INTERPOLATION_STRATEGY } from './const'
import {
  interpolatePointOnCurveEvenlySpaced,
  interpolatePointOnCurveLinear,
} from './utils/interpolate'
import {
  getCurvesOnSurfaceLeftToRight,
  getCurvesOnSurfaceTopToBottom,
  getGridIntersections,
} from './utils/surface'
import { isArray, isInt, isNil } from './utils/types'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

// See https://gre.github.io/bezier-easing-editor/example/
const easeX = BezierEasing(0, 0, 1, 1)
const easeY = BezierEasing(0, 0, 1, 1)

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const buildStepSpacing = (v) => {
  const spacing = []
  for (let idx = 0; idx < v; idx++) {
    spacing.push(1)
  }
  return spacing
}

const validateGrid = (grid) => {
  if (isNil(grid)) {
    throw new Error('You must supply a grid')
  }

  if (isNil(grid.columns)) {
    throw new Error('You must supply grid.columns(Array or Int)')
  }

  if (!isArray(grid.columns) && !isInt(grid.columns)) {
    throw new Error('grid.columns must be an Array of Ints or Int')
  }

  if (isNil(grid.rows)) {
    throw new Error('You must supply grid.rows(Array or Int)')
  }

  if (!isArray(grid.rows) && !isInt(grid.rows)) {
    throw new Error('grid.rows must be an Array of Ints or Int')
  }
}

const validateGetSquareArguments = (x, y, columns, rows) => {
  if (x >= columns || y >= rows) {
    throw new Error(
      `Grid is '${columns}' x '${rows}' but you passed x:'${x}' and y:'${y}'`
    )
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getCoonsPatch = (boundingCurves, grid) => {
  validateGrid(grid)

  // Columns can be either an int, or an array containing ints, each
  // representing the width of that column. If the total widths are different to
  // the width of the shape described by the bounding curves, they will be
  // mapped to the the width of the shape, acting as ratios instead of absolute
  // widths. If the supplied value is an int, we create an array with a length
  // of the int, with a uniform value for each item.
  const columns = isArray(grid.columns)
    ? grid.columns
    : buildStepSpacing(grid.columns)

  // Rows can be either an int, or an array containing ints, each representing
  // the height of that column. If the total heights are different to the height
  // of the shape described by the bounding curves, they will be mapped to the
  // the height of the shape, acting as ratios instead of absolute heights. If
  // the supplied value is an int, we create an array with a length of the int,
  // with a uniform value for each item.
  const rows = isArray(grid.rows) ? grid.rows : buildStepSpacing(grid.rows)

  const interpolatePointOnCurve =
    grid.interpolationStrategy === INTERPOLATION_STRATEGY.LINEAR
      ? interpolatePointOnCurveLinear
      : interpolatePointOnCurveEvenlySpaced

  console.log('>>>', grid.interpolationStrategy)

  const curvesFromLeftToRight = getCurvesOnSurfaceLeftToRight(
    boundingCurves,
    columns,
    rows,
    interpolatePointOnCurve
  )

  const curvesFromTopToBottom = getCurvesOnSurfaceTopToBottom(
    boundingCurves,
    columns,
    rows,
    interpolatePointOnCurve
  )

  const intersections = getGridIntersections(
    boundingCurves,
    columns,
    rows,
    interpolatePointOnCurve
  )

  // Get four curves that describe the bounds of the grid-sqare with the
  // supplied grid coordinates
  const getGridSquareBounds = (x, y) => {
    validateGetSquareArguments(x, y, columns, rows)

    return {
      top: curvesFromLeftToRight[y][x],
      bottom: curvesFromLeftToRight[y + 1][x],
      left: curvesFromTopToBottom[x][y],
      right: curvesFromTopToBottom[x + 1][y],
    }
  }

  return {
    boundingCurves,
    getGridSquareBounds,
    columns,
    intersections,
    rows,
    curvesFromLeftToRight,
    curvesFromTopToBottom,
  }
}

export default getCoonsPatch
