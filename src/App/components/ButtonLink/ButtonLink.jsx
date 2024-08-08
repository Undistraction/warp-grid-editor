import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ButtonLink = ({
  label,
  labelSelected,
  isSelected = false,
  onClick,
  isSelectable = false,
  isDisabled = false,
  className = ``,
}) => {
  return (
    <button
      className={`font-bold ${isDisabled && `text-gray-300`} ${className}`}
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

ButtonLink.propTypes = {
  label: PropTypes.string.isRequired,
  labelSelected: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isSelectable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

export default ButtonLink
