import useAppStore from '../../../../../../state/useAppStore'
import Button from '../../../../Button'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ProjectSaverProps {
  onSave: () => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectSaver = ({ onSave }: ProjectSaverProps) => {
  const saveProjectAs = useAppStore.use.saveProjectAs()
  const setName = useAppStore.use.setName()
  const project = useAppStore.use.project()

  return (
    <div className="flex flex-row space-x-1">
      <div className="flex-grow">
        <input
          className="h-full w-full min-w-0 border border-black px-2 py-1"
          data-tid="project-saver-name-input"
          type="text"
          onChange={(event) => setName(event.target.value)}
          value={project.meta.name}
          placeholder="Name"
        />
      </div>
      <Button
        label="Save"
        className="flex-shrink-0"
        testId="project-saver-save-button"
        onClick={() => {
          saveProjectAs(project)
          onSave()
        }}
      />
    </div>
  )
}

export default ProjectSaver
