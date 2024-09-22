import ProjectLoader from './ProjectLoader'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface LoadProjectModalContentProps {
  onClose: () => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const LoadProjectModalContent = ({ onClose }: LoadProjectModalContentProps) => {
  return (
    <div
      className="p-5"
      data-tid="load-project-modal-content"
    >
      <ProjectLoader onLoad={onClose} />
    </div>
  )
}

export default LoadProjectModalContent
