import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const NumericInput = ({
  value = undefined,
  onChange,
  step = 1,
  min = undefined,
  max = undefined,
  testId = undefined,
  name = undefined,
}) => {
  const [localValue, setLocalValue] = React.useState(null)
  const resolvedValue = localValue === `` ? localValue : value

  return (
    <input
      className="min-width-0 min-h-8 w-full border border-black px-1 py-0.5 font-mono text-sm"
      type="number"
      name={name}
      value={resolvedValue}
      min={min}
      max={max}
      step={step}
      data-tid={testId}
      onChange={(event) => {
        const { value } = event.target
        if (value === ``) {
          setLocalValue(value)
        } else {
          const resolvedValue = parseFloat(value)
          setLocalValue(null)
          onChange(resolvedValue)
        }
      }}
    />
  )
}

NumericInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  testId: PropTypes.string,
  name: PropTypes.string,
}

export default NumericInput
