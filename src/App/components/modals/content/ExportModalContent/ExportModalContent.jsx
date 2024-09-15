import React from 'react'

import { typeProject } from '../../../../../prop-types'
import ProjectExporter from './ProjectExporter'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ExportModalContent = () => {
  return (
    <div
      className="p-5"
      data-tid="export-project-modal-content"
    >
      <ProjectExporter />
    </div>
  )
}

ExportModalContent.propTypes = {
  project: typeProject.isRequired,
}

export default ExportModalContent
