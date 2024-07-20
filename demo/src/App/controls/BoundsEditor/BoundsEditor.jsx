import React from 'react'
import { BOUNDS_POINT_IDS } from '../../../const'
import { expandControlPoints, zeroControlPoints } from '../../../utils/corners'
import NodeEditor from '../NodeEditor'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const handleLinkControlPoints =
  (cornerNodeId, boundingCurves, setBoundingCurves, config, setConfig) =>
  (isLinked) => {
    if (isLinked) {
      const updatedBoundingCurves = expandControlPoints(
        boundingCurves,
        cornerNodeId
      )
      setBoundingCurves(updatedBoundingCurves)
    }
    setConfig({
      ...config,
      [cornerNodeId]: { ...config[cornerNodeId], isLinked },
    })
  }

const handleZeroControlPoints =
  (cornerNodeId, boundingCurves, setBoundingCurves) => () => {
    const updatedBoundingCurves = zeroControlPoints(
      boundingCurves,
      cornerNodeId
    )
    setBoundingCurves(updatedBoundingCurves)
  }

const handleMirrorControlPoint =
  (cornerNodeId, config, setConfig) => (isMirrored) => {
    setConfig({
      ...config,
      [cornerNodeId]: { ...config[cornerNodeId], isMirrored },
    })
  }

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const BoundsEditor = ({
  boundingCurves,
  setBoundingCurves,
  config,
  setConfig,
  corners,
  onNodePositionChange,
}) => {
  return (
    <div className="flex flex-col divide-y divide-black border border-black">
      <NodeEditor
        title="Top Left"
        controlNodesAreLinked={config[BOUNDS_POINT_IDS.TOP_LEFT].isLinked}
        controlNodesAreMirrored={config[BOUNDS_POINT_IDS.TOP_LEFT].isMirrored}
        onNodePositionChange={onNodePositionChange}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.TOP_LEFT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.TOP_LEFT,
          boundingCurves,
          setBoundingCurves,
          config,
          setConfig
        )}
        onMirrorControlPoints={handleMirrorControlPoint(
          BOUNDS_POINT_IDS.TOP_LEFT,
          config,
          setConfig
        )}
        {...corners[BOUNDS_POINT_IDS.TOP_LEFT]}
      />
      <NodeEditor
        title="Top right"
        controlNodesAreLinked={config[BOUNDS_POINT_IDS.TOP_RIGHT].isLinked}
        controlNodesAreMirrored={config[BOUNDS_POINT_IDS.TOP_RIGHT].isMirrored}
        onNodePositionChange={onNodePositionChange}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.TOP_RIGHT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.TOP_RIGHT,
          boundingCurves,
          setBoundingCurves,
          config,
          setConfig
        )}
        onMirrorControlPoints={handleMirrorControlPoint(
          BOUNDS_POINT_IDS.TOP_RIGHT,
          config,
          setConfig
        )}
        {...corners[BOUNDS_POINT_IDS.TOP_RIGHT]}
      />
      <NodeEditor
        title="Bottom left"
        controlNodesAreLinked={config[BOUNDS_POINT_IDS.BOTTOM_LEFT].isLinked}
        controlNodesAreMirrored={
          config[BOUNDS_POINT_IDS.BOTTOM_LEFT].isMirrored
        }
        onNodePositionChange={onNodePositionChange}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
          boundingCurves,
          setBoundingCurves,
          config,
          setConfig
        )}
        onMirrorControlPoints={handleMirrorControlPoint(
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
          config,
          setConfig
        )}
        {...corners[BOUNDS_POINT_IDS.BOTTOM_LEFT]}
      />
      <NodeEditor
        title="Bottom right"
        controlNodesAreLinked={config[BOUNDS_POINT_IDS.BOTTOM_RIGHT].isLinked}
        controlNodesAreMirrored={
          config[BOUNDS_POINT_IDS.BOTTOM_RIGHT].isMirrored
        }
        onNodePositionChange={onNodePositionChange}
        onZeroControlPoints={handleZeroControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          boundingCurves,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          boundingCurves,
          setBoundingCurves,
          config,
          setConfig
        )}
        onMirrorControlPoints={handleMirrorControlPoint(
          BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          config,
          setConfig
        )}
        {...corners[BOUNDS_POINT_IDS.BOTTOM_RIGHT]}
      />
    </div>
  )
}

export default BoundsEditor
