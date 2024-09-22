import { map } from 'ramda'
import { useState } from 'react'

import useAppStore from '../../../../../../state/useAppStore'
import { Projects } from '../../../../../../types'
import Button from '../../../../Button'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ProjectLoaderProps {
  onLoad: () => void
}

export interface Option {
  id?: string
  name: string
  uuid: string
  key?: string
}

export type Options = Option[]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderOptions = (options: Options) =>
  options.map(({ uuid, name, key }) => (
    <option
      value={uuid}
      key={uuid || key}
    >
      {name}
    </option>
  ))

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectLoader = ({ onLoad }: ProjectLoaderProps) => {
  const [uuid, setUuid] = useState<string>(``)
  const loadProject = useAppStore.use.loadProject()
  const projects: Projects = useAppStore.use.projects()

  const options: Options = [
    { id: `none`, name: `Choose project`, uuid: ``, key: `default` },
    ...map((project) => {
      return project.meta
    }, projects),
  ]

  return (
    <div className="flex flex-row items-stretch space-x-1">
      <select
        name="projects"
        data-tid="project-loader-select"
        onChange={(event) => {
          setUuid(event.target.value)
        }}
        className="min-w-14 flex-grow border border-black px-2 py-1"
      >
        {renderOptions(options)}
      </select>
      <Button
        label="Open"
        testId="project-loader-load-button"
        isDisabled={uuid === ``}
        onClick={() => {
          if (uuid !== ``) {
            loadProject(uuid)
            onLoad()
          }
        }}
      />
    </div>
  )
}

export default ProjectLoader
