import { isNotNil } from 'ramda-adjunct'
import React from 'react'
import { useDebounce } from 'use-debounce'
// eslint-disable-next-line import/no-unresolved
import warpGrid from 'warp-grid'

import useAppStore from '../state/useAppStore'
import { getRandomBoundingCurves } from '../utils/random'
import ButtonLink from './components/ButtonLink'
import ExportModalContent from './components/modals/content/ExportModalContent'
import Modal from './components/modals/Modal'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const App = () => {
  const [canvas, setCanvas] = React.useState(null)
  const [coonsPatch, setCoonsPatch] = React.useState(null)
  const { project } = useAppStore((state) => state)
  const [boundingCurvesDebounced] = useDebounce(project?.boundingCurves, 3)
  const setBoundingCurves = useAppStore.use.setBoundingCurves()
  const config = useAppStore.use.config()
  const setAppConfigValue = useAppStore.use.setAppConfigValue()
  const [workAreaDimensions, setWorkAreaDimensions] = React.useState({
    width: 0,
    height: 0,
  })
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const canvasIsReady = isNotNil(canvas) && workAreaDimensions.width > 0
  // Create a random set of bounding curves on first render if no project is loaded
  React.useLayoutEffect(() => {
    if (canvasIsReady && !project.boundingCurves) {
      setBoundingCurves(getRandomBoundingCurves(canvas))
    }
  }, [canvas, setBoundingCurves, canvasIsReady, project.boundingCurves])

  React.useLayoutEffect(() => {
    console.log(`@@`, project.gridDefinition)
    if (boundingCurvesDebounced) {
      const coonsPatch = warpGrid(
        boundingCurvesDebounced,
        project.gridDefinition
      )
      setCoonsPatch(coonsPatch)
    }
  }, [boundingCurvesDebounced, project.gridDefinition])

  const { isHidden: sidebarIsHidden } = config.ui.sidebar

  return (
    <div className="h-full w-screen">
      <div className="flex-shrink-1 relative flex h-full w-screen flex-row space-x-5 p-5">
        <WorkArea
          setCanvas={setCanvas}
          coonsPatch={coonsPatch}
          dimensions={workAreaDimensions}
          setDimensions={setWorkAreaDimensions}
        />
        {!sidebarIsHidden && (
          <div className="-my-5 w-[300px] flex-shrink-0 flex-grow-0 overflow-y-scroll">
            {canvas && project && (
              <Sidebar
                canvas={canvas}
                project={project}
              />
            )}
          </div>
        )}
      </div>
      {sidebarIsHidden && (
        <ButtonLink
          label="Open"
          className="absolute right-7 top-6 text-sm"
          onClick={() =>
            setAppConfigValue([`ui`, `sidebar`, `isHidden`], false)
          }
        />
      )}
      {modalIsOpen && (
        <Modal>
          <ExportModalContent onClose={() => setModalIsOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

export default App
