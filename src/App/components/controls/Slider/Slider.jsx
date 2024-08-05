import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Slider = ({ value, name, onChange }) => {
  return (
    <input
      className="flex-grow"
      type="range"
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      min="0"
      max="1"
      step="any"
    />
  )
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default Slider
