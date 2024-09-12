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
          testId="show-bounds-switch"
          onChange={setProjectConfigValue([`bounds`, `shouldDrawBounds`])}
        />
      </ControlGroup>
      <ControlGroup
        label="Show corner points"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.bounds.shouldDrawCornerPoints}
          testId="show-corner-points-switch"
          onChange={setProjectConfigValue([`bounds`, `shouldDrawCornerPoints`])}
        />
      </ControlGroup>
      <ControlGroup
        label="Show intersections"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.grid.shouldDrawIntersections}
          testId="show-intersections-switch"
          onChange={setProjectConfigValue([`grid`, `shouldDrawIntersections`])}
        />
      </ControlGroup>
      <ControlGroup
        label="Show grid"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.grid.shouldDrawGrid}
          testId="show-grid-switch"
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
