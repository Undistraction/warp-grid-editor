import getCanvasApi from './src/getCanvasApi'
import getCoonsPatch from './src/getCoonsPatch'
import { addRandomControlPointsToCurves, getRandomBounds } from './src/random'
import { getBoundingCurves } from './src/utils'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_MIN_DISTANCE_FROM_POINT = 60
const SHAPE_MIN_DISTANCE_FROM_EDGE = 100
const COLUMN_COUNT = 8
const ROW_COUNT = 8

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

  const coonsPatch = getCoonsPatch(boundingCurvesWithControlPoints, {
    width: COLUMN_COUNT,
    height: ROW_COUNT,
  })

  canvasApi.drawCoonsPatch(coonsPatch)
}
