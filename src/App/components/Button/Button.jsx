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
}) => {
  const classNamesUnmerged = cls(
    `rounded-md px-4 py-2 border border-black text-white flex flex-row space-x-2 items-center flex justify-center`,
    {
      'bg-gray-400 text-gray-200': isDisabled,
      'bg-black text-white': !isDisabled && !isSelected,
      'bg-white text-black': isSelected && !isDisabled,
    }
  )
  const classNamesMerged = twMerge(className, classNamesUnmerged)

  return (
    <button
      disabled={isDisabled}
      className={classNamesMerged}
      onClick={onClick}
      data-tid={testId}
    >
      {icon && <div className="h-[16px] w-[16px]">{icon}</div>}
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
}

export default Button
