import React from 'react'
import getCoonsPatch from '../../../src/getCoonsPatch'
import { getBoundingCurvesFromBounds } from '../../../src/utils'
import { CORNER_IDS } from '../const'
import getCanvasApi from '../utils/getCanvasApi'
import {
  addRandomControlPointsToCurves,
  getRandomBounds,
  getRandomGridSquareCoordicates,
} from '../utils/random'
import Canvas from './Canvas'
import CornerNodes from './Canvas/CornerNodes'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_MIN_DISTANCE_FROM_POINT = 60
const SHAPE_MIN_DISTANCE_FROM_EDGE = 100
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getRandomBoundingCurves = (canvas) => {
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

const highlightGridSquare = (canvas, coonsPatch) => {
  const canvasContext = canvas.getContext('2d')
  const canvasApi = getCanvasApi(canvasContext)

  // Grid square
  const { x, y } = getRandomGridSquareCoordicates(
    coonsPatch.columns.length,
    coonsPatch.rows.length
  )

  const gridSquareBounds = coonsPatch.getGridSquareBounds(x, y)
  canvasApi.drawGridSquareBounds(gridSquareBounds)
}

const createCoonsPatch = (canvas, boundingCurves, grid) => {
  // const grid = {
  //   columns: COLUMN_COUNT,
  //   rows: ROW_COUNT,
  //   // columns: [1, 0.2, 1, 0.2, 1, 0.2, 1],
  //   // rows: [1, 0.2, 1, 0.2, 1, 0.2, 1],
  // }

  // Coons patch
  return getCoonsPatch(boundingCurves, grid)
}

const updateBoundingCurves = (point, id, boundingCurves) => {
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

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [boundingCurves, setBoundingCurves] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const columnsTotalRef = React.useRef(null)
  const rowsTotalRef = React.useRef(null)

  React.useEffect(() => {
    if (boundingCurves) {
      const coonsPatch = createCoonsPatch(canvas, boundingCurves, {
        columns: parseInt(columnsTotalRef.current.value),
        rows: parseInt(rowsTotalRef.current.value),
      })
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurves, canvas])

  const handleStopDrag = (event, dragElement, id) => {
    const newPoint = {
      x: dragElement.x,
      y: dragElement.y,
    }

    const newBoundingCurves = updateBoundingCurves(newPoint, id, boundingCurves)
    setBoundingCurves(newBoundingCurves)
  }

  const handleColumnTotalUpdate = () => {
    const coonsPatch = createCoonsPatch(canvas, boundingCurves, {
      columns: parseInt(columnsTotalRef.current.value),
      rows: parseInt(rowsTotalRef.current.value),
    })
    setCoonsPatch(coonsPatch)
  }

  const handleRowTotalUpdate = () => {
    const coonsPatch = createCoonsPatch(canvas, boundingCurves, {
      columns: parseInt(columnsTotalRef.current.value),
      rows: parseInt(rowsTotalRef.current.value),
    })
    setCoonsPatch(coonsPatch)
  }

  const handleSelectGridsquare = () => {
    //highlightGridSquare(canvas, coonsPatch)
  }

  return (
    <div className="w-[800px] relative h-[400px] flex flex-row space-x-5">
      <div
        className="relative"
        id="patch-view"
      >
        <Canvas
          setCanvas={setCanvas}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          coonsPatch={coonsPatch}
        />
        {boundingCurves && (
          <CornerNodes
            boundingCurves={boundingCurves}
            onStopDrag={handleStopDrag}
          />
        )}
      </div>
      <div className="flex flex-col space-y-3 divide-y-2">
        <button
          className="bg-black text-white rounded-md p-3"
          onClick={() => {
            const boundingCurves = getRandomBoundingCurves(canvas)
            setBoundingCurves(boundingCurves)
          }}
        >
          Randomise
        </button>
        <div className="flex flex-col space-y-2 pt-3">
          <div className="flex flex-row space-x-1">
            <select
              name="columns"
              onChange={handleColumnTotalUpdate}
              ref={columnsTotalRef}
              defaultValue={3}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <div>Columns</div>
          </div>
          <div className="flex flex-row space-x-1 ">
            <select
              name="rows"
              onChange={handleRowTotalUpdate}
              ref={rowsTotalRef}
              defaultValue={3}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <div>Rows</div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 pt-3">
          <div className="flex flex-row space-x-1">
            <select
              name="gridSquareX"
              onChange={handleSelectGridsquare}
              ref={columnsTotalRef}
              defaultValue={3}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <div>Grid square x</div>
          </div>
          <div className="flex flex-row space-x-1">
            <select
              name="gridSquareY"
              onChange={handleSelectGridsquare}
              ref={rowsTotalRef}
              defaultValue={3}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <div>Grid square y</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
