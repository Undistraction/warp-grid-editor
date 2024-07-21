import React from 'react'
import { BOUNDS_POINT_IDS } from '../../../const'
import { getBoundsApi } from '../../../utils/boundsApi'
import NodeEditor from '../NodeEditor'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const handleLinkControlPoints =
  (boundsApi, config, cornerNodeId, setBoundingCurves, setConfig) =>
  (isLinked) => {
    if (isLinked) {
      const updatedBoundingCurves = boundsApi.expandControlPoints(cornerNodeId)
      setBoundingCurves(updatedBoundingCurves)
    }
    setConfig({
      ...config,
      [cornerNodeId]: { ...config[cornerNodeId], isLinked },
    })
  }

const handleZeroControlPoints =
  (boundsApi, cornerNodeId, boundingCurves, setBoundingCurves) => () => {
    const updatedBoundingCurves = boundsApi.zeroControlPoints(
      boundingCurves,
      cornerNodeId
    )
    setBoundingCurves(updatedBoundingCurves)
  }

const handleMirrorControlPoint =
  (config, cornerNodeId, setConfig) => (isMirrored) => {
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
  const boundsApi = getBoundsApi(boundingCurves, config)

  return (
    <div className="flex flex-col divide-y divide-black border border-black">
      <NodeEditor
        title="Top Left"
        controlNodesAreLinked={config[BOUNDS_POINT_IDS.TOP_LEFT].isLinked}
        controlNodesAreMirrored={config[BOUNDS_POINT_IDS.TOP_LEFT].isMirrored}
        onNodePositionChange={onNodePositionChange}
        onZeroControlPoints={handleZeroControlPoints(
          boundsApi,
          BOUNDS_POINT_IDS.TOP_LEFT,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          boundsApi,
          config,
          BOUNDS_POINT_IDS.TOP_LEFT,
          setBoundingCurves,
          setConfig
        )}
        onMirrorControlPoints={handleMirrorControlPoint(
          config,
          BOUNDS_POINT_IDS.TOP_LEFT,
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
          boundsApi,
          BOUNDS_POINT_IDS.TOP_RIGHT,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          boundsApi,
          BOUNDS_POINT_IDS.TOP_RIGHT,
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
          boundsApi,
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          boundsApi,
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
          setBoundingCurves,
          setConfig
        )}
        onMirrorControlPoints={handleMirrorControlPoint(
          boundsApi,
          BOUNDS_POINT_IDS.BOTTOM_LEFT,
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
          boundsApi,
          BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          setBoundingCurves
        )}
        onLinkControlPoints={handleLinkControlPoints(
          boundsApi,
          BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          setBoundingCurves,
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
