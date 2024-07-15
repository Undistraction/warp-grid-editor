import React from 'react'
import { isNil } from '../../../../../src/utils'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const BoundsSaver = ({ save }) => {
  const [name, setName] = React.useState(null)
  return (
    <div className="flex flex-col space-y-2 pt-3">
      <input
        className="border border-black px-2 py-1"
        type="text"
        onChange={(event) => setName(event.target.value)}
      ></input>
      <button
        className="rounded-md bg-black p-3 text-white disabled:bg-gray-300"
        onClick={() => save(name)}
        disabled={name === '' || isNil(name)}
      >
        Save
      </button>
    </div>
  )
}

export default BoundsSaver
