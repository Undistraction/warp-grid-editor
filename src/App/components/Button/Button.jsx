import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Button = ({ label, onClick, className = ``, isDisabled = false }) => {
  return (
    <button
      disabled={isDisabled}
      className={`rounded-md p-2 ${className} ${isDisabled ? `bg-gray-400 text-gray-200` : `bg-black text-white`} `}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button
