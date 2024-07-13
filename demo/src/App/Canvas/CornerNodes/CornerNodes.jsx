// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import React from 'react'
import { CORNER_IDS } from '../../../const'
import CornerNode from './CornerNode/CornerNode'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CornerNodes = ({ boundingCurves, onStopDrag }) => {
  return (
    <div>
      <CornerNode
        uid={CORNER_IDS.TOP_LEFT}
        onStop={onStopDrag}
        onDrag={onStopDrag}
        position={boundingCurves.top.startPoint}
      />
      <CornerNode
        uid={CORNER_IDS.TOP_RIGHT}
        onStop={onStopDrag}
        onDrag={onStopDrag}
        position={boundingCurves.top.endPoint}
      />
      <CornerNode
        uid={CORNER_IDS.BOTTOM_LEFT}
        onStop={onStopDrag}
        onDrag={onStopDrag}
        position={boundingCurves.bottom.startPoint}
      />
      <CornerNode
        uid={CORNER_IDS.BOTTOM_RIGHT}
        onStop={onStopDrag}
        onDrag={onStopDrag}
        position={boundingCurves.bottom.endPoint}
      />
    </div>
  )
}

export default CornerNodes
