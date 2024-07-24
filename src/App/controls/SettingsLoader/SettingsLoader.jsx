import PropTypes from 'prop-types'
import React from 'react'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderOptions = (options) => {
  return options.map(({ id, name }) => (
    <option
      value={id}
      key={id}
    >
      {name}
    </option>
  ))
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SettingsLoader = ({ onLoad, savedProjects }) => {
  const [key, setKey] = React.useState(``)

  const options = [
    { id: `none`, value: `` },
    ...savedProjects.map((project) => {
      return {
        id: project.id,
        name: project.name,
      }
    }),
  ]

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
        disabled={key === ``}
        onClick={() => {
          if (key !== ``) {
            onLoad(key)
          }
        }}
      >
        Load settings
      </button>
    </div>
  )
}

SettingsLoader.propTypes = {
  onLoad: PropTypes.func.isRequired,
  savedProjects: PropTypes.array.isRequired,
}

export default SettingsLoader
