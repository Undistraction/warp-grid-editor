// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

import React from 'react'

const renderOptions = (options) => {
  return options.map((value) => {
    const key = `option-${value.replace(/\s/g, '')}`
    return (
      <option
        value={value}
        key={key}
      >
        {value}
      </option>
    )
  })
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SettingsLoader = ({ onLoad, savedBounds }) => {
  const [key, setKey] = React.useState('')
  const keys = Object.keys(savedBounds)
  const options = ['', ...keys]

  return (
    <div className="flex flex-col space-y-2">
      <select
        name="columns"
        onChange={(event) => {
          setKey(event.target.value)
        }}
        className="min-w-14 border border-black px-2 py-1"
      >
        {renderOptions(options)}
      </select>
      <button
        className="rounded-md bg-black p-3 text-white disabled:bg-gray-300"
        disabled={key === ''}
        onClick={() => {
          if (key !== '') {
            onLoad(key)
          }
        }}
      >
        Load settings
      </button>
    </div>
  )
}

export default SettingsLoader
