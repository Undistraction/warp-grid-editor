import dasherize from 'dasherize'
import PropTypes from 'prop-types'
import React from 'react'
import Draggable from 'react-draggable'

import { METRICS } from '../../../../../const'
import { typePoint } from '../../../../../prop-types'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const { SIZE } = METRICS.CONTROL_POINT
const SIZE_HALF = SIZE * 0.5

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
      bounds="#work-area"
      onDrag={onDrag(id)}
      handle=".control-point-handle"
    >
      <div
        id={id}
        ref={nodeRef}
        className={`control-point-handle group pointer-events-auto absolute cursor-move`}
        data-tid={testId}
        style={{
          left: `-${SIZE_HALF}px`,
          top: `-${SIZE_HALF}px`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox={`${-SIZE_HALF} ${-SIZE_HALF} ${SIZE} ${SIZE}`}
          width={`${SIZE}px`}
          height={`${SIZE}px`}
          className="transition-transform hover:scale-125 group-[.react-draggable-dragging]:scale-125"
        >
          <circle
            fill="black"
            cx="0"
            cy="0"
            r={SIZE_HALF}
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
