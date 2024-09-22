// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import { ReactNode } from 'react'

interface ControlGroupProps {
  children: ReactNode
  label: string
  labelIsAfter?: boolean
  direction?: string
  isEven?: boolean
  testId?: string
  tooltipText?: string
  htmlFor?: string
  labelClassName?: string
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlGroup = ({
  children,
  label,
  labelIsAfter = false,
  direction = `horizontal`,
  isEven = false,
  testId = undefined,
  tooltipText = undefined,
  htmlFor = undefined,
  labelClassName = ``,
}: ControlGroupProps) => {
  const labelChild = (
    <label
      key="label"
      data-tooltip-id="default"
      data-tooltip-content={tooltipText}
      data-tooltip-delay-show={500}
      htmlFor={htmlFor}
      className={`flex flex-row items-center justify-between space-x-1 ${labelClassName}`}
    >
      <div className="text-sm">{label}</div>
    </label>
  )

  const labelAndControl = labelIsAfter
    ? [children, labelChild]
    : [labelChild, children]

  const className =
    direction === `vertical`
      ? `flex flex-col items-stretch space-y-1`
      : `flex flex-row items-center space-x-2 ${isEven && `[&>*]:basis-1/2`}`

  return (
    <div
      data-tid={testId}
      className={className}
    >
      {labelAndControl}
    </div>
  )
}

export default ControlGroup
