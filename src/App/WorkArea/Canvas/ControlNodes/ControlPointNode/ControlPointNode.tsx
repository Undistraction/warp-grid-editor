import dasherize from 'dasherize'
import React, { ReactNode, useRef } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'

import { METRICS } from '../../../../../const'
import type { Point } from '../../../../../types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ControlPointNodeProps {
  position: Point
  onDrag: (id: string) => (event: DraggableEvent, data: DraggableData) => void
  id: string
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const { SIZE } = METRICS.CONTROL_POINT
const SIZE_HALF = SIZE * 0.5

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function ControlPointNode({
  position,
  onDrag,
  id,
}: ControlPointNodeProps): ReactNode {
  const nodeRef = useRef(null)
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
