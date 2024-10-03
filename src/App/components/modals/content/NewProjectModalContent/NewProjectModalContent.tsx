import { useState } from 'react'

import useAppStore from '../../../../../state/useAppStore'
import ProjectSaver from '../SaveProjectModalContent/ProjectSaver'
import YesNoDialogue from './YesNoDialogue'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export interface NewProjectModalContentProps {
  onClose: () => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function NewProjectModalContent({
  onClose,
}: NewProjectModalContentProps) {
  const newProject = useAppStore.use.newProject()
  const saveProject = useAppStore.use.newProject()
  const [showSaver, setShowSaver] = useState(false)
  const project = useAppStore.use.project()

  return (
    <div
      className="p-5"
      data-tid="save-project-modal-content"
    >
      {showSaver ? (
        <ProjectSaver
          onSave={() => {
            newProject()
            onClose()
          }}
        />
      ) : (
        <YesNoDialogue
          onNo={() => {
            newProject()
            onClose()
          }}
          onYes={() => {
            if (project.meta.isSaved) {
              saveProject(project)
              onClose()
            } else {
              setShowSaver(true)
            }
          }}
        />
      )}
    </div>
  )
}
