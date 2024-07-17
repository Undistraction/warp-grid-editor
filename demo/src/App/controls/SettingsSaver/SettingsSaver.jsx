import React from 'react'
import { isNil } from '../../../../../src/utils/types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SettingsSaver = ({ onSave }) => {
  const [name, setName] = React.useState(null)
  return (
    <div className="flex flex-col space-y-2 pt-3">
      <input
        className="border border-black px-2 py-1"
        type="text"
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
      ></input>
      <button
        className="rounded-md bg-black p-3 text-white disabled:bg-gray-300"
        onClick={() => onSave(name)}
        disabled={name === '' || isNil(name)}
      >
        Save settings
      </button>
    </div>
  )
}

export default SettingsSaver
