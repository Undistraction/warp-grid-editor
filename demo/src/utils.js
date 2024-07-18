import { isInt } from '../../src/utils/types'
import { BOUNDS_POINT_IDS } from './const'
import getCanvasApi from './utils/getCanvasApi'
import { addRandomControlPointsToCurves, getRandomBounds } from './utils/random'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_MIN_DISTANCE_FROM_POINT = 60
const SHAPE_MIN_DISTANCE_FROM_EDGE = 100

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getCornerPoints = (x, y, width, height) => {
  const rightBounds = x + width
  const bottomBounds = y + height

  return {
    topLeft: { x, y },
    topRight: { x: rightBounds, y },
    bottomRight: { x: rightBounds, y: bottomBounds },
    bottomLeft: { x, y: bottomBounds },
  }
}

const getBoundingCurvesFromBounds = ({ x, y, width, height }) => {
  const corners = getCornerPoints(x, y, width, height)

  const topLeftOffset = Math.random() * 500 - 250

  corners.topLeft.x = corners.topLeft.x + topLeftOffset

  const boundingCurves = {
    top: {
      startPoint: corners.topLeft,
      endPoint: corners.topRight,
    },
    right: {
      startPoint: corners.topRight,
      endPoint: corners.bottomRight,
    },
    bottom: {
      startPoint: corners.bottomLeft,
      endPoint: corners.bottomRight,
    },
    left: {
      startPoint: corners.topLeft,
      endPoint: corners.bottomLeft,
    },
  }

  return boundingCurves
}

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

export const updateBoundingCurves = (
  id,
  boundingCurves,
  point,
  deltas,
  startingPositions
) => {
  // ---------------------------------------------------------------------------
  // Corner points
  // ---------------------------------------------------------------------------

  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    boundingCurves.top.startPoint = point
    boundingCurves.left.startPoint = point

    const controlPoint1StartPosition =
      startingPositions[BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1]
    const controlPoint2StartPosition =
      startingPositions[BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2]

    boundingCurves.top.controlPoint1.x = controlPoint1StartPosition.x + deltas.x
    boundingCurves.top.controlPoint1.y = controlPoint1StartPosition.y + deltas.y
    boundingCurves.left.controlPoint1.x =
      controlPoint2StartPosition.x + deltas.x
    boundingCurves.left.controlPoint1.y =
      controlPoint2StartPosition.y + deltas.y
  }

  if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
    boundingCurves.top.endPoint = point
    boundingCurves.right.startPoint = point

    const controlPoint1StartPosition =
      startingPositions[BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1]
    const controlPoint2StartPosition =
      startingPositions[BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2]

    boundingCurves.top.controlPoint2.x = controlPoint1StartPosition.x + deltas.x
    boundingCurves.top.controlPoint2.y = controlPoint1StartPosition.y + deltas.y
    boundingCurves.right.controlPoint1.x =
      controlPoint2StartPosition.x + deltas.x
    boundingCurves.right.controlPoint1.y =
      controlPoint2StartPosition.y + deltas.y
  }

  if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
    boundingCurves.bottom.startPoint = point
    boundingCurves.left.endPoint = point

    const controlPoint1StartPosition =
      startingPositions[BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1]
    const controlPoint2StartPosition =
      startingPositions[BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2]

    boundingCurves.bottom.controlPoint1.x =
      controlPoint1StartPosition.x + deltas.x
    boundingCurves.bottom.controlPoint1.y =
      controlPoint1StartPosition.y + deltas.y
    boundingCurves.left.controlPoint2.x =
      controlPoint2StartPosition.x + deltas.x
    boundingCurves.left.controlPoint2.y =
      controlPoint2StartPosition.y + deltas.y
  }

  if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
    boundingCurves.bottom.endPoint = point
    boundingCurves.right.endPoint = point

    const controlPoint1StartPosition =
      startingPositions[BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1]
    const controlPoint2StartPosition =
      startingPositions[BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2]

    boundingCurves.bottom.controlPoint2.x =
      controlPoint1StartPosition.x + deltas.x
    boundingCurves.bottom.controlPoint2.y =
      controlPoint1StartPosition.y + deltas.y
    boundingCurves.right.controlPoint2.x =
      controlPoint2StartPosition.x + deltas.x
    boundingCurves.right.controlPoint2.y =
      controlPoint2StartPosition.y + deltas.y
  }

  // ---------------------------------------------------------------------------
  // Control points
  // ---------------------------------------------------------------------------

  if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1) {
    boundingCurves.top.controlPoint1 = point
  }

  if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2) {
    boundingCurves.left.controlPoint1 = point
  }

  if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1) {
    boundingCurves.top.controlPoint2 = point
  }

  if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2) {
    boundingCurves.right.controlPoint1 = point
  }

  if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1) {
    boundingCurves.bottom.controlPoint1 = point
  }

  if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2) {
    boundingCurves.left.controlPoint2 = point
  }

  if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1) {
    boundingCurves.bottom.controlPoint2 = point
  }

  if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2) {
    boundingCurves.right.controlPoint2 = point
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

  const xInt = parseInt(x)
  const yInt = parseInt(y)

  if (isInt(xInt)) {
    gridSquare.x = clampNumberBetween(0, columnsTotal - 1, x)
  }

  if (isInt(yInt)) {
    gridSquare.y = clampNumberBetween(0, rowsTotal - 1, y)
  }

  return gridSquare
}
