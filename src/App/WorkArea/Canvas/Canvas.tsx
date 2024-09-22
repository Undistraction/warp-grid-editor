import { useEffect, useLayoutEffect, useRef } from 'react'

import type { GridSquareConfig, ProjectConfig, WarpGrid } from '../../../types'
import getCanvasApi from '../../../utils/getCanvasApi'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

interface CanvasProps {
  setCanvas: (canvas: HTMLCanvasElement) => void
  width: number
  height: number
  grid: WarpGrid | null
  gridSquareConfig: GridSquareConfig
  config: ProjectConfig
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Canvas = ({
  setCanvas,
  width,
  height,
  grid,
  gridSquareConfig,
  config,
}: CanvasProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      setCanvas(ref.current)
    }
  }, [setCanvas])

  useLayoutEffect(() => {
    if (grid && ref.current) {
      const canvasContext = ref.current.getContext(`2d`)

      if (!canvasContext) {
        return
      }

      const canvasApi = getCanvasApi(canvasContext)
      canvasApi.clearCanvas(ref.current)
      canvasApi.drawCoonsPatch(grid, {
        shouldDrawBounds: config.bounds.shouldDrawBounds,
        shouldDrawIntersections: config.grid.shouldDrawIntersections,
        shouldDrawGrid: config.grid.shouldDrawGrid,
      })

      if (gridSquareConfig.shouldShow) {
        const gridSquareBounds = grid.getCellBounds(
          gridSquareConfig.value.columnIdx,
          gridSquareConfig.value.rowIdx
        )
        canvasApi.drawGridSquareBounds(gridSquareBounds)
      }
    }
  }, [grid, gridSquareConfig, config, width, height])

  return (
    <canvas
      id="canvas"
      className="relative"
      data-tid="grid-canvas"
      ref={ref}
      width={width}
      height={height}
    />
  )
}

export default Canvas
