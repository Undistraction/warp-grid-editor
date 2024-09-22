import { isNumber } from 'ramda-adjunct'

// eslint-disable-next-line import/named
import { Point } from '../../../../../types'
import { roundToTwoPlaces } from '../../../../../utils/math'
import ControlGroup from '../../../controls/ControlGroup'
import NumericInput from '../../../controls/NumericInput'
// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface PositionInputProps {
  point: Point
  onChange: (point: Point) => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const PositionInput = ({ point, onChange }: PositionInputProps) => {
  const x = isNumber(point?.x) ? roundToTwoPlaces(point?.x) : 0
  const y = isNumber(point?.y) ? roundToTwoPlaces(point?.y) : 0
  return (
    <div className="flex max-w-full flex-row space-x-2">
      <div className="flex max-w-full flex-row space-x-2 [&>*]:basis-1/2">
        <ControlGroup
          label="X"
          tooltipText="The position along the horizontal axis"
          labelIsAfter
        >
          <div className="">
            <NumericInput
              value={x}
              onChange={(value) => {
                onChange({ ...point, x: value })
              }}
            />
          </div>
        </ControlGroup>
        <ControlGroup
          label="Y"
          tooltipText="The position along the vertical axis"
          labelIsAfter
        >
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

export default PositionInput
