import { isInteger, isString } from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type OptionObj = string | number | { value: number | string; label: string }

interface SteppedInputProps {
  onChange: (value: string) => void
  value?: number | string
  options: Array<string | OptionObj>
  name: string
  testId?: string
}

type Option = string | number | OptionObj

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getOption = (option: number | string | OptionObj) => {
  if (isString(option) || isInteger(option)) {
    const keyRoot = option === `` ? `unknown` : option
    return {
      value: option,
      key: `option-${keyRoot.toString().replace(/\s/g, ``)}`,
      label: option,
    }
  } else {
    return {
      value: option.value,
      key: `option-${option.value.toString().replace(/\s/g, ``)}`,
      label: option.label,
    }
  }
}

const renderOptions = (options: Option[]) => {
  return options.map((option) => {
    const { value, label, key } = getOption(option)
    return (
      <option
        value={value}
        key={key}
      >
        {label}
      </option>
    )
  })
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SteppedInput = ({
  onChange,
  value = undefined,
  options,
  name,
  testId = undefined,
}: SteppedInputProps) => {
  return (
    <select
      data-tid={testId}
      name={name}
      onChange={(event) => {
        const targetValue: Option = event.target.value
        const value = targetValue
        onChange(value)
      }}
      value={value}
      className="min-w-14 border border-black py-1 pl-1 font-mono"
    >
      {renderOptions(options)}
    </select>
  )
}

export default SteppedInput
