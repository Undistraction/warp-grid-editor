import PropTypes from 'prop-types'
import { isInteger } from 'ramda-adjunct'
import React from 'react'
import { INTERPOLATION_STRATEGY, LINE_STRATEGY } from '../../../const'
import { typeGrid } from '../../../prop-types'
import NumericInput from '../NumericInput'
import SteppedInput from '../SteppedInput'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const INTERPOLATION_STRATEGY_OPTIONS = [
  {
    label: `Even`,
    value: INTERPOLATION_STRATEGY.EVEN,
  },
  {
    label: `Linear`,
    value: INTERPOLATION_STRATEGY.LINEAR,
  },
]

export const LINE_STRATEGY_OPTIONS = [
  {
    label: `Curves`,
    value: LINE_STRATEGY.CURVES,
  },
  {
    label: `Straight lines`,
    value: LINE_STRATEGY.STRAIGHT_LINES,
  },
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderCurvesConfig = (grid, setGrid) => {
  return (
    <React.Fragment>
      <SteppedInput
        label="Interpolation type"
        value={grid.interpolationStrategy}
        options={INTERPOLATION_STRATEGY_OPTIONS}
        onChange={(interpolationStrategy) => {
          setGrid({
            ...grid,
            interpolationStrategy,
          })
        }}
      />
      {grid.interpolationStrategy === INTERPOLATION_STRATEGY.EVEN && (
        <NumericInput
          label="Precision"
          labelIsAfter
          value={grid.precision}
          min={1}
          onChange={(value) => {
            if (isInteger(value)) {
              setGrid({ ...grid, precision: value })
            }
          }}
        />
      )}
    </React.Fragment>
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ConfigEditor = ({ grid, setGrid }) => {
  return (
    <div className="flex flex-col items-start space-y-3">
      <SteppedInput
        label="Line type"
        value={grid.lineStrategy}
        options={LINE_STRATEGY_OPTIONS}
        onChange={(lineStrategy) => {
          setGrid({
            ...grid,
            lineStrategy,
          })
        }}
      />
      {grid.lineStrategy === LINE_STRATEGY.CURVES &&
        renderCurvesConfig(grid, setGrid)}
    </div>
  )
}

ConfigEditor.propTypes = {
  grid: typeGrid.isRequired,
  setGrid: PropTypes.func.isRequired,
}

export default ConfigEditor
