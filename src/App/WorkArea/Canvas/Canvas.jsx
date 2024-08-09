import PropTypes from 'prop-types'
import React from 'react'

import { typeConfig, typeGridSquare } from '../../../prop-types'
import getCanvasApi from '../../../utils/getCanvasApi'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Canvas = ({
  setCanvas,
  width,
  height,
  coonsPatch,
  gridSquare,
  config = undefined,
}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      setCanvas(ref.current)
    }
  }, [setCanvas])

  React.useLayoutEffect(() => {
    if (coonsPatch) {
      const canvasContext = ref.current.getContext(`2d`)
      const canvasApi = getCanvasApi(canvasContext)
      canvasApi.clearCanvas(ref.current)
      canvasApi.drawCoonsPatch(coonsPatch, {
        shouldDrawBounds: config.bounds.shouldDrawBounds,
        shouldDrawIntersections: config.grid.shouldDrawIntersections,
      })

      if (gridSquare.shouldShow) {
        const gridSquareBounds = coonsPatch.getCellBounds(
          gridSquare.value.x,
          gridSquare.value.y
        )
        canvasApi.drawGridSquareBounds(gridSquareBounds)
      }
    }
  }, [coonsPatch, gridSquare, config, width, height])

  return (
    <canvas
      id="canvas"
      className="relative"
      ref={ref}
      width={width}
      height={height}
    />
  )
}

Canvas.propTypes = {
  setCanvas: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  coonsPatch: PropTypes.object,
  gridSquare: typeGridSquare,
  config: typeConfig,
}

export default Canvas
