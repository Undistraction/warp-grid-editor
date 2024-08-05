import PropTypes from 'prop-types'
import React from 'react'
import ProjectLoader from '../../ProjectLoader'
import ProjectSaver from '../../ProjectSaver'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectEditor = ({
  loadProject,
  saveProject,
  project = undefined,
  projects = undefined,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <ProjectLoader
        loadProject={loadProject}
        projects={projects}
      />
      <ProjectSaver
        saveProject={saveProject}
        project={project}
      />
    </div>
  )
}

ProjectEditor.propTypes = {
  loadProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  project: PropTypes.object,
  projects: PropTypes.arrayOf(PropTypes.object),
}

export default ProjectEditor
