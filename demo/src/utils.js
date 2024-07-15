import { getBoundingCurvesFromBounds, isInt } from '../../src/utils'
import { CORNER_IDS } from './const'
import getCanvasApi from './utils/getCanvasApi'
import { addRandomControlPointsToCurves, getRandomBounds } from './utils/random'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_MIN_DISTANCE_FROM_POINT = 60
const SHAPE_MIN_DISTANCE_FROM_EDGE = 100

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getRandomBoundingCurves = (canvas) => {
  const canvasContext = canvas.getContext('2d')
  const canvasApi = getCanvasApi(canvasContext)
  canvasApi.clearCanvas(canvas)

  const bounds = getRandomBounds(
    canvas.width,
    canvas.height,
    SHAPE_MIN_DISTANCE_FROM_EDGE
  )

  const boundingCurves = getBoundingCurvesFromBounds(bounds)

  const boundingCurvesWithControlPoints = addRandomControlPointsToCurves(
    boundingCurves,
    CONTROL_POINT_MIN_DISTANCE_FROM_POINT
  )

  return boundingCurvesWithControlPoints
}

export const updateBoundingCurves = (point, id, boundingCurves) => {
  if (id === CORNER_IDS.TOP_LEFT) {
    boundingCurves.top.startPoint = point
    boundingCurves.left.startPoint = point
  }

  if (id === CORNER_IDS.TOP_RIGHT) {
    boundingCurves.top.endPoint = point
    boundingCurves.right.startPoint = point
  }

  if (id === CORNER_IDS.BOTTOM_LEFT) {
    boundingCurves.bottom.startPoint = point
    boundingCurves.left.endPoint = point
  }

  if (id === CORNER_IDS.BOTTOM_RIGHT) {
    boundingCurves.bottom.endPoint = point
    boundingCurves.right.endPoint = point
  }

  // Create a new object to trigger useEffect
  return { ...boundingCurves }
}

export const clampNumberBetween = (min, max, value) => {
  return Math.min(Math.max(value, min), max)
}

export const clampGridSquareToGridDimensions = (
  { x, y },
  { columns, rows }
) => {
  const columnsTotal = isInt(columns) ? columns : columns.length
  const rowsTotal = isInt(rows) ? rows : rows.length

  const gridSquare = {}

  if (isInt(x)) {
    gridSquare.x = clampNumberBetween(0, columnsTotal - 1, x)
  }

  if (isInt(y)) {
    gridSquare.y = clampNumberBetween(0, rowsTotal - 1, y)
  }

  return gridSquare
}
