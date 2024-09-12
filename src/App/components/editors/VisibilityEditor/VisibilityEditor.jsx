import React from 'react'

import { typeProject } from '../../../../prop-types'
import useAppStore from '../../../../state/useAppStore'
import ControlGroup from '../../controls/ControlGroup'
import Switch from '../../controls/Switch'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const VisibilityEditor = ({ project }) => {
  const setProjectConfigValue = useAppStore.use.setProjectConfigValue()
  return (
    <div className="flex flex-col space-y-3">
      <ControlGroup
        label="Show Bounds"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.bounds.shouldDrawBounds}
          onChange={setProjectConfigValue([`bounds`, `shouldDrawBounds`])}
        />
      </ControlGroup>
      <ControlGroup
        label="Show corner points"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.bounds.shouldDrawCornerPoints}
          onChange={setProjectConfigValue([`bounds`, `shouldDrawCornerPoints`])}
        />
      </ControlGroup>
      <ControlGroup
        label="Show intersections"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.grid.shouldDrawIntersections}
          onChange={setProjectConfigValue([`grid`, `shouldDrawIntersections`])}
        />
      </ControlGroup>
      <ControlGroup
        label="Show grid"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.grid.shouldDrawGrid}
          onChange={setProjectConfigValue([`grid`, `shouldDrawGrid`])}
        />
      </ControlGroup>
    </div>
  )
}

VisibilityEditor.propTypes = {
  project: typeProject.isRequired,
}

export default VisibilityEditor
