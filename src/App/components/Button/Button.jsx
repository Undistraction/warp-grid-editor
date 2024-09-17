import cls from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { twMerge } from 'tailwind-merge'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Button = ({
  label = undefined,
  labelSelected = label,
  onClick,
  className = ``,
  isDisabled = false,
  isSelected = false,
  testId = ``,
  icon = undefined,
  iconSelected = undefined,
  tooltipText = undefined,
}) => {
  const classNamesUnmerged = cls(
    `rounded-md px-2 py-1 border flex flex-row space-x-2 items-center flex justify-center`,
    {
      'bg-white text-gray-400 border-gray-400': isDisabled,
      'bg-white text-black border-black ': !isDisabled && !isSelected,
      'bg-gray-100 text-black': isSelected && !isDisabled,
    }
  )
  const classNamesMerged = twMerge(className, classNamesUnmerged)

  const iconResolved = isSelected ? iconSelected : icon

  return (
    <button
      disabled={isDisabled}
      className={classNamesMerged}
      onClick={onClick}
      data-tid={testId}
      data-tooltip-id="default"
      data-tooltip-content={tooltipText}
      data-tooltip-delay-show={500}
    >
      {iconResolved && <div className="h-[16px] w-[16px]">{iconResolved}</div>}
      <div>{isSelected ? labelSelected : label}</div>
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  labelSelected: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  testId: PropTypes.string,
  icon: PropTypes.node,
  iconSelected: PropTypes.node,
  tooltipText: PropTypes.string,
}

export default Button
