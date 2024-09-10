import PropTypes from 'prop-types'
import React from 'react'

import { typeProject } from '../../../../prop-types'
import useAppStore from '../../../../state/useAppStore'
import { getBoundingCurvesCorners } from '../../../../utils/boundingCurves'
import { getRandomBoundingCurves } from '../../../../utils/random'
import Button from '../../Button'
import ControlGroup from '../../controls/ControlGroup'
import Switch from '../../controls/Switch'
import BoundsEditor from '../BoundsEditor'
import ControlPointEditor from '../ControlPointEditor'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const PatchEditor = ({ project, canvas }) => {
  const setBoundingCurves = useAppStore.use.setBoundingCurves()
  const zeroControlPoints = useAppStore.use.zeroControlPoints()
  const linkControlPoints = useAppStore.use.linkControlPoints()
  const mirrorControlPoints = useAppStore.use.mirrorControlPoints()
  const zeroControlPointsGlobal = useAppStore.use.zeroControlPointsGlobal()
  const linkControlPointsGlobal = useAppStore.use.linkControlPointsGlobal()
  const mirrorControlPointsGlobal = useAppStore.use.mirrorControlPointsGlobal()
  const updateBoundingCurvesNodePosition =
    useAppStore.use.updateBoundingCurvesNodePosition()
  const setProjectConfigValue = useAppStore.use.setProjectConfigValue()
  const corners = getBoundingCurvesCorners(project.boundingCurves)

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-x-3 [&>*]:basis-1/2">
        <Button
          label="Randomise"
          onClick={() => {
            const boundingCurves = getRandomBoundingCurves(canvas)
            setBoundingCurves(boundingCurves)
          }}
        />
      </div>
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
      <ControlPointEditor
        zeroControlPoints={zeroControlPointsGlobal}
        linkControlPoints={linkControlPointsGlobal}
        mirrorControlPoints={mirrorControlPointsGlobal}
        controlNodesAreLinked={project.config.bounds.isLinked}
        controlNodesAreMirrored={project.config.bounds.isMirrored}
      />
      {project.boundingCurves && (
        <BoundsEditor
          config={project.config}
          corners={corners}
          updateBoundingCurvesNodePosition={updateBoundingCurvesNodePosition}
          linkControlPoints={linkControlPoints}
          zeroControlPoints={zeroControlPoints}
          mirrorControlPoints={mirrorControlPoints}
        />
      )}
    </div>
  )
}

PatchEditor.propTypes = {
  project: typeProject,
  canvas: PropTypes.object.isRequired,
}

export default PatchEditor
