import PropTypes from 'prop-types'
import React from 'react'

import { typePoint } from '../../../../../prop-types'

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
        stroke="#AAA"
      />
    )
  })

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlPointStems = ({ bounds: { width, height } = {}, points }) => {
  return (
    <div className={`pointer-events-none absolute inset-0`}>
      <svg
        className={`relative left-[6px] top-[6px] outline outline-2 outline-gray-200`}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        data-tid="control-point-stems"
      >
        {renderStems(points)}
      </svg>
    </div>
  )
}

ControlPointStems.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(typePoint)).isRequired,
  bounds: PropTypes.object,
}

export default ControlPointStems
