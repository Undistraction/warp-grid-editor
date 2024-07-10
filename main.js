import getCanvasApi from './src/getCanvasApi'
import getCoonsPatch from './src/getCoonsPatch'
import { addRandomControlPointsToCurves, getRandomBounds } from './src/random'
import { getBoundingCurves } from './src/utils'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_MIN_DISTANCE_FROM_POINT = 60
const SHAPE_MIN_DISTANCE_FROM_EDGE = 100
const COLUMN_COUNT = 7
const ROW_COUNT = 7

// -----------------------------------------------------------------------
// UI
// -----------------------------------------------------------------------

const canvas = document.getElementById('shapeCanvas')
const context = canvas.getContext('2d')
const canvasApi = getCanvasApi(context)

document.addEventListener('DOMContentLoaded', () => {
  canvas.addEventListener('click', render)
})

// -----------------------------------------------------------------------
// Entry point
// -----------------------------------------------------------------------

function render() {
  canvasApi.clearCanvas(canvas)

  const bounds = getRandomBounds(
    canvas.width,
    canvas.height,
    SHAPE_MIN_DISTANCE_FROM_EDGE
  )

  const boundingCurves = getBoundingCurves(bounds)

  const boundingCurvesWithControlPoints = addRandomControlPointsToCurves(
    boundingCurves,
    CONTROL_POINT_MIN_DISTANCE_FROM_POINT
  )

  const grid = {
    columns: COLUMN_COUNT,
    rows: ROW_COUNT,
    // columns: [1, 0.2, 1, 0.2, 1, 0.2, 1],
    // rows: [1, 0.2, 1, 0.2, 1, 0.2, 1],
  }

  const coonsPatch = getCoonsPatch(boundingCurvesWithControlPoints, grid)

  canvasApi.drawCoonsPatch(coonsPatch)
}
