import React from 'react'
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
  // columns: [1, 0.2, 1, 0.2, 1, 0.2, 1],
  // rows: [1, 0.2, 1, 0.2, 1, 0.2, 1],
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [boundingCurves, setBoundingCurves] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const [grid, setGrid] = React.useState(GRID_DEFAULT)
  const [gridSquare, setGridSquare] = React.useState(null)

  console.log('>>>', gridSquare)

  React.useEffect(() => {
    if (boundingCurves) {
      const coonsPatch = getCoonsPatch(boundingCurves, grid)
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurves, canvas, grid, gridSquare])

  const handleStopDrag = (event, dragElement, id) => {
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
          gridSquare={gridSquareClamped}
        />
        {boundingCurves && (
          <CornerNodes
            boundingCurves={boundingCurves}
            onStopDrag={handleStopDrag}
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
      />
    </div>
  )
}

export default App
