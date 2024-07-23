import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Button = ({ label, onClick }) => {
  return (
    <button
      className="rounded-md bg-black p-3 text-white"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
