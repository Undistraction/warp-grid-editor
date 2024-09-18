import dasherize from 'dasherize'
import PropTypes from 'prop-types'
import React from 'react'
import Draggable from 'react-draggable'

import { METRICS } from '../../../../../const'
import { typePoint } from '../../../../../prop-types'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const { SIZE } = METRICS.CORNER_POINT

const SIZE_HALF = SIZE * 0.5
const SIZE_QUARTER = SIZE * 0.25

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CornerNode = ({ id, position, onDrag, onDoubleClick }) => {
  const nodeRef = React.useRef(null)
  const testId = dasherize(id)

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      bounds="#work-area"
      onDrag={onDrag(id)}
      handle=".corner-handle"
    >
      <div
        className="corner-handle group pointer-events-auto absolute cursor-move"
        ref={nodeRef}
        id={id}
        onDoubleClick={onDoubleClick(id)}
        data-tid={testId}
        style={{
          left: `-${SIZE_HALF}px`,
          top: `-${SIZE_HALF}px`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox={`${-SIZE_HALF} ${-SIZE_HALF}  ${SIZE} ${SIZE}`}
          width={`${SIZE}px`}
          height={`${SIZE}px`}
          className="scale-1 transition-transform hover:scale-125 group-[.react-draggable-dragging]:scale-125"
        >
          <circle
            stroke="black"
            strokeWidth="3"
            fill="white"
            cx="0"
            cy="0"
            r={SIZE_HALF}
          />
          <circle
            fill="black"
            cx="0.25"
            cy="0.25"
            r={SIZE_QUARTER}
          />
        </svg>
      </div>
    </Draggable>
  )
}

CornerNode.propTypes = {
  id: PropTypes.string.isRequired,
  position: typePoint.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
}

export default CornerNode
