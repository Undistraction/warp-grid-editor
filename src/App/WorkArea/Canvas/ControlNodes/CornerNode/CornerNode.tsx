import dasherize from 'dasherize'
import React, { ReactNode, useRef } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'

import { METRICS } from '../../../../../const'
import type { Point } from '../../../../../types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

interface CornerNodeProps {
  id: string
  position: Point
  onDrag: (id: string) => (event: DraggableEvent, data: DraggableData) => void
  onDoubleClick: (id: string) => () => void
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const { SIZE } = METRICS.CORNER_POINT

const SIZE_HALF = SIZE * 0.5
const SIZE_QUARTER = SIZE * 0.25

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CornerNode = ({
  id,
  position,
  onDrag,
  onDoubleClick,
}: CornerNodeProps): ReactNode => {
  const nodeRef = useRef(null)
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

export default CornerNode
