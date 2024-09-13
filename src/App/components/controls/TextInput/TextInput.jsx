import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const TextInput = ({ value, label, onChange, testId = undefined }) => {
  const [localValue, setLocalValue] = React.useState(null)
  const resolvedValue = !isNil(localValue) ? localValue : value
  return (
    <div className="flex cursor-pointer flex-row content-center items-center space-x-1">
      <input
        className="min-w-12 flex-grow border border-black px-2 py-1 font-mono"
        type="text"
        value={resolvedValue}
        data-tid={testId}
        onChange={(event) => {
          const { value } = event.target
          if (value === `` || value.endsWith(`,`) || value.endsWith(` `)) {
            setLocalValue(value)
          } else {
            setLocalValue(null)
            onChange(value)
          }
        }}
      />
      <div className="min-w-[70px]">{label}</div>
    </div>
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string,
}

export default TextInput
