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
      className="flex flex-col pt-3"
      data-tid={testId}
    >
      <header
        onClick={() => onToggleMinimise(!isMinimised)}
        className="flex cursor-pointer flex-row items-center justify-between"
      >
        <h2 className="text-base font-bold">{title}</h2>
        <div className="h-[16px] w-[16px]">{icon}</div>
      </header>
      <div className="flex flex-col space-y-3">
        {hint && (
          <div
            className={`-m2-2 ${!isMinimised && `hidden`} text-sm italic text-gray-500`}
          >
            {hint}
          </div>
        )}
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
