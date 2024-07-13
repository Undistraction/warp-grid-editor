import React from 'react'
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
    if (coonsPatch) {
      const canvasContext = ref.current.getContext('2d')
      const canvasApi = getCanvasApi(canvasContext)
      canvasApi.clearCanvas(ref.current)
      canvasApi.drawCoonsPatch(coonsPatch)
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
