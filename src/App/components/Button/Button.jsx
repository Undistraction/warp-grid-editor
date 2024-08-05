import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Button = ({ label, onClick }) => {
  return (
    <button
      className="rounded-md bg-black p-2 text-white"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
