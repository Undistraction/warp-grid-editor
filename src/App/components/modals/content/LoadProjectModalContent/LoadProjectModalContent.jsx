import PropTypes from 'prop-types'
import React from 'react'

import ProjectLoader from './ProjectLoader'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const LoadProjectModalContent = ({ onClose }) => {
  return (
    <div
      className="p-5"
      data-tid="load-project-modal-content"
    >
      <ProjectLoader onLoad={onClose} />
    </div>
  )
}

LoadProjectModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default LoadProjectModalContent
