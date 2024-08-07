import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'

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

const ProjectLoader = ({ loadProject, projects }) => {
  const [uuid, setUuid] = React.useState(``)

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
        onChange={(event) => {
          setUuid(event.target.value)
        }}
        className="min-w-14 flex-grow border border-black px-2 py-1"
      >
        {renderOptions(options)}
      </select>
      <Button
        label="Load"
        isDisabled={uuid === ``}
        onClick={() => {
          if (uuid !== ``) {
            loadProject(uuid)
          }
        }}
      />
    </div>
  )
}

ProjectLoader.propTypes = {
  loadProject: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
}

export default ProjectLoader
