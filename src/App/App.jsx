import React from 'react'
import { useDebounce } from 'use-debounce'
// eslint-disable-next-line import/no-unresolved
import warpGrid from 'warp-grid'
import AppApiContext from '../context/AppApiContext'
import getAppApi from '../getAppApi'
import useAppStore from '../state/useAppStore'
import { getRandomBoundingCurves } from '../utils'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const SURFACE_DEFAULT = { gridSquare: null }

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

let e
const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const [surface, setSurface] = React.useState(SURFACE_DEFAULT)
  const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 })
  const canvasIsReady = canvas && canvasSize.width > 0
  const { project, setProject } = useAppStore((state) => state)
  const [boundingCurvesDebounced] = useDebounce(project?.boundingCurves, 3)
  const setBoundingCurves = useAppStore.use.setBoundingCurves()

  // Create a random set of bounding curves on first render if no project is loaded
  React.useLayoutEffect(() => {
    if (canvasIsReady && !project.boundingCurves) {
      setBoundingCurves(getRandomBoundingCurves(canvas))
    }
  }, [canvas, setBoundingCurves, canvasIsReady, project.boundingCurves])

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
    project: project,
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
          setCanvasSize={setCanvasSize}
        />
        <div className="-my-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
          {canvas && project && (
            <Sidebar
              canvas={canvas}
              project={project}
              getRandomBoundingCurves={getRandomBoundingCurves}
              boundingCurves={project.boundingCurves}
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
