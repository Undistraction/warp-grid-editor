import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import PropTypes from 'prop-types'
import React from 'react'
// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarGroup = ({
  title,
  children,
  hint,
  isMinimised = false,
  onToggleMinimise,
  testId = ``,
}) => {
  const icon = isMinimised ? <ChevronDownIcon /> : <ChevronUpIcon />

  return (
    <div
      className="flex flex-col"
      data-tid={testId}
    >
      <header
        onClick={() => onToggleMinimise(!isMinimised)}
        className={`flex flex-col space-y-1 ${isMinimised ? `pt-2` : `py-2`}`}
        data-tid={`sidebar-group-header`}
      >
        <div className="flex cursor-pointer flex-row items-center justify-between">
          <h2 className="text-base font-bold">{title}</h2>
          <div className="h-[16px] w-[16px]">{icon}</div>
        </div>
        {hint && (
          <div
            className={`-m2-2 ${!isMinimised && `hidden`} text-sm italic text-gray-500`}
          >
            {hint}
          </div>
        )}
      </header>
      <div
        className="flex flex-col space-y-3"
        data-tid="sidebar-group-body"
      >
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
  isMinimised: PropTypes.bool,
  onToggleMinimise: PropTypes.func.isRequired,
  testId: PropTypes.string,
}

export default SidebarGroup
