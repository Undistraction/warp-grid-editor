import PropTypes from 'prop-types'
import { isNumber } from 'ramda-adjunct'
import React from 'react'
import { typePoint } from '../../../../../prop-types'
import { roundToTwoPlaces } from '../../../../../utils/math'
import ControlGroup from '../../../controls/ControlGroup'
import NumericInput from '../../../controls/NumericInput'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const PositionInput = ({ label, point, onChange }) => {
  const x = isNumber(point?.x) ? roundToTwoPlaces(point?.x) : 0
  const y = isNumber(point?.y) ? roundToTwoPlaces(point?.y) : 0
  return (
    <div className="flex max-w-full flex-row space-x-2 [&>*]:basis-1/2">
      <div className="flex flex-row space-x-2">
        <ControlGroup label="X">
          <NumericInput
            label="X"
            value={x}
            onChange={(value) => {
              onChange({ ...point, x: value })
            }}
          />
        </ControlGroup>
        <ControlGroup
          label="Y"
          isEven
        >
          <NumericInput
            value={y}
            onChange={(value) => onChange({ ...point, y: value })}
          />
        </ControlGroup>
      </div>
    </div>
  )
}

PositionInput.propTypes = {
  label: PropTypes.string.isRequired,
  point: typePoint.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PositionInput
