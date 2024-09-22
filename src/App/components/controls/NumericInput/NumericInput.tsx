import { useState } from 'react'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface NumericInputProps {
  value?: number | string
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  testId?: string
  name?: string
  id?: string
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function NumericInput({
  value = undefined,
  onChange,
  step = 1,
  min = undefined,
  max = undefined,
  testId = undefined,
  name = undefined,
}: NumericInputProps) {
  const [localValue, setLocalValue] = useState<string | null>(null)
  const resolvedValue = localValue === `` ? localValue : value

  return (
    <input
      className="min-h-8 w-full border border-black px-1 py-0.5 font-mono text-sm"
      type="number"
      name={name}
      value={resolvedValue}
      min={min}
      max={max}
      step={step}
      data-tid={testId}
      onChange={(event) => {
        const { value } = event.target
        if (value === ``) {
          setLocalValue(value)
        } else {
          const resolvedValue = parseFloat(value)
          setLocalValue(null)
          onChange(resolvedValue)
        }
      }}
    />
  )
}
