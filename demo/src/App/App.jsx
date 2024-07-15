import React from 'react'
import { INTERPOLATION_STRATEGY } from '../../../src/const'
import getCoonsPatch from '../../../src/getCoonsPatch'
import {
  clampGridSquareToGridDimensions,
  getRandomBoundingCurves,
  updateBoundingCurves,
} from '../utils'
import Canvas from './Canvas'
import CornerNodes from './Canvas/CornerNodes'
import Sidebar from './Sidebar'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400
const GRID_DEFAULT = {
  columns: 3,
  rows: 3,
  interpolationStrategy: INTERPOLATION_STRATEGY.LINEAR,
  // columns: [1, 0.2, 1, 0.2, 1, 0.2, 1],
  // rows: [1, 0.2, 1, 0.2, 1, 0.2, 1],
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [boundingCurves, setBoundingCurves] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const [grid, setGrid] = React.useState(GRID_DEFAULT)
  const [gridSquare, setGridSquare] = React.useState(null)

  const [savedBounds, setSavedBounds] = React.useState({ ...localStorage })

  React.useEffect(() => {
    if (boundingCurves) {
      const coonsPatch = getCoonsPatch(boundingCurves, grid)
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurves, canvas, grid, gridSquare])

  const handleNodeDrag = (event, dragElement, id) => {
    const newPoint = {
      x: dragElement.x,
      y: dragElement.y,
    }

    const newBoundingCurves = updateBoundingCurves(newPoint, id, boundingCurves)
    setBoundingCurves(newBoundingCurves)
  }

  const gridSquareClamped = gridSquare
    ? clampGridSquareToGridDimensions(gridSquare, grid)
    : gridSquare

  console.log('>>>>', gridSquare)

  const handleSave = (name) => {
    const boundCurveStringified = JSON.stringify(boundingCurves)
    const key = `${name}-${new Date().toUTCString()}`
    localStorage.setItem(key, boundCurveStringified)
    setSavedBounds({ ...localStorage })
  }

  const onLoad = (key) => {
    const boundingCurvesString = localStorage[key]
    const newBoundingCurves = JSON.parse(boundingCurvesString)
    setBoundingCurves(newBoundingCurves)
  }

  return (
    <div className="relative flex h-[400px] w-[800px] flex-row space-x-5">
      <div
        className="relative"
        id="patch-view"
      >
        <Canvas
          setCanvas={setCanvas}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          coonsPatch={coonsPatch}
          gridSquare={gridSquareClamped}
        />
        {boundingCurves && (
          <CornerNodes
            boundingCurves={boundingCurves}
            onDrag={handleNodeDrag}
          />
        )}
      </div>
      <Sidebar
        grid={grid}
        canvas={canvas}
        gridSquare={gridSquareClamped}
        getRandomBoundingCurves={getRandomBoundingCurves}
        setBoundingCurves={setBoundingCurves}
        setGrid={setGrid}
        setGridSquare={setGridSquare}
        onSave={handleSave}
        onLoad={onLoad}
        savedBounds={savedBounds}
      />
    </div>
  )
}

export default App
