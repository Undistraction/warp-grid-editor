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

const SURFACE_DEFAULT = { gridSquare: null }

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

const PROJECT_DEFAULT = {
  config: CONFIG_DEFAULT,
  gridDefinition: GRID_DEFINITION_DEFAULT,
  boundingCurves: null,
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const [project, setProject] = React.useState(null)
  const [surface, setSurface] = React.useState(SURFACE_DEFAULT)
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })
  const [projects, setProjects] = React.useState(localStorageApi.getProjects())
  const [boundingCurvesDebounced] = useDebounce(project?.boundingCurves, 5)
  console.log(`Surface`, surface)
  const canvasIsReady = canvas && canvasSize.width > 0

  // Create a random set of bounding curves on first render if no project is loaded
  React.useLayoutEffect(() => {
    const { lastProjectId } = localStorageApi.getMeta()
    if (!project && lastProjectId) {
      const lastProject = localStorageApi.loadProject(lastProjectId)
      setProject(lastProject)
    } else if (!project && canvasIsReady) {
      setProject({
        ...PROJECT_DEFAULT,
        boundingCurves: getRandomBoundingCurves(canvas),
      })
    }
  }, [project, canvas, canvasSize, canvasIsReady])

  React.useLayoutEffect(() => {
    if (boundingCurvesDebounced) {
      const coonsPatch = warpGrid(
        boundingCurvesDebounced,
        project.gridDefinition
      )
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurvesDebounced, project?.gridDefinition])

  const appApi = getAppApi({
    setProjects,
    setProject,
    project,
    coonsPatch,
  })

  return (
    <AppApiContext.Provider value={appApi}>
      <div className="relative flex h-full w-screen flex-row space-x-5 p-5">
        <WorkArea
          setCanvas={setCanvas}
          canvasSize={canvasSize}
          coonsPatch={coonsPatch}
          surface={surface}
          project={project}
          setCanvasSize={setCanvasSize}
        />
        <div className="-my-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
          {canvas && project && (
            <Sidebar
              canvas={canvas}
              project={project}
              getRandomBoundingCurves={getRandomBoundingCurves}
              boundingCurves={project.boundingCurves}
              projects={projects}
              surface={surface}
              setSurface={setSurface}
              saveProject={appApi.saveProject}
              loadProject={appApi.loadProject}
              exportBounds={appApi.exportBounds}
              exportCellBounds={appApi.exportCellBounds}
              setProject={setProject}
            />
          )}
        </div>
      </div>
    </AppApiContext.Provider>
  )
}

export default App
