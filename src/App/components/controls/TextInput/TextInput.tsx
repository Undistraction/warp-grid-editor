import { isNil } from 'ramda'
import { useState } from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

interface TextInputProps {
  value: string | number
  onChange: (value: string) => void
  testId?: string
  inputClassName?: string
  pattern?: string
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function TextInput({
  value,
  onChange,
  testId = undefined,
  inputClassName,
}: TextInputProps) {
  const [localValue, setLocalValue] = useState<string | null>(null)
  const resolvedValue = !isNil(localValue) ? localValue : value
  return (
    <div className="flex cursor-pointer flex-row content-center items-center space-x-1">
      <input
        className={`min-w-12 grow border border-black px-2 py-1 font-mono ${inputClassName}`}
        type="text"
        value={resolvedValue}
        data-tid={testId}
        onChange={(event) => {
          const { value } = event.target
          if (value === `` || value.endsWith(`,`) || value.endsWith(` `)) {
            setLocalValue(value)
          } else {
            setLocalValue(null)
            onChange(value)
          }
        }}
      />
    </div>
  )
}
