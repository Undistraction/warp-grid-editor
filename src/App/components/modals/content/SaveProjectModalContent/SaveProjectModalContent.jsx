import PropTypes from 'prop-types'
import React from 'react'

import ProjectSaver from './ProjectSaver'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SaveProjectModalContent = ({ onClose }) => {
  return (
    <div
      className="p-5"
      data-tid="save-project-modal-content"
    >
      <ProjectSaver onSave={onClose} />
    </div>
  )
}

SaveProjectModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default SaveProjectModalContent
