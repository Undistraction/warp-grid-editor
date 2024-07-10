import BezierEasing from 'bezier-easing'
import uniq from 'uniq'
import { getIntersectionsBetweenCurveSets, interpolatCurve } from './utils'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

// See https://gre.github.io/bezier-easing-editor/example/
const easeX = BezierEasing(0, 0, 1, 1)
const easeY = BezierEasing(0, 0, 1, 1)

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const isArray = Array.isArray
const isInt = Number.isInteger

export const isUndefined = (value) => typeof value === 'undefined'

const buildSpacing = (v) => {
  const spacing = []
  for (let idx = 0; idx <= v; idx++) {
    spacing.push(1)
  }
  return spacing
}

const validateGrid = (grid) => {
  if (!grid) {
    throw new Error('You must supply a grid')
  }

  if (!grid.columns) {
    throw new Error('You must supply grid.columns(Array or Int)')
  }

  if (!isArray(grid.columns) && !isInt(grid.columns)) {
    throw new Error('grid.columns must be an Array of Ints or Int')
  }

  if (!grid.rows) {
    throw new Error('You must supply grid.rows(Array or Int)')
  }

  if (!isArray(grid.rows) && !isInt(grid.rows)) {
    throw new Error('grid.rows must be an Array of Ints or Int')
  }
}

const getCurves = (steps, curvesPair1, curvesPair2, ease) => {
  let currentWidth = 0
  const stepsTotal = steps.length
  const curves = []
  const stepsWidthTotal = steps.reduce(addToTotal, 0)
  for (let column = 0; column <= stepsTotal; column++) {
    // Allow different grid spacings
    const ratio = currentWidth / stepsWidthTotal
    currentWidth = currentWidth + steps[column]

    // Allow easing
    const ratioXEased = ease(ratio)
    const curve = interpolatCurve(ratioXEased, curvesPair1, curvesPair2)

    curves.push(curve)
  }
  return curves
}

const addToTotal = (total, value) => total + value

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

  const curvesFromLeftToRight = getCurves(
    columns,
    { curve1: boundingCurves.top, curve2: boundingCurves.bottom },
    { curve3: boundingCurves.left, curve4: boundingCurves.right },
    easeX
  )

  const curvesFromTopToBottom = getCurves(
    rows,
    { curve1: boundingCurves.left, curve2: boundingCurves.right },
    { curve3: boundingCurves.top, curve4: boundingCurves.bottom },
    easeY
  )

  const intersections = getIntersectionsBetweenCurveSets(
    curvesFromLeftToRight,
    curvesFromTopToBottom
  )

  // Due to the nature of Bezier.js's calculations, it often ends up with
  // duplicate points so we need to deduplicate them
  const intersectionsDeduped = uniq(
    intersections,
    (p1, p2) => (p1.x === p2.x && p1.y === p2.y ? 0 : 1),
    true
  )

  return {
    intersections: intersectionsDeduped,
    curvesFromLeftToRight,
    curvesFromTopToBottom,
    boundingCurves,
  }
}

export default getCoonsPatch
