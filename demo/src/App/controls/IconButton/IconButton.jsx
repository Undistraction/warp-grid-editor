import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const IconButton = ({
  label,
  labelSelected,
  isSelected,
  onClick,
  isSelectable,
  isDisabled,
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

export default IconButton
