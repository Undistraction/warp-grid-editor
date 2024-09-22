import useAppStore from '../../../../state/useAppStore'
import type { Project } from '../../../../types'
import ControlGroup from '../../controls/ControlGroup'
import Switch from '../../controls/Switch'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface VisibilityEditorProps {
  project: Project
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function VisibilityEditor({ project }: VisibilityEditorProps) {
  const setProjectConfigValue = useAppStore.use.setProjectConfigValue()
  return (
    <div className="flex flex-col space-y-3">
      <ControlGroup
        label="Show Bounds"
        tooltipText="Display the outline of the grid"
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
        tooltipText="Display the corner points of the grid"
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
        tooltipText="Display the intersections between the grid lines"
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
        tooltipText="Display the grid itself"
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
