import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Slider = ({
  value,
  name,
  min = 0,
  max = 1,
  onChange,
  testId = undefined,
}) => {
  return (
    <input
      className="flex-grow"
      data-tid={testId}
      type="range"
      name={name}
      value={value}
      onChange={(event) => onChange(parseFloat(event.target.value))}
      min={min}
      max={max}
      step="any"
    />
  )
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  testId: PropTypes.string,
}

export default Slider
