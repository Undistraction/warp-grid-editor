import React, { ReactNode } from 'react'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ButtonLinkProps {
  label?: string
  labelSelected?: string
  isSelected?: boolean
  onClick: (isSelected: boolean) => void
  isDisabled?: boolean
  className?: string
  testId?: string
  icon?: ReactNode
  iconSelected?: ReactNode
  tooltipText?: string
}

// ----------------------------------------------------------------------------
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
  tooltipText = undefined,
}: ButtonLinkProps) => {
  const iconResolved = isSelected ? iconSelected : icon

  return (
    <button
      className={`blockfont-bold space-x -2 flex flex-row items-center justify-center ${isDisabled ? `text-gray-300` : ``} ${className}`}
      onClick={() => {
        onClick(!isSelected)
      }}
      data-tid={testId}
      data-tooltip-id="default"
      data-tooltip-content={tooltipText}
      data-tooltip-delay-show={500}
      disabled={isDisabled}
    >
      {iconResolved && <div className="h-[16px] w-[16px]">{iconResolved}</div>}
      <div>{isSelected ? labelSelected : label}</div>
    </button>
  )
}

export default ButtonLink
