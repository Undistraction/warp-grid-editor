// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import React from 'react'
import Draggable from 'react-draggable'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CornerNode = ({ uid, position, onStop }) => {
  const nodeRef = React.useRef(null)
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      bounds="#patch-view"
      onStop={(event, dragElement) => onStop(event, dragElement, uid)}
      onDrag={(event, dragElement) => onStop(event, dragElement, uid)}
    >
      <div
        ref={nodeRef}
        className="absolute -top-[9.2px] -left-[9.2px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox="-10 -10 20 20"
          width="20px"
          height="20px"
        >
          <circle
            fill="red"
            opacity="0.5"
            cx="0"
            cy="0"
            r="10"
          />
        </svg>
      </div>
    </Draggable>
  )
}

export default CornerNode
