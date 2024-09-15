import PropTypes from 'prop-types'
import React from 'react'

import useAppStore from '../../../../../../state/useAppStore'
import Button from '../../../../Button'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderOptions = (options) =>
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

const ProjectLoader = ({ onLoad }) => {
  const [uuid, setUuid] = React.useState(``)
  const loadProject = useAppStore.use.loadProject()
  const projects = useAppStore.use.projects()

  const options = [
    { id: `none`, name: `Choose project`, uuid: ``, key: `default` },
    ...projects.map((project) => {
      return project.meta
    }),
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

ProjectLoader.propTypes = {
  onLoad: PropTypes.func.isRequired,
}

export default ProjectLoader
