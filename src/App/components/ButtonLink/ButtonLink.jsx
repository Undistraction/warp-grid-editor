import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ButtonLink = ({
  label = undefined,
  labelSelected = label,
  isSelected = false,
  onClick,
  isDisabled = false,
  className = ``,
  testId = ``,
  icon = undefined,
  iconSelected = undefined,
}) => {
  const iconResolved = isSelected ? iconSelected : icon

  return (
    <button
      className={`blockfont-bold space-x -2 flex flex-row items-center justify-center ${isDisabled && `text-gray-300`} ${className}`}
      onClick={() => {
        onClick(!isSelected)
      }}
      data-tid={testId}
    >
      {iconResolved && <div className="h-[16px] w-[16px]">{iconResolved}</div>}
      <div>{isSelected ? labelSelected : label}</div>
    </button>
  )
}

ButtonLink.propTypes = {
  label: PropTypes.string,
  labelSelected: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  testId: PropTypes.string,
  icon: PropTypes.node,
  iconSelected: PropTypes.node,
}

export default ButtonLink
