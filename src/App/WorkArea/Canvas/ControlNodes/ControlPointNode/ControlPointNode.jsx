import dasherize from 'dasherize'
import PropTypes from 'prop-types'
import React from 'react'
import Draggable from 'react-draggable'

import { METRICS } from '../../../../../const'
import { typePoint } from '../../../../../prop-types'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const { WIDTH, HEIGHT } = METRICS.CONTROL_POINT

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlPointNode = ({ position, onDrag, id }) => {
  const nodeRef = React.useRef(null)
  const testId = `control-point-node-${dasherize(id)}`
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
        className="control-point-handle group pointer-events-auto absolute -left-[6px] -top-[6px] cursor-move"
        data-tid={testId}
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

ControlPointNode.propTypes = {
  position: typePoint.isRequired,
  onDrag: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default ControlPointNode
