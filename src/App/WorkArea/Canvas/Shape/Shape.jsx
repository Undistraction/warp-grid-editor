import PropTypes from 'prop-types'
import React from 'react'
import Draggable from 'react-draggable'

import { typeBoundingCurves } from '../../../../prop-types'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const DEFAULT_CANVAS_SIZE = { width: 0, height: 0, x: 0, y: 0 }

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
  { endPoint, controlPoint1, controlPoint2 }
) => {
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
  const svgRef = React.useRef(null)
  const [{ width, height, x, y }, setCanvasBounds] =
    React.useState(DEFAULT_CANVAS_SIZE)

  React.useLayoutEffect(() => {
    const svgElement = svgRef.current
    if (svgElement) {
      const boundingBox = svgElement.getBBox({ stroke: true })
      setCanvasBounds(boundingBox)
    }
  }, [boundingCurves])

  return (
    <Draggable
      nodeRef={nodeRef}
      position={boundingCurves.top.startPoint}
      bounds="#work-area"
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
        style={{
          left: x,
          top: y,
        }}
        className={`shape-handle absolute cursor-move`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          ref={svgRef}
        >
          {renderPath(boundingCurves)}
        </svg>
      </div>
    </Draggable>
  )
}

Shape.propTypes = {
  boundingCurves: typeBoundingCurves,
  onDrag: PropTypes.func.isRequired,
}

export default Shape
