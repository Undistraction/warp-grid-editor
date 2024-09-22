// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type SwitchProps = {
  isSelected: boolean
  onChange: (value: boolean) => void
  testId?: string
  id?: string
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function Switch({
  isSelected,
  onChange,
  testId = undefined,
  id = undefined,
}: SwitchProps) {
  return (
    <div
      className="relative h-8 w-16 cursor-pointer border border-black"
      onClick={() => {
        onChange(!isSelected)
      }}
      data-tid={testId}
      id={id}
    >
      <input
        className="hidden"
        type="checkbox"
        checked={isSelected}
        readOnly
      />
      <div
        className={`absolute top-0 h-full w-1/2 border bg-white ${isSelected ? `right-0 border-l-black` : `left-0 border-r-black`} flex flex-col items-center justify-center`}
      >
        <div className="h-1/3 w-1/4 border border-x-black"></div>
      </div>
    </div>
  )
}
