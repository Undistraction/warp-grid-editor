import React from 'react'
import PositionInput from './PositionInput'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const NodeEditor = ({
  title,
  cornerPoint,
  controlPoint1,
  controlPoint2,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-sm font-bold">{title}</h2>
      <div className="flex flex-col space-y-2">
        <PositionInput
          label="Corner"
          point={cornerPoint.point}
          onChange={onChange(cornerPoint.id)}
        />
        <PositionInput
          label="Control 1"
          point={controlPoint1.point}
          onChange={onChange(controlPoint1.id)}
        />
        <PositionInput
          label="Control 2"
          point={controlPoint2.point}
          onChange={onChange(controlPoint2.id)}
        />
      </div>
    </div>
  )
}

export default NodeEditor
