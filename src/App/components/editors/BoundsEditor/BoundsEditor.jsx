import PropTypes from 'prop-types'
import { map } from 'ramda'
import React from 'react'

import { BOUNDS_POINT_IDS } from '../../../../const'
import { typeBoundingCurves, typeConfig } from '../../../../prop-types'
import NodeEditor from '../NodeEditor'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const NODES = [
  { id: BOUNDS_POINT_IDS.TOP_LEFT, title: `Top left` },
  { id: BOUNDS_POINT_IDS.TOP_RIGHT, title: `Top right` },
  { id: BOUNDS_POINT_IDS.BOTTOM_LEFT, title: `Bottom left` },
  { id: BOUNDS_POINT_IDS.BOTTOM_RIGHT, title: `Bottom right` },
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const pointIsLinked = (pointId, config) => {
  return config.bounds.corners[pointId].isLinked
}

const pointIsMirrored = (pointId, config) => {
  return config.bounds.corners[pointId].isMirrored
}

const getNode =
  (
    zeroControlPoints,
    linkControlPoints,
    mirrorControlPoints,
    corners,
    config
  ) =>
  (pointId) => {
    return {
      corners: corners[BOUNDS_POINT_IDS.TOP_LEFT],
      pointIsLinked: pointIsLinked(pointId, config),
      pointIsMirrored: pointIsMirrored(pointId, config),
      zeroControlPoints: zeroControlPoints(pointId),
      linkControlPoints: linkControlPoints(pointId),
      mirrorControlPoints: mirrorControlPoints(pointId),
    }
  }

const renderNodes = (updateBoundingCurvesCornerNode, getNodeWithData) =>
  map(({ id, title }) => {
    const node = getNodeWithData(id)
    return (
      <NodeEditor
        key={id}
        title={title}
        controlNodesAreLinked={node.pointIsLinked}
        controlNodesAreMirrored={node.pointIsMirrored}
        updateBoundingCurvesCornerNode={updateBoundingCurvesCornerNode}
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
  updateBoundingCurvesCornerNode,
  corners,
  zeroControlPoints,
  linkControlPoints,
  mirrorControlPoints,
  config,
}) => {
  const getNodeWithData = getNode(
    zeroControlPoints,
    linkControlPoints,
    mirrorControlPoints,
    corners,
    config
  )

  return (
    <div className="flex flex-col divide-y divide-black border border-black">
      {renderNodes(updateBoundingCurvesCornerNode, getNodeWithData)}
    </div>
  )
}

BoundsEditor.propTypes = {
  config: typeConfig.isRequired,
  corners: PropTypes.object.isRequired,
  updateBoundingCurvesCornerNode: PropTypes.func.isRequired,
  zeroControlPoints: PropTypes.func.isRequired,
  linkControlPoints: PropTypes.func.isRequired,
  mirrorControlPoints: PropTypes.func.isRequired,
  boundingCurves: typeBoundingCurves,
}

export default BoundsEditor
