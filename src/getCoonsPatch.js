import BezierEasing from 'bezier-easing'
import {
  getCurvesOnSurfaceLeftToRight,
  getCurvesOnSurfaceTopToBottom,
  getGridIntersections,
  isArray,
  isInt,
  isNil,
} from './utils'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

// See https://gre.github.io/bezier-easing-editor/example/
const easeX = BezierEasing(0, 0, 1, 1)
const easeY = BezierEasing(0, 0, 1, 1)

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const isUndefined = (value) => typeof value === 'undefined'

const buildSpacing = (v) => {
  const spacing = []
  for (let idx = 0; idx < v; idx++) {
    spacing.push(1)
  }
  return spacing
}

const validateGrid = (grid) => {
  if (!grid) {
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

const validateCurveIntersections = (curveIntersections) => {
  curveIntersections.map((intersections) => {
    if (intersections.length === 0) {
      throw new Error('Missing intesection')
    }
  })
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
    : buildSpacing(grid.columns)

  // Rows can be either an int, or an array containing ints, each representing
  // the height of that column. If the total heights are different to the height
  // of the shape described by the bounding curves, they will be mapped to the
  // the height of the shape, acting as ratios instead of absolute heights. If
  // the supplied value is an int, we create an array with a length of the int,
  // with a uniform value for each item.
  const rows = isArray(grid.rows) ? grid.rows : buildSpacing(grid.rows)

  const curvesFromLeftToRight = getCurvesOnSurfaceLeftToRight(
    boundingCurves,
    columns,
    rows
  )

  const curvesFromTopToBottom = getCurvesOnSurfaceTopToBottom(
    boundingCurves,
    columns,
    rows
  )

  const intersections = getGridIntersections(boundingCurves, columns, rows)

  // Get four curves that describe the bounds of the grid-sqare with the
  // supplied grid coordicates
  const getGridSquareBounds = (x, y) => {
    validateGetSquareArguments(x, y, columns, rows)

    // // Find the curves that run along the grid square bounds
    const top = curvesFromLeftToRight[y][x]
    const bottom = curvesFromLeftToRight[y + 1][x]
    const left = curvesFromTopToBottom[x][y]
    const right = curvesFromTopToBottom[x + 1][y]

    return {
      top,
      bottom,
      left,
      right,
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
