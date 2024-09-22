import { PointPairs, Size } from '../../../../../types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ControlPointStemsProps {
  points: PointPairs
  bounds: Size
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderStems = (points: PointPairs) =>
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

const ControlPointStems = ({
  bounds: { width, height } = { width: 0, height: 0 },
  points,
}: ControlPointStemsProps) => {
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

export default ControlPointStems
