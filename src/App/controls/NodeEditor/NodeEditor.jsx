import React from 'react'
import ControlPointEditor from '../ControlPointEditor'
import PositionInput from './PositionInput'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const NodeEditor = ({
  title,
  cornerPoint,
  controlPoint1,
  controlPoint2,
  onNodePositionChange,
  onZeroControlPoints,
  onMirrorControlPoints,
  onLinkControlPoints,
  controlNodesAreLinked,
  controlNodesAreMirrored,
}) => {
  const [isMinimised, setIsMinised] = React.useState(true)

  const icon = isMinimised ? '+' : '-'

  return (
    <div className="flex flex-col space-y-3 p-2">
      <header
        onClick={() => setIsMinised(!isMinimised)}
        className="flex cursor-pointer flex-row items-center justify-between"
      >
        <h2 className="text-sm font-bold">{title}</h2>
        <div>{icon}</div>
      </header>
      <div className={`flex flex-col space-y-2 ${isMinimised && 'hidden'}`}>
        <div className={`flex flex-col space-y-2`}>
          <PositionInput
            label="Corner"
            point={cornerPoint.point}
            onChange={onNodePositionChange(cornerPoint.id)}
          />
          <PositionInput
            label="Control 1"
            point={controlPoint1.point}
            onChange={onNodePositionChange(controlPoint1.id)}
          />
          <PositionInput
            label="Control 2"
            point={controlPoint2.point}
            onChange={onNodePositionChange(controlPoint2.id)}
          />
        </div>
        <ControlPointEditor
          onZeroControlPoints={onZeroControlPoints}
          onLinkControlPoints={onLinkControlPoints}
          onMirrorControlPoints={onMirrorControlPoints}
          controlNodesAreLinked={controlNodesAreLinked}
          controlNodesAreMirrored={controlNodesAreMirrored}
        />
      </div>
    </div>
  )
}

export default NodeEditor
