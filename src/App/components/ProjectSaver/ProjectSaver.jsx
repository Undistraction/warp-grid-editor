import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import React from 'react'
import Button from '../Button'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectSaver = ({ saveProject }) => {
  const [id, setId] = React.useState(null)
  return (
    <div className="flex flex-row space-x-1">
      <input
        className="flex-grow border border-black px-2 py-1"
        type="text"
        onChange={(event) => setId(event.target.value)}
        placeholder="Name"
      ></input>
      <Button
        label="Save"
        onClick={() => saveProject(id)}
        disabled={id === `` || isNil(id)}
      />
    </div>
  )
}

ProjectSaver.propTypes = {
  saveProject: PropTypes.func.isRequired,
}

export default ProjectSaver
