import React from 'react'
import getCoonsPatch from '../../../src/getCoonsPatch'
import { getBoundingCurves } from '../../../src/utils'
import getCanvasApi from '../utils/getCanvasApi'
import {
  addRandomControlPointsToCurves,
  getRandomBounds,
  getRandomGridSquareCoordicates,
} from '../utils/random'
import Canvas from './Canvas'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_MIN_DISTANCE_FROM_POINT = 60
const SHAPE_MIN_DISTANCE_FROM_EDGE = 100
const COLUMN_COUNT = 7
const ROW_COUNT = 7

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const generateRandomPatch = (canvas) => {
  const canvasContext = canvas.getContext('2d')
  console.log('>>>>', canvasContext)
  const canvasApi = getCanvasApi(canvasContext)
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

  // Coons patch
  const coonsPatch = getCoonsPatch(boundingCurvesWithControlPoints, grid)
  canvasApi.drawCoonsPatch(coonsPatch)

  // Grid square
  const { x, y } = getRandomGridSquareCoordicates(
    coonsPatch.columns.length,
    coonsPatch.rows.length
  )

  const gridSquareBounds = coonsPatch.getGridSquareBounds(x, y)
  canvasApi.drawGridSquareBounds(gridSquareBounds)
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)

  console.log('CON', canvas)

  return (
    <Canvas
      setCanvas={setCanvas}
      onClick={() => generateRandomPatch(canvas)}
    />
  )
}

export default App
