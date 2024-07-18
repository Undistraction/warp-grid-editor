import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Switch = ({ isSelected, label, onChange }) => {
  return (
    <div className="flex cursor-pointer flex-row space-x-2 align-middle">
      <div
        className="relative h-8 w-16 bg-black"
        onClick={() => {
          onChange(!isSelected)
        }}
      >
        <div
          className={`absolute top-0 h-full w-1/2 border border-black bg-white ${isSelected ? `right-0` : `left-0`}`}
        ></div>
      </div>
      <div>{label}</div>
    </div>
  )
}

export default Switch
