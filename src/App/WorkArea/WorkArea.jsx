import PropTypes from 'prop-types'
import React from 'react'

import useObserveClientSize from '../../hooks/useObserveClientSize'
import { typeDimensions, typeProject } from '../../prop-types'
import useAppStore from '../../state/useAppStore'
import { clampGridSquareToGridDimensions } from '../../utils'
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

const WorkArea = ({ setCanvas, canvasSize, coonsPatch, setCanvasSize }) => {
  const displayRef = React.useRef(null)

  const project = useAppStore.use.project()
  const updateBoundingCurvesNodePosition =
    useAppStore.use.updateBoundingCurvesNodePosition()
  const updateBoundingCurvesPosition =
    useAppStore.use.updateBoundingCurvesPosition()

  const gridSquareClamped = React.useMemo(
    () =>
      project.config.gridSquare
        ? clampGridSquareToGridDimensions(
            project.config.gridSquare,
            project.gridDefinition
          )
        : project.config.gridSquare,
    [project.config.gridSquare, project.gridDefinition]
  )

  useObserveClientSize(displayRef, setCanvasSize, {
    // left + right border widths
    width: -BORDER_WIDTHS,
    // top + bottom border widths
    height: -BORDER_WIDTHS,
  })

  return (
    <div
      className="relative h-full flex-grow overflow-hidden"
      id="work-area"
      ref={displayRef}
    >
      <Canvas
        setCanvas={setCanvas}
        width={canvasSize.width}
        height={canvasSize.height}
        coonsPatch={coonsPatch}
        gridSquare={gridSquareClamped}
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
                width={canvasSize.width}
                height={canvasSize.height}
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
  )
}

WorkArea.propTypes = {
  setCanvas: PropTypes.func.isRequired,
  canvasSize: typeDimensions.isRequired,
  coonsPatch: PropTypes.object,
  project: typeProject,
  setCanvasSize: PropTypes.func.isRequired,
}

export default WorkArea
