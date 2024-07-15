import React from 'react'
import { isInt } from '../../../../src/utils'
import getCanvasApi from '../../utils/getCanvasApi'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Canvas = ({ setCanvas, width, height, coonsPatch, gridSquare }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      setCanvas(ref.current)
    }
  }, [ref.current])

  React.useEffect(() => {
    const canvasContext = ref.current.getContext('2d')
    const canvasApi = getCanvasApi(canvasContext)
    canvasApi.clearCanvas(ref.current)

    if (coonsPatch) {
      canvasApi.drawCoonsPatch(coonsPatch)

      if (gridSquare && isInt(gridSquare.x) && isInt(gridSquare.y)) {
        try {
          const gridSquareBounds = coonsPatch.getGridSquareBounds(
            gridSquare.x,
            gridSquare.y
          )
          canvasApi.drawGridSquareBounds(gridSquareBounds)
        } catch {
          // The library used for detecting intersections between cubic Beziers is unreliable and will occasionally fail to detect intersections. We throw an error in this instance and catch it here, doing nothing
        }
      }
    }
  }, [coonsPatch, gridSquare])

  return (
    <canvas
      id="canvas"
      className="border border-black"
      ref={ref}
      width={width}
      height={height}
    ></canvas>
  )
}

export default Canvas
