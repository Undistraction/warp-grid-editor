import React from 'react'
import { BOUNDS_POINT_IDS } from '../../../const'
import {
  expandControlPoints,
  updateNodePosition,
  zeroControlPoints,
} from '../../../utils/corners'
import NodeEditor from '../NodeEditor'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const handleNodeChange =
  (boundingCurves, setBoundingCurves) => (nodeId) => (point) => {
    const updatedBoundingCurves = updateNodePosition(
      boundingCurves,
      nodeId,
      point
    )
    setBoundingCurves(updatedBoundingCurves)
  }

const handleLinkControlPoints =
  (cornerNodeId, boundingCurves, setBoundingCurves) => () => {
    const updatedBoundingCurves = expandControlPoints(
      boundingCurves,
      cornerNodeId
    )
    setBoundingCurves(updatedBoundingCurves)
  }

const handleZeroControlPoints =
  (cornerNodeId, boundingCurves, setBoundingCurves) => () => {
    const updatedBoundingCurves = zeroControlPoints(
      boundingCurves,
      cornerNodeId
    )
    setBoundingCurves(updatedBoundingCurves)
  }

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const BoundsEditor = ({ boundingCurves, setBoundingCurves, corners }) => {
  return (
    <div className="flex flex-col divide-y divide-black border border-black">
      <NodeEditor
        title="Top Left"
        onNodeChange={handleNodeChange(boundingCurves, setBoundingCurves)}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.TOP_LEFT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.TOP_LEFT,
          boundingCurves,
          setBoundingCurves
        )}
        {...corners[BOUNDS_POINT_IDS.TOP_LEFT]}
      />
      <NodeEditor
        title="Top right"
        onNodeChange={handleNodeChange(boundingCurves, setBoundingCurves)}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.TOP_RIGHT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.TOP_RIGHT,
          boundingCurves,
          setBoundingCurves
        )}
        {...corners[BOUNDS_POINT_IDS.TOP_RIGHT]}
      />
      <NodeEditor
        title="Bottom left"
        onNodeChange={handleNodeChange(boundingCurves, setBoundingCurves)}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
          boundingCurves,
          setBoundingCurves
        )}
        {...corners[BOUNDS_POINT_IDS.BOTTOM_LEFT]}
      />
      <NodeEditor
        title="Bottom right"
        onNodeChange={handleNodeChange(boundingCurves, setBoundingCurves)}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          boundingCurves,
          setBoundingCurves
        )}
        {...corners[BOUNDS_POINT_IDS.BOTTOM_RIGHT]}
      />
    </div>
  )
}

export default BoundsEditor
