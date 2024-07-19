import React from 'react'
import { isNumber } from '../../../../../../src/utils/types'
import { roundToTwoPlaces } from '../../../../utils/math'
import NumericInput from '../../NumericInput'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const PositionInput = ({ label, point, onChange }) => {
  const x = isNumber(point?.x) ? roundToTwoPlaces(point?.x) : 0
  const y = isNumber(point?.y) ? roundToTwoPlaces(point?.y) : 0
  return (
    <div className="flex flex-row space-x-2">
      <div className="flex flex-row space-x-2">
        <NumericInput
          label="X"
          value={x}
          onChange={(value) => {
            onChange({ ...point, x: value })
          }}
        />
        <NumericInput
          label="Y"
          value={y}
          onChange={(value) => onChange({ ...point, y: value })}
        />
      </div>
      <h2 className="text-sm">{label}</h2>
    </div>
  )
}

export default PositionInput
