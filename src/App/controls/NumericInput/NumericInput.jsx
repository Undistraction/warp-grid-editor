import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const NumericInput = ({ value, label, onChange }) => {
  const [localValue, setLocalValue] = React.useState(null)
  const resolvedValue = localValue === `` ? localValue : value
  return (
    <div className="flex max-w-24 cursor-pointer flex-row items-center space-x-1">
      <div className="text-sm">{label}</div>
      <input
        className="min-w-14 border border-black px-1 py-0.5 font-mono text-sm"
        type="number"
        value={resolvedValue}
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
    </div>
  )
}

NumericInput.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NumericInput
