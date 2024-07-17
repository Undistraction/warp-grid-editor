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
const SURFACE_DEFAULT = { x: 0.0, y: 0.0, gridSquare: {} }

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
  const [surface, setSurface] = React.useState(SURFACE_DEFAULT)

  const [savedBounds, setSavedBounds] = React.useState({ ...localStorage })

  React.useEffect(() => {
    if (boundingCurves) {
      const coonsPatch = getCoonsPatch(boundingCurves, grid)
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurves, canvas, grid])

  const handleNodeDrag = (event, dragElement, id) => {
    const newLocation = {
      x: dragElement.x,
      y: dragElement.y,
    }

    const offset = {
      x: dragElement.deltaX,
      y: dragElement.deltaY,
    }

    const newBoundingCurves = updateBoundingCurves(
      newLocation,
      offset,
      id,
      boundingCurves
    )
    setBoundingCurves(newBoundingCurves)
  }

  const gridSquareClamped = surface.gridSquare
    ? clampGridSquareToGridDimensions(surface.gridSquare, grid)
    : surface.gridSquare

  const handleSave = (name) => {
    const value = JSON.stringify({
      boundingCurves,
      grid,
    })
    const key = `${name}-${new Date().toUTCString()}`
    localStorage.setItem(key, value)
    setSavedBounds({ ...localStorage })
  }

  const onLoad = (key) => {
    const value = localStorage[key]
    const { boundingCurves: newBoundingCurves, grid: newGrid } =
      JSON.parse(value)

    setGrid(newGrid)
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
          surface={surface}
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
        onSave={handleSave}
        onLoad={onLoad}
        savedBounds={savedBounds}
        surface={surface}
        setSurface={setSurface}
      />
    </div>
  )
}

export default App
