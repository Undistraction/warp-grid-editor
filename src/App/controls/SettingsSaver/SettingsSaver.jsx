import { isNil } from 'ramda'
import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SettingsSaver = ({ onSave }) => {
  const [id, setId] = React.useState(null)
  return (
    <div className="flex flex-col space-y-2 pt-3">
      <input
        className="border border-black px-2 py-1"
        type="text"
        onChange={(event) => setId(event.target.value)}
        placeholder="Name"
      ></input>
      <button
        className="rounded-md bg-black p-3 text-white disabled:bg-gray-300"
        onClick={() => onSave(id)}
        disabled={id === '' || isNil(id)}
      >
        Save settings
      </button>
    </div>
  )
}

export default SettingsSaver
