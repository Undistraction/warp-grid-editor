import useAppStore from '../../../../state/useAppStore'
import type { Project } from '../../../../types'
import { getBoundingCurvesCorners } from '../../../../utils/boundingCurves'
import BoundsEditor from '../BoundsEditor'
import ControlPointEditor from '../ControlPointEditor'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface PatchEditorProps {
  project: Project
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const PatchEditor = ({ project }: PatchEditorProps) => {
  const zeroControlPoints = useAppStore.use.zeroControlPoints()
  const linkControlPoints = useAppStore.use.linkControlPoints()
  const mirrorControlPoints = useAppStore.use.mirrorControlPoints()
  const zeroControlPointsGlobal = useAppStore.use.zeroControlPointsGlobal()
  const linkControlPointsGlobal = useAppStore.use.linkControlPointsGlobal()
  const mirrorControlPointsGlobal = useAppStore.use.mirrorControlPointsGlobal()
  const updateBoundingCurvesNodePosition =
    useAppStore.use.updateBoundingCurvesNodePosition()

  const corners = project.boundingCurves
    ? getBoundingCurvesCorners(project.boundingCurves)
    : null

  return (
    <div className="flex flex-col space-y-3">
      <ControlPointEditor
        zeroControlPoints={zeroControlPointsGlobal}
        linkControlPoints={linkControlPointsGlobal}
        mirrorControlPoints={mirrorControlPointsGlobal}
        controlNodesAreLinked={project.config.bounds.isLinked}
        controlNodesAreMirrored={project.config.bounds.isMirrored}
      />
      {corners && (
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

export default PatchEditor
