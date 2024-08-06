import PropTypes from 'prop-types'
import React from 'react'
import { typeProject } from '../../../prop-types'
import Button from '../Button'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectSaver = ({
  saveProject,
  saveProjectAs,
  setProjectName,
  project,
}) => {
  console.log(`Project name:`, project.meta.name)
  return (
    <div className="flex flex-row space-x-1">
      <div className="flex-grow">
        <input
          className="h-full w-full min-w-0 border border-black px-2 py-1"
          type="text"
          onChange={(event) => setProjectName(event.target.value)}
          value={project.meta.name}
          placeholder="Name"
        />
      </div>
      <Button
        label="Save"
        className="flex-shrink-0"
        onClick={() => saveProject(project)}
      />
      <Button
        label="Save As"
        className="flex-shrink-0"
        onClick={() => saveProjectAs(project)}
      />
    </div>
  )
}

ProjectSaver.propTypes = {
  saveProject: PropTypes.func.isRequired,
  setProjectName: PropTypes.func.isRequired,
  project: typeProject.isRequired,
}

export default ProjectSaver
