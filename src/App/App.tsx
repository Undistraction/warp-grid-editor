import { ChevronDoubleLeftIcon } from '@heroicons/react/16/solid'
import { isNotNil } from 'ramda-adjunct'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { useDebounce } from 'use-debounce'
import warpGrid from 'warp-grid'

import useModal from '../hooks/useModal'
import useAppStore from '../state/useAppStore'
import type { AppSlice, WarpGrid } from '../types'
import { getDefaultBoundingCurves } from '../utils/boundingCurves'
import ButtonLink from './components/ButtonLink'
import WelcomeModalContent from './components/modals/content/WelcomeModalContent'
import Header from './Header'
import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [grid, setGrid] = useState<WarpGrid | null>(null)
  const { project } = useAppStore((state: AppSlice) => state)
  const [boundingCurvesDebounced] = useDebounce(project?.boundingCurves, 3)
  const setBoundingCurves = useAppStore.use.setBoundingCurves()
  const config = useAppStore.use.config()
  const setAppConfigValue = useAppStore.use.setAppConfigValue()
  const [workAreaDimensions, setWorkAreaDimensions] = useState({
    width: 0,
    height: 0,
  })
  const { openModal, Modal, isOpen } = useModal()

  const canvasIsReady = isNotNil(canvas) && workAreaDimensions.width > 0
  // Create a random set of bounding curves on first render if no project is loaded
  useLayoutEffect(() => {
    if (canvasIsReady && !project.boundingCurves) {
      const boundingCurvesNew = getDefaultBoundingCurves(canvas)
      setBoundingCurves(boundingCurvesNew)
    }
  }, [canvas, setBoundingCurves, canvasIsReady, project.boundingCurves])

  useLayoutEffect(() => {
    if (boundingCurvesDebounced) {
      const grid = warpGrid(boundingCurvesDebounced, project.gridDefinition)
      setGrid(grid)
    }
  }, [boundingCurvesDebounced, project.gridDefinition])

  useEffect(() => {
    if (!isOpen && !config.ui.welcomeScreen.isHidden) {
      openModal({
        Content: WelcomeModalContent,
        onClose: () => {
          setAppConfigValue([`ui`, `welcomeScreen`, `isHidden`], true)
        },
      })
    }
  }, [config, openModal, setAppConfigValue, isOpen])

  const { isHidden: sidebarIsHidden } = config.ui.sidebar

  return (
    <div className="h-full w-screen">
      <div
        className={`relative flex h-full w-screen flex-row space-x-5 p-5 ${!sidebarIsHidden && `pr-0`}`}
      >
        <div className="flex w-full flex-col">
          <Header />
          <WorkArea
            setCanvas={setCanvas}
            grid={grid}
            dimensions={workAreaDimensions}
            setDimensions={setWorkAreaDimensions}
          />
        </div>
        {!sidebarIsHidden && (
          <div className="absolute inset-0 grow-0 overflow-y-scroll sm:relative sm:inset-auto sm:-my-5 sm:w-[300px] sm:shrink-0 sm:pt-0">
            {canvas && project && <Sidebar project={project} />}
          </div>
        )}
      </div>
      {sidebarIsHidden && (
        <ButtonLink
          icon={<ChevronDoubleLeftIcon />}
          className="absolute right-5 top-6 text-sm"
          testId="sidebar-open-button"
          onClick={() =>
            setAppConfigValue([`ui`, `sidebar`, `isHidden`], false)
          }
        />
      )}
      <Tooltip
        className="max-w-[300px] bg-black font-sans"
        id="default"
      />
      {Modal}
    </div>
  )
}

export default App
