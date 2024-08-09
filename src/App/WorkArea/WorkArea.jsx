import PropTypes from 'prop-types'
import React from 'react'

import useObserveClientSize from '../../hooks/useObserveClientSize'
import { typeProject } from '../../prop-types'
import useAppStore from '../../state/useAppStore'
import { getBounds } from '../../utils/bezier'
import Canvas from './Canvas'
import ControlNodes from './Canvas/ControlNodes'
import ControlPointStems from './Canvas/ControlPointStems'
import Shape from './Canvas/Shape'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const BORDER_WIDTHS = 2

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const WorkArea = ({ setCanvas, coonsPatch, dimensions, setDimensions }) => {
  const displayRef = React.useRef(null)

  const project = useAppStore.use.project()
  const updateBoundingCurvesNodePosition =
    useAppStore.use.updateBoundingCurvesNodePosition()
  const updateBoundingCurvesPosition =
    useAppStore.use.updateBoundingCurvesPosition()

  useObserveClientSize(displayRef, setDimensions, {
    // left + right border widths
    width: -BORDER_WIDTHS,
    // top + bottom border widths
    height: -BORDER_WIDTHS,
  })

  // Calculate true bounds of curves.
  const bounds = project.boundingCurves && getBounds(project.boundingCurves)

  // Use whatever is greatest, the available space or the bounds
  const canvasWidth = bounds
    ? Math.max(dimensions.width, bounds.x)
    : dimensions.width
  const canvasHeight = bounds
    ? Math.max(dimensions.height, bounds.y)
    : dimensions.height

  const dimensionsSummary = `${Math.round(dimensions.width)} x ${Math.round(dimensions.height)}`

  return (
    <div
      className="width-full relative h-full min-w-0 flex-grow overflow-hidden rounded-lg border border-gray-300"
      id="work-area"
      ref={displayRef}
    >
      <div className="width-full height-full absolute inset-0 overflow-auto">
        <div
          id="scroll-inner"
          className="w-max"
        >
          <Canvas
            setCanvas={setCanvas}
            width={canvasWidth}
            height={canvasHeight}
            coonsPatch={coonsPatch}
            gridSquare={project.config.gridSquare}
            config={project?.config}
          />
          {project.boundingCurves && (
            <React.Fragment>
              <Shape
                boundingCurves={project.boundingCurves}
                onDrag={updateBoundingCurvesPosition}
              />
              {project.config.bounds.shouldDrawCornerPoints && (
                <React.Fragment>
                  <ControlPointStems
                    boundingCurves={project.boundingCurves}
                    width={canvasWidth}
                    height={canvasHeight}
                  />
                  <ControlNodes
                    boundingCurves={project.boundingCurves}
                    updateBoundingCurvesNodePosition={
                      updateBoundingCurvesNodePosition
                    }
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="absolute bottom-2 left-3 font-mono text-xs text-gray-400">
        {dimensionsSummary}
      </div>
    </div>
  )
}

WorkArea.propTypes = {
  setCanvas: PropTypes.func.isRequired,
  coonsPatch: PropTypes.object,
  project: typeProject,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
}

export default WorkArea
