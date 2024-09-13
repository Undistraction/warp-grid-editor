import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Switch = ({ isSelected, onChange, testId = undefined }) => {
  return (
    <div
      className="relative h-8 w-16 cursor-pointer border border-black"
      onClick={() => {
        onChange(!isSelected)
      }}
      data-tid={testId}
    >
      <input
        className="hidden"
        type="checkbox"
        checked={isSelected}
        readOnly
      />
      <div
        className={`absolute top-0 h-full w-1/2 border bg-white ${isSelected ? `right-0 border-l-black` : `left-0 border-r-black`} flex flex-col items-center justify-center`}
      >
        <div className="h-1/3 w-1/4 border border-l-black border-r-black"></div>
      </div>
    </div>
  )
}

Switch.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string,
}

export default Switch
