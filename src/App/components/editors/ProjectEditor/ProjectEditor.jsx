import PropTypes from 'prop-types'
import React from 'react'

import useModal from '../../../../hooks/useModal.jsx'
import { typeProject } from '../../../../prop-types'
import Button from '../../Button'
import ExportModalContent from '../../modals/content/ExportModalContent'
import ProjectLoader from '../../ProjectLoader'
import ProjectSaver from '../../ProjectSaver'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectEditor = ({
  loadProject,
  saveProject,
  saveProjectAs,
  setProjectName,
  project,
  projects,
}) => {
  const { openModal, Modal } = useModal()

  return (
    <div className="flex flex-col space-y-1">
      <ProjectSaver
        saveProject={saveProject}
        setProjectName={setProjectName}
        saveProjectAs={saveProjectAs}
        project={project}
      />
      <ProjectLoader
        loadProject={loadProject}
        projects={projects}
      />
      <Button
        label="Export project"
        onClick={() => {
          openModal({ Content: ExportModalContent, props: { project } })
        }}
      />
      {Modal}
    </div>
  )
}

ProjectEditor.propTypes = {
  loadProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  saveProjectAs: PropTypes.func.isRequired,
  setProjectName: PropTypes.func.isRequired,
  project: typeProject.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProjectEditor
