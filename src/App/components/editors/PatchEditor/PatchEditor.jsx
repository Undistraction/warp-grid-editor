import PropTypes from 'prop-types'
import React from 'react'

import { typeProject } from '../../../../prop-types'
import useAppStore from '../../../../state/useAppStore'
import { getRandomBoundingCurves } from '../../../../utils'
import { getBoundingCurvesCorners } from '../../../../utils/boundingCurves'
import Button from '../../Button'
import ControlGroup from '../../controls/ControlGroup'
import Switch from '../../controls/Switch'
import BoundsEditor from '../BoundsEditor'
import ControlPointEditor from '../ControlPointEditor'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const PatchEditor = ({ project, canvas, exportBounds }) => {
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
    <div className="flex flex-col space-y-3 p-2">
      <div className="flex space-x-3 [&>*]:basis-1/2">
        <Button
          label="Randomise"
          onClick={() => {
            const boundingCurves = getRandomBoundingCurves(canvas)
            setBoundingCurves(boundingCurves)
          }}
        />
        <Button
          label="Export"
          onClick={exportBounds}
        />
      </div>
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
          exportBounds={exportBounds}
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
  exportBounds: PropTypes.func.isRequired,
}

export default PatchEditor