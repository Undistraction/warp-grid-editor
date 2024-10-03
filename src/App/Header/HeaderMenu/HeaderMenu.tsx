import useModal from '../../../hooks/useModal'
import useAppStore from '../../../state/useAppStore'
import ButtonLink from '../../components/ButtonLink'
import ExportModalContent from '../../components/modals/content/ExportModalContent'
import LoadProjectModalContent from '../../components/modals/content/LoadProjectModalContent/LoadProjectModalContent'
import NewProjectModalContent from '../../components/modals/content/NewProjectModalContent'
import SaveProjectModalContent from '../../components/modals/content/SaveProjectModalContent'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function HeaderMenu() {
  const project = useAppStore.use.project()
  const saveProject = useAppStore.use.saveProject()
  const { openModal, Modal } = useModal()

  return (
    <div className="flex flex-row items-start space-x-2 sm:space-x-3">
      <ButtonLink
        label="New"
        testId="new-project-button"
        tooltipText="Open a new project from your browser's local storage"
        onClick={() => {
          openModal({
            Content: NewProjectModalContent,
          })
        }}
      />
      <ButtonLink
        label="Open"
        testId="load-project-button"
        tooltipText="Load a project from your browser's local storage"
        onClick={() => {
          openModal({ Content: LoadProjectModalContent })
        }}
      />
      <ButtonLink
        label="Save"
        testId="save-project-button"
        tooltipText="Save the current project to your browser's local storage"
        onClick={() => {
          if (project.meta.isSaved) {
            saveProject(project)
          } else {
            openModal({
              Content: SaveProjectModalContent,
            })
          }
        }}
      />
      <ButtonLink
        label="Save as"
        testId="save-project-as-button"
        tooltipText="Save a copy of the current project to your browser's local storage"
        onClick={() =>
          openModal({
            Content: SaveProjectModalContent,
          })
        }
      />
      <ButtonLink
        label="Export"
        testId="export-project-button"
        tooltipText="Export the current project's grid as either code or as and SVG"
        onClick={() => {
          openModal({ Content: ExportModalContent })
        }}
      />
      {Modal}
    </div>
  )
}
