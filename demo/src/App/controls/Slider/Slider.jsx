// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Slider = ({ value, name, onChange, label }) => {
  return (
    <div className="flex flex-row space-x-2 align-middle">
      <div>{label}</div>
      <input
        className="flex-grow"
        type="range"
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min="0"
        max="1"
        step="any"
      />
    </div>
  )
}

export default Slider
