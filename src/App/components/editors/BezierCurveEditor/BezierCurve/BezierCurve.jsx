import PropTypes from 'prop-types'
import React from 'react'

import { joinWithSpace } from '../../../../../utils/string'
import {
  getCubicBezierToPoint,
  getMoveForPoint,
} from '../../../../../utils/svg'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const BezierCurve = ({
  values: [v1, v2, v3, v4],
  bounds: { width, height },
}) => {
  const paths = React.useMemo(() => {
    const curve = {
      startPoint: { x: 0, y: height },
      controlPoint1: {
        x: v1 * width,
        y: (1 - v2) * height,
      },
      controlPoint2: { x: v3 * width, y: (1 - v4) * height },
      endPoint: { x: width, y: 0 },
    }
    return joinWithSpace([
      getMoveForPoint(curve.startPoint),
      getCubicBezierToPoint(curve),
    ])
  }, [v1, v2, v3, v4, width, height])

  return (
    <div className={`pointer-events-none absolute inset-0`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        data-tid="bezier-curve"
      >
        <path
          stroke="black"
          fill="transparent"
          d={paths}
        />
      </svg>
    </div>
  )
}

BezierCurve.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  bounds: PropTypes.object,
}

export default BezierCurve
