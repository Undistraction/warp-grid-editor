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

export default function LoadProjectModalContent({
  onClose,
}: LoadProjectModalContentProps) {
  return (
    <div
      className="p-5"
      data-tid="load-project-modal-content"
    >
      <ProjectLoader onLoad={onClose} />
    </div>
  )
}
