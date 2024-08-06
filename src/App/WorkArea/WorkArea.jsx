import PropTypes from 'prop-types'
import React from 'react'
import useObserveClientSize from '../../hooks/useObserveClientSize'
import { typeDimensions, typeProject, typeSurface } from '../../prop-types'
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

const WorkArea = ({
  setCanvas,
  canvasSize,
  coonsPatch,
  surface,
  setCanvasSize,
}) => {
  const displayRef = React.useRef(null)

  const project = useAppStore.use.project()
  const updateBoundingCurvesCornerNode =
    useAppStore.use.updateBoundingCurvesCornerNode()
  const updateBoundingCurvesPosition =
    useAppStore.use.updateBoundingCurvesPosition()

  const gridSquareClamped = React.useMemo(
    () =>
      surface.gridSquare
        ? clampGridSquareToGridDimensions(
            surface.gridSquare,
            project.gridDefinition
          )
        : surface.gridSquare,
    [surface, project]
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
        surface={surface}
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
                updateBoundingCurvesCornerNode={updateBoundingCurvesCornerNode}
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
  surface: typeSurface.isRequired,
  project: typeProject,
  setCanvasSize: PropTypes.func.isRequired,
}

export default WorkArea
