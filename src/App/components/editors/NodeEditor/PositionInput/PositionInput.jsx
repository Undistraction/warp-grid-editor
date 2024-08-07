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

const PositionInput = ({ point, onChange }) => {
  const x = isNumber(point?.x) ? roundToTwoPlaces(point?.x) : 0
  const y = isNumber(point?.y) ? roundToTwoPlaces(point?.y) : 0
  return (
    <div className="flex max-w-full flex-row space-x-2">
      <div className="flex max-w-full flex-row space-x-2 [&>*]:basis-1/2">
        <ControlGroup label="X">
          <div className="">
            <NumericInput
              value={x}
              onChange={(value) => {
                onChange({ ...point, x: value })
              }}
            />
          </div>
        </ControlGroup>
        <ControlGroup label="Y">
          <div className="">
            <NumericInput
              value={y}
              onChange={(value) => onChange({ ...point, y: value })}
            />
          </div>
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
