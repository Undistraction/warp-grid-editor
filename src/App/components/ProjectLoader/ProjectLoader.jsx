import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Button'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderOptions = (options) => {
  return options.map(({ id, name }) => (
    <option
      value={id}
      key={id}
    >
      {name}
    </option>
  ))
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ProjectLoader = ({ loadProject, projects }) => {
  const [key, setKey] = React.useState(``)

  const options = [
    { id: `none`, value: `` },
    ...projects.map((project) => {
      return {
        id: project.id,
        name: project.name,
      }
    }),
  ]

  return (
    <div className="flex flex-row items-stretch space-x-1">
      <select
        name="projects"
        onChange={(event) => {
          setKey(event.target.value)
        }}
        className="min-w-14 flex-grow border border-black px-2 py-1"
      >
        {renderOptions(options)}
      </select>
      <Button
        label="Load"
        disabled={key === ``}
        onClick={() => {
          if (key !== ``) {
            loadProject(key)
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
