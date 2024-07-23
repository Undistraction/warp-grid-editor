import React from 'react'
import { useDebounce } from 'use-debounce'
import getCoonsPatch from '../../../src/'
import { INTERPOLATION_STRATEGY_ID } from '../../../src/const'
import { BOUNDS_POINT_IDS, CORNER_POINTS } from '../const'
import useObserveClientSize from '../hooks/useObserveClientSize'
import {
  clampGridSquareToGridDimensions,
  getRandomBoundingCurves,
} from '../utils'
import { getBoundsApi } from '../utils/boundsApi'
import localStorageApi from '../utils/localStorageApi'
import Canvas from './Canvas'
import ControlNodes from './Canvas/ControlNodes'
import Shape from './Canvas/Shape'
import Sidebar from './Sidebar'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const GRID_DEFAULT = {
  columns: 25,
  rows: 25,
  // columns: [5, 1, 5, 4, 5, 1, 5, 1, 5],
  // rows: [5, 1, 5, 3, 5, 1, 10],
  interpolationStrategy: INTERPOLATION_STRATEGY_ID.EVEN,
}

const SURFACE_DEFAULT = { x: 0, y: 0, gridSquare: {} }

const CONFIG_DEFAULT = {
  global: {
    isLinked: true,
    isMirrored: false,
  },
  grid: {
    shouldUseComplexColumnsRows: false,
  },
  bounds: {
    [BOUNDS_POINT_IDS.TOP_LEFT]: { isLinked: true, isMirrored: false },
    [BOUNDS_POINT_IDS.TOP_RIGHT]: { isLinked: true, isMirrored: false },
    [BOUNDS_POINT_IDS.BOTTOM_LEFT]: { isLinked: true, isMirrored: false },
    [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: { isLinked: true, isMirrored: false },
  },
}

const BORDER_WIDTHS = 2

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const handleNodePositionChange =
  (boundingCurves, setBoundingCurves, config) => (nodeId) => (newPosition) => {
    const boundsApi = getBoundsApi(boundingCurves, config)
    const updatedBoundingCurves = boundsApi.updateNodePosition(
      nodeId,
      newPosition
    )
    setBoundingCurves(updatedBoundingCurves)
  }

const handleShapeDrag =
  (boundingCurves, setBoundingCurves, config) => (position) => {
    const boundsApi = getBoundsApi(boundingCurves, config)
    const newBoundingCurves = boundsApi.translateToPoint(position)
    setBoundingCurves(newBoundingCurves)
  }

const handleLinkControlPoints =
  (boundsApi, setBoundingCurves, config, setConfig) =>
  (cornerNodeId) =>
  (isLinked) => {
    console.log('LINK', cornerNodeId)
    if (isLinked) {
      const updatedBoundingCurves = boundsApi.expandControlPoints(cornerNodeId)
      setBoundingCurves(updatedBoundingCurves)
    }
    setConfig({
      ...config,
      global: {
        ...config.global,
        // If any individual control points are unmirrored set global to false
        isLinked: !isLinked ? false : config.global.isLinked,
      },
      bounds: {
        ...config.bounds,
        [cornerNodeId]: { ...config.bounds[cornerNodeId], isLinked },
      },
    })
  }

const handleZeroControlPoints =
  (boundsApi, setBoundingCurves) => (cornerNodeId) => () => {
    const updatedBoundingCurves = boundsApi.zeroControlPoints(cornerNodeId)
    setBoundingCurves(updatedBoundingCurves)
  }

const handleMirrorControlPoints =
  (config, setConfig) => (cornerNodeId) => (isMirrored) => {
    setConfig({
      ...config,
      global: {
        ...config.global,
        // If any individual control points are unmirrored set global to false
        isMirrored: !isMirrored ? false : config.global.isMirrored,
      },
      bounds: {
        ...config.bounds,
        [cornerNodeId]: { ...config.bounds[cornerNodeId], isMirrored },
      },
    })
  }

const handleZeroControlPointsGlobal =
  (boundingCurves, setBoundingCurves) => () => {
    const updatedBoundingCurves = CORNER_POINTS.reduce((acc, name) => {
      const boundsApi = getBoundsApi(acc)
      return boundsApi.zeroControlPoints(name)
    }, boundingCurves)

    setBoundingCurves(updatedBoundingCurves)
  }

const handleLinkControlPointsGlobal =
  (boundingCurves, setBoundingCurves, config, setConfig) => (isLinked) => {
    const updatedBoundingCurves = CORNER_POINTS.reduce((acc, cornerNodeId) => {
      const boundsApi = getBoundsApi(acc)
      return boundsApi.expandControlPoints(cornerNodeId)
    }, boundingCurves)

    setBoundingCurves(updatedBoundingCurves)

    setConfig({
      ...config,
      global: {
        ...config.global,
        isLinked,
      },
      bounds: {
        [BOUNDS_POINT_IDS.TOP_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_LEFT],
          isLinked,
        },
        [BOUNDS_POINT_IDS.TOP_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_RIGHT],
          isLinked,
        },
        [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_LEFT],
          isLinked,
        },
        [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_RIGHT],
          isLinked,
        },
      },
    })
  }

