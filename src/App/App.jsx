import React from 'react'
import { useDebounce } from 'use-debounce'
// eslint-disable-next-line import/no-unresolved
import warpGrid from 'warp-grid'
import {
  BOUNDS_POINT_IDS,
  INTERPOLATION_STRATEGY,
  LINE_STRATEGY,
} from '../const'
import AppApiContext from '../context/AppApiContext'
import getAppApi from '../getAppApi'
import { getRandomBoundingCurves } from '../utils'
import localStorageApi from '../utils/localStorageApi'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const GRID_DEFINITION_DEFAULT = {
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
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [boundingCurves, setBoundingCurves] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const [config, setConfig] = React.useState(CONFIG_DEFAULT)
  const [gridDefinition, setGridDefinition] = React.useState(
    GRID_DEFINITION_DEFAULT
  )
  const [surface, setSurface] = React.useState(SURFACE_DEFAULT)
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })
  const [savedProjects, setSavedProjects] = React.useState(
    localStorageApi.getProjects()
  )
  const [boundingCurvesDebounced] = useDebounce(boundingCurves, 5)
  const [project, setProject] = React.useState(null)

  // Create a random set of bounding curves on first render
  React.useLayoutEffect(() => {
    if (!boundingCurves && canvas && canvasSize.width > 0) {
      setBoundingCurves(getRandomBoundingCurves(canvas))
    }
  }, [boundingCurves, canvas, canvasSize])

  React.useLayoutEffect(() => {
    if (boundingCurvesDebounced) {
      const coonsPatch = warpGrid(boundingCurvesDebounced, gridDefinition)
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurvesDebounced, gridDefinition])

  const appApi = getAppApi({
    boundingCurves,
    setBoundingCurves,
    config,
    setConfig,
    setSavedProjects,
    gridDefinition,
    setGridDefinition,
    setProject,
    project,
    coonsPatch,
  })

  return (
    <AppApiContext.Provider value={appApi}>
      <div className="relative flex h-full w-screen flex-row space-x-5 p-5">
        <WorkArea
          boundingCurves={boundingCurves}
          setCanvas={setCanvas}
          canvasSize={canvasSize}
          coonsPatch={coonsPatch}
          surface={surface}
          config={config}
          setBoundingCurves={setBoundingCurves}
          setCanvasSize={setCanvasSize}
          gridDefinition={gridDefinition}
        />
        <div className="-my-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
          {canvas && (
            <Sidebar
              grid={gridDefinition}
              canvas={canvas}
              getRandomBoundingCurves={getRandomBoundingCurves}
              setBoundingCurves={setBoundingCurves}
              boundingCurves={boundingCurves}
              config={config}
              setConfig={setConfig}
              setGrid={setGridDefinition}
              savedProjects={savedProjects}
              surface={surface}
              setSurface={setSurface}
              saveProject={appApi.saveProject}
              loadProject={appApi.loadProject}
              exportBounds={appApi.exportBounds}
              exportCellBounds={appApi.exportCellBounds}
              project={project}
            />
          )}
        </div>
      </div>
    </AppApiContext.Provider>
  )
}

export default App
