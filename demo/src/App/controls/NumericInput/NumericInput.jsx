import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const NumericInput = ({ value, label, onChange }) => {
  return (
    <div className="flex max-w-28 cursor-pointer flex-row items-center space-x-2">
      <div>{label}</div>
      <input
        className="min-w-14 border border-black px-2 py-1"
        type="number"
        value={value}
        onChange={(event) => {
          onChange(event.target.value || 0)
        }}
      />
    </div>
  )
}

export default NumericInput
