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

const GRID_DEFAULT = {
  columns: 25,
  rows: 25,
  interpolationStrategy: INTERPOLATION_STRATEGY.LINEAR,
  highAccuracy: false,
  // columns: [1, 0.2, 1, 0.2, 1, 0.2, 1],
  // rows: [1, 0.2, 1, 0.2, 1, 0.2, 1],
}
const SURFACE_DEFAULT = { x: 0, y: 0, gridSquare: {} }

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [boundingCurves, setBoundingCurves] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const [grid, setGrid] = React.useState(GRID_DEFAULT)
  const [surface, setSurface] = React.useState(SURFACE_DEFAULT)
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })

  const [savedBounds, setSavedBounds] = React.useState({ ...localStorage })

  const displayRef = React.useRef(null)

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

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      const BORDER_WIDTH = 1
      const TOTAL_BORDER_WIDTH = BORDER_WIDTH * 2
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize

      const width = event[0].contentBoxSize[0].inlineSize - TOTAL_BORDER_WIDTH
      const height = event[0].contentBoxSize[0].blockSize - TOTAL_BORDER_WIDTH
      setCanvasSize({ width, height })
    })

    if (displayRef) {
      resizeObserver.observe(displayRef.current)
    }
  }, [displayRef.current, displayRef.current])

  return (
    <div className="relative flex max-h-full w-screen flex-row space-x-5 p-5">
      <div
        className="relative max-h-full flex-grow overflow-hidden"
        id="patch-view"
        ref={displayRef}
      >
        <Canvas
          setCanvas={setCanvas}
          width={canvasSize.width}
          height={canvasSize.height}
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
      <div className="-mb-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
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
    </div>
  )
}

export default App
