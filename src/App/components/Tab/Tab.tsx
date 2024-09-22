import cls from 'classnames'
import { twMerge } from 'tailwind-merge'

// -----------------------------------------------------------------------------
// Tabs
// -----------------------------------------------------------------------------

interface TabProps {
  label?: string
  labelSelected?: string
  onClick: () => void
  className?: string
  isDisabled?: boolean
  isSelected?: boolean
  testId?: string
  icon?: React.ReactNode
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Tab = ({
  label = undefined,
  labelSelected = label,
  onClick,
  className = ``,
  isDisabled = false,
  isSelected = false,
  testId = ``,
  icon = undefined,
}: TabProps) => {
  const classNamesUnmerged = cls(
    `rounded-t-xl px-4 py-2 border border-b-transparent text-white flex flex-row space-x-2 items-center bg-white text-black flex justify-center relative -bottom-[1px]`,
    {
      'bg-gray-400 text-gray-200': isDisabled,
      'border-': !isSelected,
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

export default Tab
