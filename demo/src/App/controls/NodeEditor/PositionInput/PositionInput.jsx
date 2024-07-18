import React from 'react'
import NumericInput from '../../NumericInput'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const PositionInput = ({ label, point, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-sm">{label}</h2>
      <div className="flex flex-row space-x-2">
        <NumericInput
          label="X"
          value={point?.x}
          onChange={(value) => {
            onChange({ ...point, x: value })
          }}
        />
        <NumericInput
          label="Y"
          value={point?.y}
          onChange={(value) => onChange({ ...point, y: value })}
        />
      </div>
    </div>
  )
}

export default PositionInput
