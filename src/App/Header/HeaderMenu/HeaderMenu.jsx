import React from 'react'

import useModal from '../../../hooks/useModal.jsx'
import useAppStore from '../../../state/useAppStore'
import ButtonLink from '../../components/ButtonLink'
import ExportModalContent from '../../components/modals/content/ExportModalContent'
import LoadProjectModalContent from '../../components/modals/content/LoadProjectModalContent/LoadProjectModalContent.jsx'
import SaveProjectModalContent from '../../components/modals/content/SaveProjectModalContent'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const HeaderMenu = () => {
  const { project } = useAppStore((state) => state)
  const saveProject = useAppStore.use.saveProject()
  const { openModal, Modal } = useModal()

  return (
    <div className="flex flex-row items-start space-x-3">
      <ButtonLink
        label="Open"
        testId="load-project-button"
        onClick={() => {
          openModal({ Content: LoadProjectModalContent, props: { project } })
        }}
      />
      <ButtonLink
        label="Save"
        testId="save-project-button"
        onClick={() => {
          console.log(project)
          if (project.meta.isSaved) {
            saveProject(project)
          } else {
            openModal({
              Content: SaveProjectModalContent,
              props: { project },
            })
          }
        }}
      />
      <ButtonLink
        label="Save as"
        testId="save-project-as-button"
        onClick={() =>
          openModal({
            Content: SaveProjectModalContent,
            props: { project },
          })
        }
      />
      <ButtonLink
        label="Export"
        testId="export-project-button"
        onClick={() => {
          openModal({ Content: ExportModalContent, props: { project } })
        }}
      />
      {Modal}
    </div>
  )
}

export default HeaderMenu
