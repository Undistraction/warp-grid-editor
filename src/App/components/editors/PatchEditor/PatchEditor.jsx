import PropTypes from 'prop-types'
import React from 'react'

import { typeProject } from '../../../../prop-types'
import useAppStore from '../../../../state/useAppStore'
import { getBoundingCurvesCorners } from '../../../../utils/boundingCurves'
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
  const corners = getBoundingCurvesCorners(project.boundingCurves)

  return (
    <div className="flex flex-col space-y-3">
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
