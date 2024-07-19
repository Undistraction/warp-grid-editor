import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Button = ({ label, labelSelected, isSelected, onClick }) => {
  return (
    <button
      className="font-bold"
      onClick={() => onClick(isSelected)}
    >
      {isSelected ? labelSelected : label}
    </button>
  )
}

export default Button
