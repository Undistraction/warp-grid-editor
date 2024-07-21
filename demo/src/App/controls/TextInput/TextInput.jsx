import React from 'react'
import { isNil } from '../../../../../src/utils/types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const TextInput = ({ value, label, onChange }) => {
  const [localValue, setLocalValue] = React.useState(null)
  const resolvedValue = !isNil(localValue) ? localValue : value
  return (
    <div className="flex cursor-pointer flex-row items-stretch justify-stretch space-x-1">
      <input
        className="min-w-14 flex-grow border border-black px-1 py-0.5 font-mono text-sm"
        type="text"
        value={resolvedValue}
        onChange={(event) => {
          const { value } = event.target
          console.log('Value', value)
          if (value === '' || value.endsWith(',') || value.endsWith(' ')) {
            console.log('LOCAL')
            setLocalValue(value)
          } else {
            console.log('NOT LOCAL')
            setLocalValue(null)
            onChange(value)
          }
        }}
      />
      <div className="min-w-[60px] text-sm">{label}</div>
    </div>
  )
}

export default TextInput
