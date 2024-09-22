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

export default ExportModalContent
