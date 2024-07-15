// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderOptions = (options) => {
  return options.map((value) => {
    return (
      <option
        value={value}
        key={`option-${value}`}
      >
        {value}
      </option>
    )
  })
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SteppedInput = ({ onChange, value, label, options }) => {
  return (
    <div className="flex flex-row space-x-2">
      <select
        name="columns"
        onChange={(event) => onChange(parseInt(event.target.value))}
        value={value}
        className="border border-black py-1 px-2 min-w-14"
      >
        {renderOptions(options)}
      </select>
      <div>{label}</div>
    </div>
  )
}

export default SteppedInput