const handleMirrorControlPointsGlobal =
  (boundingCurves, setBoundingCurves, config, setConfig) => (isMirrored) => {
    setConfig({
      ...config,
      global: {
        ...config.global,
        isMirrored,
      },
      bounds: {
        [BOUNDS_POINT_IDS.TOP_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_LEFT],
          isMirrored,
        },
        [BOUNDS_POINT_IDS.TOP_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.TOP_RIGHT],
          isMirrored,
        },
        [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_LEFT],
          isMirrored,
        },
        [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
          ...config.bounds[BOUNDS_POINT_IDS.BOTTOM_RIGHT],
          isMirrored,
        },
      },
    })
  }

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [boundingCurves, setBoundingCurves] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const [config, setConfig] = React.useState(CONFIG_DEFAULT)
  const [grid, setGrid] = React.useState(GRID_DEFAULT)
  const [surface, setSurface] = React.useState(SURFACE_DEFAULT)
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })
  const [savedBounds, setSavedBounds] = React.useState({ ...localStorage })
  const displayRef = React.useRef(null)
  const [boundingCurvesDebounced] = useDebounce(boundingCurves, 5)

  useObserveClientSize(displayRef, setCanvasSize, {
    // left + right border widths
    width: -BORDER_WIDTHS,
    // top + bottom border widths
    height: -BORDER_WIDTHS,
  })

  React.useLayoutEffect(() => {
    if (!boundingCurves && canvas && canvasSize.width > 0) {
      setBoundingCurves(getRandomBoundingCurves(canvas))
    }

    if (boundingCurvesDebounced) {
      const coonsPatch = getCoonsPatch(boundingCurvesDebounced, grid)
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurvesDebounced, canvas, grid, canvasSize])

  const gridSquareClamped = React.useMemo(
    () =>
      surface.gridSquare
        ? clampGridSquareToGridDimensions(surface.gridSquare, grid)
        : surface.gridSquare,
    [surface, grid]
  )

  const boundsApi = getBoundsApi(boundingCurves)

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
          <React.Fragment>
            <Shape
              boundingCurves={boundingCurves}
              onDrag={handleShapeDrag(
                boundingCurves,
                setBoundingCurves,
                config
              )}
            />
            <ControlNodes
              boundingCurves={boundingCurves}
              onNodePositionChange={handleNodePositionChange(
                boundingCurves,
                setBoundingCurves,
                config
              )}
            />
          </React.Fragment>
        )}
      </div>
      <div className="-my-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
        <Sidebar
          grid={grid}
          canvas={canvas}
          getRandomBoundingCurves={getRandomBoundingCurves}
          setBoundingCurves={setBoundingCurves}
          boundingCurves={boundingCurves}
          config={config}
          setConfig={setConfig}
          setGrid={setGrid}
          savedBounds={savedBounds}
          surface={surface}
          setSurface={setSurface}
          onLinkControlPoints={handleLinkControlPoints(
            boundsApi,
            setBoundingCurves,
            config,
            setConfig
          )}
          onZeroControlPoints={handleZeroControlPoints(
            boundsApi,
            setBoundingCurves
          )}
          onMirrorControlPoints={handleMirrorControlPoints(config, setConfig)}
          onLinkControlPointsGlobal={handleLinkControlPointsGlobal(
            boundingCurves,
            setBoundingCurves,
            config,
            setConfig
          )}
          onZeroControlPointsGlobal={handleZeroControlPointsGlobal(
            boundingCurves,
            setBoundingCurves,
            config,
            setConfig
          )}
          onMirrorControlPointsGlobal={handleMirrorControlPointsGlobal(
            boundingCurves,
            setBoundingCurves,
            config,
            setConfig
          )}
          onSave={(name) => {
            localStorageApi.save(name, { grid, boundingCurves })
            setSavedBounds({ ...localStorage })
          }}
          onLoad={(name) => {
            const result = localStorageApi.load(name)
            setGrid(result.grid)
            setBoundingCurves(result.boundingCurves)
          }}
          onNodePositionChange={handleNodePositionChange(
            boundingCurves,
            setBoundingCurves,
            config
          )}
        />
      </div>
    </div>
  )
}

export default App
