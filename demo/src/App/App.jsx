import React from 'react'
import { INTERPOLATION_STRATEGY } from '../../../src/const'
import getCoonsPatch from '../../../src/getCoonsPatch'
import useObserveClientSize from '../hooks/useObserveClientSize'
import {
  clampGridSquareToGridDimensions,
  getRandomBoundingCurves,
} from '../utils'
import localStorageApi from '../utils/localStorageApi'
import Canvas from './Canvas'
import ControlNodes from './Canvas/ControlNodes'
import Sidebar from './Sidebar'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const GRID_DEFAULT = {
  columns: 25,
  rows: 25,
  interpolationStrategy: INTERPOLATION_STRATEGY.EVEN,
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

  console.log('@@', boundingCurves)

  useObserveClientSize(displayRef, setCanvasSize, {
    // left + right border widths
    width: -2,
    // top + bottom border widths
    height: -2,
  })

  React.useEffect(() => {
    if (boundingCurves) {
      const coonsPatch = getCoonsPatch(boundingCurves, grid)
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurves, canvas, grid, canvasSize])

  const gridSquareClamped = React.useMemo(
    () =>
      surface.gridSquare
        ? clampGridSquareToGridDimensions(surface.gridSquare, grid)
        : surface.gridSquare,
    [surface, grid]
  )

  return (
    <div className="relative flex h-full w-screen flex-row space-x-5 p-5">
      <div
        className="relative h-full flex-grow overflow-hidden"
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
          grid={grid}
        />
        {boundingCurves && (
          <ControlNodes
            boundingCurves={boundingCurves}
            setBoundingCurves={setBoundingCurves}
          />
        )}
      </div>
      <div className="-my-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
        <Sidebar
          grid={grid}
          canvas={canvas}
          gridSquare={gridSquareClamped}
          getRandomBoundingCurves={getRandomBoundingCurves}
          setBoundingCurves={setBoundingCurves}
          boundingCurves={boundingCurves}
          setGrid={setGrid}
          onSave={(name) => {
            localStorageApi.save(name, { grid, boundingCurves })
            setSavedBounds({ ...localStorage })
          }}
          onLoad={(name) => {
            const result = localStorageApi.load(name)
            setGrid(result.grid)
            setBoundingCurves(result.boundingCurves)
          }}
          savedBounds={savedBounds}
          surface={surface}
          setSurface={setSurface}
        />
      </div>
    </div>
  )
}

export default App
