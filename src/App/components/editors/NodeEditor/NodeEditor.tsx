import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

import {
  CornerNodePoint,
  UpdateBoundingCurvesNodePosition,
} from '../../../../types'
import ControlPointEditor from '../ControlPointEditor'
import PositionInput from './PositionInput'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface NodeEditorProps {
  title: string
  cornerPoint: CornerNodePoint
  controlPoint1: CornerNodePoint
  controlPoint2: CornerNodePoint
  updateBoundingCurvesNodePosition: UpdateBoundingCurvesNodePosition
  zeroControlPoints: () => void
  mirrorControlPoints: () => void
  linkControlPoints: () => void
  controlNodesAreLinked: boolean
  controlNodesAreMirrored: boolean
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const NodeEditor = ({
  title,
  cornerPoint,
  controlPoint1,
  controlPoint2,
  updateBoundingCurvesNodePosition,
  zeroControlPoints,
  mirrorControlPoints,
  linkControlPoints,
  controlNodesAreLinked,
  controlNodesAreMirrored,
}: NodeEditorProps) => {
  const [isMinimised, setIsMinised] = useState(true)
  const icon = isMinimised ? <ChevronDownIcon /> : <ChevronUpIcon />

  return (
    <div className="flex flex-col space-y-3 p-2">
      <header
        onClick={() => setIsMinised(!isMinimised)}
        className="flex cursor-pointer flex-row items-center justify-between"
      >
        <h2 className="font-bold">{title}</h2>
        {icon && <div className="h-[16px] w-[16px]">{icon}</div>}
      </header>
      <div
        className={`flex flex-col space-y-2 pb-2 ${isMinimised && `hidden`}`}
      >
        <ControlPointEditor
          zeroControlPoints={zeroControlPoints}
          linkControlPoints={linkControlPoints}
          mirrorControlPoints={mirrorControlPoints}
          controlNodesAreLinked={controlNodesAreLinked}
          controlNodesAreMirrored={controlNodesAreMirrored}
        />
        <div className={`flex flex-col space-y-2`}>
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm">Corner point</h4>
            <PositionInput
              point={cornerPoint.point}
              onChange={updateBoundingCurvesNodePosition(cornerPoint.id)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm">Control point 1</h4>
            <PositionInput
              point={controlPoint1.point}
              onChange={updateBoundingCurvesNodePosition(controlPoint1.id)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm">Control point 2</h4>
            <PositionInput
              point={controlPoint2.point}
              onChange={updateBoundingCurvesNodePosition(controlPoint2.id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeEditor
