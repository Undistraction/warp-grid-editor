import PropTypes from 'prop-types'
import React from 'react'
import useObserveClientSize from '../../hooks/useObserveClientSize'
import {
  typeBoundingCurves,
  typeConfig,
  typeDimensions,
  typeSurface,
} from '../../prop-types'
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
  config,
  boundingCurves,
  setBoundingCurves,
  handleNodePositionChange,
  handleShapeDrag,
  setCanvasSize,
  grid,
}) => {
  const displayRef = React.useRef(null)

  const gridSquareClamped = React.useMemo(
    () =>
      surface.gridSquare
        ? clampGridSquareToGridDimensions(surface.gridSquare, grid)
        : surface.gridSquare,
    [surface, grid]
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
        config={config}
      />
      {boundingCurves && (
        <React.Fragment>
          <Shape
            boundingCurves={boundingCurves}
            onDrag={handleShapeDrag(boundingCurves, setBoundingCurves, config)}
          />
          {config.bounds.shouldDrawCornerPoints && (
            <React.Fragment>
              <ControlPointStems
                boundingCurves={boundingCurves}
                width={canvasSize.width}
                height={canvasSize.height}
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
  config: typeConfig,
  boundingCurves: typeBoundingCurves,
  setBoundingCurves: PropTypes.func.isRequired,
  handleNodePositionChange: PropTypes.func.isRequired,
  handleShapeDrag: PropTypes.func.isRequired,
  setCanvasSize: PropTypes.func.isRequired,
  grid: PropTypes.object.isRequired,
}

export default WorkArea
