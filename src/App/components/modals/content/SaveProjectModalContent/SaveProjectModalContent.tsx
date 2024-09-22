import ProjectSaver from './ProjectSaver'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export interface SaveProjectModalContentProps {
  onClose: () => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function SaveProjectModalContent({
  onClose,
}: SaveProjectModalContentProps) {
  return (
    <div
      className="p-5"
      data-tid="save-project-modal-content"
    >
      <ProjectSaver onSave={onClose} />
    </div>
  )
}
