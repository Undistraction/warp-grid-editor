import React from 'react'
import { useDebounce } from 'use-debounce'
import getGrid from 'warp-grid'
import {
  BOUNDS_POINT_IDS,
  CORNER_POINTS,
  INTERPOLATION_STRATEGY,
  LINE_STRATEGY,
} from '../const'
import { getRandomBoundingCurves } from '../utils'
import { getBoundsApi } from '../utils/boundsApi'
import localStorageApi from '../utils/localStorageApi'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const GRID_DEFAULT = {
  columns: 25,
  rows: 25,
  gutter: 0,
  lineStrategy: LINE_STRATEGY.CURVES,
  interpolationStrategy: INTERPOLATION_STRATEGY.EVEN,
  precision: 20,
}

const SURFACE_DEFAULT = { x: 0, y: 0 }

const CONFIG_DEFAULT = {
  global: {
    isLinked: true,
    isMirrored: false,
  },
  grid: {
    shouldUseComplexColumnsRows: false,
    shouldDrawIntersections: false,
  },
  bounds: {
    shouldDrawBounds: true,
    shouldDrawCornerPoints: true,
    [BOUNDS_POINT_IDS.TOP_LEFT]: { isLinked: true, isMirrored: false },
    [BOUNDS_POINT_IDS.TOP_RIGHT]: { isLinked: true, isMirrored: false },
    [BOUNDS_POINT_IDS.BOTTOM_LEFT]: { isLinked: true, isMirrored: false },
    [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: { isLinked: true, isMirrored: false },
  },
}

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
  (boundingCurves, setBoundingCurves, config, setConfig) =>
  (cornerNodeId) =>
  (isLinked) => {
    const boundsApi = getBoundsApi(boundingCurves, config)
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
  (boundingCurves, setBoundingCurves, config) => (cornerNodeId) => () => {
    const boundsApi = getBoundsApi(boundingCurves, config)
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
        ...config.bounds,
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
        ...config.bounds,
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
  const [savedProjects, setSavedProjects] = React.useState(
    localStorageApi.getProjects()
  )
  const [boundingCurvesDebounced] = useDebounce(boundingCurves, 5)

  // Create a random set of bounding curves on first render
  React.useLayoutEffect(() => {
    if (!boundingCurves && canvas && canvasSize.width > 0) {
      setBoundingCurves(getRandomBoundingCurves(canvas))
    }
  }, [boundingCurves, canvas, canvasSize])

  React.useLayoutEffect(() => {
    if (boundingCurvesDebounced) {
      const coonsPatch = getGrid(boundingCurvesDebounced, grid)
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurvesDebounced, grid])

  return (
    <div className="relative flex h-full w-screen flex-row space-x-5 p-5">
      <WorkArea
        handleShapeDrag={handleShapeDrag}
        boundingCurves={boundingCurves}
        setCanvas={setCanvas}
        canvasSize={canvasSize}
        coonsPatch={coonsPatch}
        surface={surface}
        config={config}
        setBoundingCurves={setBoundingCurves}
        handleNodePositionChange={handleNodePositionChange}
        setCanvasSize={setCanvasSize}
        grid={grid}
      />
      <div className="-my-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
        {canvas && (
          <Sidebar
            grid={grid}
            canvas={canvas}
            getRandomBoundingCurves={getRandomBoundingCurves}
            setBoundingCurves={setBoundingCurves}
            boundingCurves={boundingCurves}
            config={config}
            setConfig={setConfig}
            setGrid={setGrid}
            savedProjects={savedProjects}
            surface={surface}
            setSurface={setSurface}
            onLinkControlPoints={handleLinkControlPoints(
              boundingCurves,
              setBoundingCurves,
              config,
              setConfig
            )}
            onZeroControlPoints={handleZeroControlPoints(
              boundingCurves,
              setBoundingCurves,
              config
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
            onSave={(id) => {
              localStorageApi.save(id, { grid, boundingCurves, config })
              setSavedProjects(localStorageApi.getProjects())
            }}
            onLoad={(id) => {
              const result = localStorageApi.load(id)
              setConfig(result.config)
              setGrid(result.grid)
              setBoundingCurves(result.boundingCurves)
            }}
            onNodePositionChange={handleNodePositionChange(
              boundingCurves,
              setBoundingCurves,
              config
            )}
          />
        )}
      </div>
    </div>
  )
}

export default App
