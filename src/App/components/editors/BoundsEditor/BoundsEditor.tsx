import { map } from 'ramda'

import {
  CornerNode,
  CornerNodeMap,
  CornerPointId,
  ProjectConfig,
  UpdateBoundingCurvesNodePosition,
} from '../../../../types'
import NodeEditor from '../NodeEditor'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface BoundsEditorProps {
  config: ProjectConfig
  corners: CornerNodeMap
  updateBoundingCurvesNodePosition: UpdateBoundingCurvesNodePosition
  zeroControlPoints: (id: string) => () => void
  linkControlPoints: (id: string) => () => void
  mirrorControlPoints: (id: string) => () => void
}

type GetNodeWithData = (pointId: CornerPointId) => {
  corners: CornerNode
  pointIsLinked: boolean
  pointIsMirrored: boolean
  zeroControlPoints: () => void
  linkControlPoints: () => void
  mirrorControlPoints: () => void
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const NODES = [
  { id: CornerPointId.TOP_LEFT, title: `Top left corner` },
  { id: CornerPointId.TOP_RIGHT, title: `Top right corner` },
  { id: CornerPointId.BOTTOM_LEFT, title: `Bottom left corner` },
  { id: CornerPointId.BOTTOM_RIGHT, title: `Bottom right corner` },
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const pointIsLinked = (pointId: CornerPointId, config: ProjectConfig) =>
  config.bounds.corners[pointId].isLinked

const pointIsMirrored = (pointId: CornerPointId, config: ProjectConfig) =>
  config.bounds.corners[pointId].isMirrored

const getNode =
  (
    zeroControlPoints: (id: string) => () => void,
    linkControlPoints: (id: string) => () => void,
    mirrorControlPoints: (id: string) => () => void,
    corners: CornerNodeMap,
    config: ProjectConfig
  ) =>
  (pointId: CornerPointId) => {
    const id = CornerPointId.TOP_LEFT
    return {
      corners: corners[id],
      pointIsLinked: pointIsLinked(pointId, config),
      pointIsMirrored: pointIsMirrored(pointId, config),
      zeroControlPoints: zeroControlPoints(pointId),
      linkControlPoints: linkControlPoints(pointId),
      mirrorControlPoints: mirrorControlPoints(pointId),
    }
  }

const renderNodes = (
  updateBoundingCurvesNodePosition: UpdateBoundingCurvesNodePosition,
  getNodeWithData: GetNodeWithData
) =>
  map(({ id, title }) => {
    const node = getNodeWithData(id)

    return (
      <NodeEditor
        key={id}
        title={title}
        controlNodesAreLinked={node.pointIsLinked}
        controlNodesAreMirrored={node.pointIsMirrored}
        updateBoundingCurvesNodePosition={updateBoundingCurvesNodePosition}
        zeroControlPoints={node.zeroControlPoints}
        linkControlPoints={node.linkControlPoints}
        mirrorControlPoints={node.mirrorControlPoints}
        {...node.corners}
      />
    )
  }, NODES)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const BoundsEditor = ({
  updateBoundingCurvesNodePosition,
  corners,
  zeroControlPoints,
  linkControlPoints,
  mirrorControlPoints,
  config,
}: BoundsEditorProps) => {
  const getNodeWithData: GetNodeWithData = getNode(
    zeroControlPoints,
    linkControlPoints,
    mirrorControlPoints,
    corners,
    config
  )

  return (
    <div className="flex flex-col divide-y divide-black border border-black">
      {renderNodes(updateBoundingCurvesNodePosition, getNodeWithData)}
    </div>
  )
}

export default BoundsEditor