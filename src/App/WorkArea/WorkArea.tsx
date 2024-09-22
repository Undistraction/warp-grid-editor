import React from 'react'

import useObserveClientSize from '../../hooks/useObserveClientSize'
import useAppStore from '../../state/useAppStore'
// eslint-disable-next-line import/named
import { BoundingCurves, Size, WarpGrid } from '../../types'
import { getBounds } from '../../utils/bezier'
import { reduceMax } from '../../utils/math'
import Canvas from './Canvas'
import ControlNodes from './Canvas/ControlNodes'
import ControlPointStems from './Canvas/ControlPointStems'
import Shape from './Canvas/Shape'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface WorkAreaProps {
  setCanvas: (canvas: HTMLCanvasElement) => void
  setDimensions: (dimensions: Size) => void
  grid: WarpGrid | null
  dimensions: { width: number; height: number }
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const BORDER_WIDTHS = 2

const CANVAS_MIN_DIMENSIONS = {
  WIDTH: 280,
  HEIGHT: 0,
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const calculateCanvasDimensions = (
  boundingCurves: BoundingCurves,
  dimensions: Size
) => {
  if (!boundingCurves) {
    return dimensions
  }
  // Calculate true bounds of curves.
  const bounds = getBounds(boundingCurves)

  return {
    width: reduceMax([
      dimensions.width,
      bounds.xMax,
      CANVAS_MIN_DIMENSIONS.WIDTH,
    ]),
    height: reduceMax([
      dimensions.height,
      bounds.yMax,
      CANVAS_MIN_DIMENSIONS.HEIGHT,
    ]),
  }
}

const getDimensionsSumamry = ({ width, height }: Size) =>
  `${Math.round(width)}×${Math.round(height)}`

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const WorkArea = ({
  setCanvas,
  grid,
  dimensions,
  setDimensions,
}: WorkAreaProps): React.ReactNode => {
  const displayRef = React.useRef(null)

  const project = useAppStore.use.project()
  const updateBoundingCurvesPosition =
    useAppStore.use.updateBoundingCurvesPosition()

  useObserveClientSize(displayRef, setDimensions, {
    // left + right border widths
    width: -BORDER_WIDTHS,
    // top + bottom border widths
    height: -BORDER_WIDTHS,
  })

  const { width: canvasWidth, height: canvasHeight } =
    calculateCanvasDimensions(project.boundingCurves, dimensions)

  const dimensionsSummary = getDimensionsSumamry(dimensions)

  const canvasBounds = {
    width: canvasWidth,
    height: canvasHeight,
  }

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
            grid={grid}
            gridSquareConfig={project.config.gridSquare}
            config={project.config}
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
                    bounds={canvasBounds}
                  />
                  <ControlNodes boundingCurves={project.boundingCurves} />
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

export default WorkArea
