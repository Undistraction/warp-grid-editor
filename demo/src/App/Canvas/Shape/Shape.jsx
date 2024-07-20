import React from 'react'
import Draggable from 'react-draggable'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const reverseCurve = ({
  startPoint,
  endPoint,
  controlPoint1,
  controlPoint2,
}) => ({
  startPoint: endPoint,
  controlPoint1: controlPoint2,
  controlPoint2: controlPoint1,
  endPoint: startPoint,
})

const getPathFromCurve = (
  origin,
  { startPoint, endPoint, controlPoint1, controlPoint2 }
) => {
  const startPointOffset = {
    x: startPoint.x - origin.x,
    y: startPoint.y - origin.y,
  }

  const endPointOffset = {
    x: endPoint.x - origin.x,
    y: endPoint.y - origin.y,
  }

  const controlPoint1Offset = {
    x: controlPoint1.x - origin.x,
    y: controlPoint1.y - origin.y,
  }

  const controlPoint2Offset = {
    x: controlPoint2.x - origin.x,
    y: controlPoint2.y - origin.y,
  }

  return `C ${controlPoint1Offset.x} ${controlPoint1Offset.y}, ${controlPoint2Offset.x} ${controlPoint2Offset.y}, ${endPointOffset.x} ${endPointOffset.y}`
}

const renderPath = ({ top, left, bottom, right }) => {
  const origin = top.startPoint

  const path = `M 0 0 ${getPathFromCurve(origin, top)}${getPathFromCurve(origin, right)} ${getPathFromCurve(origin, reverseCurve(bottom))} ${getPathFromCurve(origin, reverseCurve(left))}`

  return (
    <path
      d={path}
      fill="transparent"
      key="top"
    />
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Shape = ({ boundingCurves, onDrag }) => {
  const nodeRef = React.useRef(null)

  console.log('>>', boundingCurves.top.startPoint)

  return (
    <Draggable
      nodeRef={nodeRef}
      position={boundingCurves.top.startPoint}
      bounds="#patch-view"
      onDrag={(event, dragElement) => {
        const newPosition = {
          x: dragElement.x,
          y: dragElement.y,
        }

        onDrag(newPosition)
      }}
      handle=".shape-handle"
    >
      <div
        ref={nodeRef}
        className="shape-handle absolute left-0 top-0 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox={`0 0 300 300`}
          width={`100%`}
          height={`100%`}
        >
          {renderPath(boundingCurves)}
        </svg>
      </div>
    </Draggable>
  )
}

export default Shape
