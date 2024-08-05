import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlGroup = ({
  children,
  label,
  labelIsAfter = false,
  direction = `horizontal`,
  isEven = false,
}) => {
  const labelChild = (
    <div
      key="label"
      className="text-sm"
    >
      {label}
    </div>
  )

  const labelAndControl = labelIsAfter
    ? [children, labelChild]
    : [labelChild, children]

  const className =
    direction === `vertical`
      ? `flex flex-col items-stretch space-y-1`
      : `flex cursor-pointer flex-row items-center space-x-3 ${isEven && `[&>*]:basis-1/2`}`

  return <div className={className}>{labelAndControl}</div>
}

ControlGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  labelIsAfter: PropTypes.bool,
  direction: PropTypes.string,
  isEven: PropTypes.bool,
}

export default ControlGroup
