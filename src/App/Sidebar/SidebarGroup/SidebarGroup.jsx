import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarGroup = ({ title, children, hint }) => {
  const [isMinimised, setIsMinised] = React.useState(false)
  const icon = isMinimised ? `+` : `-`

  return (
    <div className="flex flex-col space-y-2 pt-3">
      <header
        onClick={() => setIsMinised(!isMinimised)}
        className="flex cursor-pointer flex-row items-center justify-between"
      >
        <h2 className="text-sm font-bold">{title}</h2>
        <div>{icon}</div>
      </header>
      <div className="flex flex-col space-y-3">
        {hint && <div className="-m2-2 text-sm italic">{hint}</div>}
        <div className={`flex flex-col space-y-3 ${isMinimised && `hidden`}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

SidebarGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  hint: PropTypes.string,
}

export default SidebarGroup
