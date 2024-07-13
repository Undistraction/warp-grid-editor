import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Canvas = ({ setCanvas, onClick }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      setCanvas(ref.current)
    }
  }, [ref.current])

  return (
    <canvas
      id="canvas"
      className="border border-black"
      ref={ref}
      width="800"
      height="500"
      onClick={onClick}
    ></canvas>
  )
}

export default Canvas
