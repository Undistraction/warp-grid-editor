import ProjectExporter from './ProjectExporter'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function ExportModalContent() {
  return (
    <div
      className="p-5"
      data-tid="export-project-modal-content"
    >
      <ProjectExporter />
    </div>
  )
}
