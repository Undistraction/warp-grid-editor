import React from 'react'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderStems = (points) =>
  points.map(([point1, point2], idx) => {
    return (
      <line
        key={idx}
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        stroke="#BBB"
      />
    )
  })

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlPointStems = ({ boundingCurves, width, height }) => {
  const points = [
    [boundingCurves.top.startPoint, boundingCurves.top.controlPoint1],
    [boundingCurves.top.endPoint, boundingCurves.top.controlPoint2],
    [boundingCurves.bottom.startPoint, boundingCurves.bottom.controlPoint1],
    [boundingCurves.bottom.endPoint, boundingCurves.bottom.controlPoint2],
    [boundingCurves.left.startPoint, boundingCurves.left.controlPoint1],
    [boundingCurves.left.endPoint, boundingCurves.left.controlPoint2],
    [boundingCurves.right.startPoint, boundingCurves.right.controlPoint1],
    [boundingCurves.right.endPoint, boundingCurves.right.controlPoint2],
  ]

  return (
    <div className={`absolute inset-0`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        {renderStems(points)}
      </svg>
    </div>
  )
}

export default ControlPointStems
