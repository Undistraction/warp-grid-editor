import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const IconButton = ({
  label,
  labelSelected,
  isSelected = false,
  onClick,
  isSelectable = false,
  isDisabled = false,
}) => {
  return (
    <button
      className={`font-bold ${isDisabled && `text-gray-300`}`}
      onClick={() => {
        if (isSelectable) {
          onClick(!isSelected)
        } else {
          onClick()
        }
      }}
    >
      {isSelected ? labelSelected : label}
    </button>
  )
}

IconButton.propTypes = {
  label: PropTypes.string.isRequired,
  labelSelected: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isSelectable: PropTypes.bool,
  isDisabled: PropTypes.bool,
}

export default IconButton
