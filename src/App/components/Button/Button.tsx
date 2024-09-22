import cls from 'classnames'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ButtonProps {
  label?: string
  labelSelected?: string
  onClick: () => void
  className?: string
  isDisabled?: boolean
  isSelected?: boolean
  testId?: string
  icon?: ReactNode
  iconSelected?: ReactNode
  tooltipText?: string
}

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
}: ButtonProps) => {
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

export default Button
