import React from 'react'
import Draggable from 'react-draggable'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const WIDTH = 12
const HEIGHT = 12

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlPointNode = ({ position, onDrag, onDragStart, onDragEnd, id }) => {
  const nodeRef = React.useRef(null)
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      bounds="#patch-view"
      onStart={onDragStart(id)}
      onDrag={onDrag(id)}
      onStop={onDragEnd(id)}
      handle=".control-point-handle"
    >
      <div
        id={id}
        ref={nodeRef}
        className="control-point-handle group absolute -left-[6px] -top-[6px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox={`${-WIDTH * 0.5} ${-HEIGHT * 0.5} ${WIDTH} ${HEIGHT}`}
          width={`${WIDTH}px`}
          height={`${HEIGHT}px`}
          className="transition-transform hover:scale-125 group-[.react-draggable-dragging]:scale-125"
        >
          <circle
            fill="black"
            cx="0"
            cy="0"
            r={WIDTH * 0.5}
          />
        </svg>
      </div>
    </Draggable>
  )
}

export default ControlPointNode
