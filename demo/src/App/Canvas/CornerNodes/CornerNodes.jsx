// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import React from 'react'
import { BOUNDS_POINT_IDS } from '../../../const'
import ControlPointNode from './ControlPointNode'
import CornerNode from './CornerNode/CornerNode'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CornerNodes = ({ boundingCurves, onDrag }) => {
  return (
    <div>
      <CornerNode
        id={BOUNDS_POINT_IDS.TOP_LEFT}
        onDrag={onDrag}
        position={boundingCurves.top.startPoint}
      />
      <CornerNode
        id={BOUNDS_POINT_IDS.TOP_RIGHT}
        onDrag={onDrag}
        position={boundingCurves.top.endPoint}
      />
      <CornerNode
        id={BOUNDS_POINT_IDS.BOTTOM_LEFT}
        onDrag={onDrag}
        position={boundingCurves.left.endPoint}
      />
      <CornerNode
        id={BOUNDS_POINT_IDS.BOTTOM_RIGHT}
        onDrag={onDrag}
        position={boundingCurves.bottom.endPoint}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1}
        onDrag={onDrag}
        position={boundingCurves.top.controlPoint1}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2}
        onDrag={onDrag}
        position={boundingCurves.left.controlPoint1}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1}
        onDrag={onDrag}
        position={boundingCurves.top.controlPoint2}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2}
        onDrag={onDrag}
        position={boundingCurves.right.controlPoint1}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1}
        onDrag={onDrag}
        position={boundingCurves.bottom.controlPoint1}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2}
        onDrag={onDrag}
        position={boundingCurves.left.controlPoint2}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1}
        onDrag={onDrag}
        position={boundingCurves.bottom.controlPoint2}
      />
      <ControlPointNode
        id={BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2}
        onDrag={onDrag}
        position={boundingCurves.right.controlPoint2}
      />
    </div>
  )
}

export default CornerNodes
