import { isInt } from '../../src/utils/types'
import getCanvasApi from './utils/getCanvasApi'
import { clampNumberBetween } from './utils/math'
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
