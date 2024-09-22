// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

interface SliderProps {
  value: number
  name: string
  min?: number
  max?: number
  onChange: (value: number) => void
  testId?: string
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Slider = ({
  value,
  name,
  min = 0,
  max = 1,
  onChange,
  testId = undefined,
}: SliderProps) => {
  return (
    <input
      className="grow"
      data-tid={testId}
      type="range"
      name={name}
      value={value}
      onChange={(event) => onChange(parseFloat(event.target.value))}
      min={min}
      max={max}
      step="any"
    />
  )
}

export default Slider
