import { ReactNode } from 'react'

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

export default function ButtonLink({
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
}: ButtonLinkProps) {
  const iconResolved = isSelected ? iconSelected : icon
  const labelResolved = isSelected ? labelSelected : label

  return (
    <button
      className={`flex flex-row items-center justify-center space-x-2 font-bold ${isDisabled ? `text-gray-300` : ``} ${className}`}
      onClick={() => {
        onClick(!isSelected)
      }}
      data-tid={testId}
      data-tooltip-id="default"
      data-tooltip-content={tooltipText}
      data-tooltip-delay-show={500}
      disabled={isDisabled}
    >
      {iconResolved && <div className="size-[16px]">{iconResolved}</div>}
      {labelResolved && <div>{labelResolved}</div>}
    </button>
  )
}
