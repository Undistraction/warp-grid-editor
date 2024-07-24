import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Switch = ({ isSelected, label, onChange }) => {
  return (
    <div className="flex cursor-pointer flex-row items-center space-x-2">
      <div
        className="relative h-8 w-16 bg-black"
        onClick={() => {
          onChange(!isSelected)
        }}
      >
        <div
          className={`absolute top-0 h-full w-1/2 border border-black bg-white ${isSelected ? `right-0` : `left-0`} flex flex-col items-center justify-center`}
        >
          <div className="h-1/3 w-1/4 border border-l-black border-r-black"></div>
        </div>
      </div>
      <div>{label}</div>
    </div>
  )
}

Switch.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Switch
