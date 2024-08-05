import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const NumericInput = ({ value, onChange, step = 1, min = undefined }) => {
  const [localValue, setLocalValue] = React.useState(null)
  const resolvedValue = localValue === `` ? localValue : value

  return (
    <input
      className="min-h-8 min-w-14 border border-black px-1 py-0.5 font-mono text-sm"
      type="number"
      value={resolvedValue}
      min={min}
      step={step}
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
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  step: PropTypes.number,
}

export default NumericInput
