import dasherize from 'dasherize'
import PropTypes from 'prop-types'
import React from 'react'
import Draggable from 'react-draggable'

import { typePoint } from '../../../../../prop-types'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const SIZE = 12

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlPointNode = ({ position, onDrag, id }) => {
  const nodeRef = React.useRef(null)
  const testId = dasherize(id)
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      bounds="parent"
      onDrag={onDrag(id)}
      handle=".control-point-handle"
    >
      <div
        id={id}
        ref={nodeRef}
        className={`control-point-handle group pointer-events-auto absolute -left-[${SIZE * 0.5}px] -top-[${SIZE * 0.5}px] cursor-move`}
        data-tid={testId}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox={`${-SIZE * 0.5} ${-SIZE * 0.5} ${SIZE} ${SIZE}`}
          width={`${SIZE}px`}
          height={`${SIZE}px`}
          className="transition-transform hover:scale-125 group-[.react-draggable-dragging]:scale-125"
        >
          <circle
            fill="black"
            cx="0"
            cy="0"
            r={SIZE * 0.5}
          />
        </svg>
      </div>
    </Draggable>
  )
}

ControlPointNode.propTypes = {
  position: typePoint.isRequired,
  onDrag: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default ControlPointNode
