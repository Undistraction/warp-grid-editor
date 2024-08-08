import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Button = ({
  label,
  onClick,
  className = ``,
  isDisabled = false,
  testId = ``,
}) => {
  return (
    <button
      disabled={isDisabled}
      className={`rounded-md p-2 ${isDisabled ? `bg-gray-400 text-gray-200` : `bg-black text-white`} ${className} `}
      onClick={onClick}
      data-tid={testId}
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
  testId: PropTypes.string,
}

export default Button
