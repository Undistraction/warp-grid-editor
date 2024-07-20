import React from 'react'
import IconButton from '../IconButton'
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
    <div className="flex flex-col space-y-3 p-3">
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
        <div className="flex flex-row items-start space-x-3 pl-3">
          <IconButton
            label="Ø"
            onClick={onZeroControlPoints}
          />
          <IconButton
            label="Link"
            labelSelected="Unlink"
            isSelectable
            onClick={onLinkControlPoints}
            isSelected={controlNodesAreLinked}
          />
          <IconButton
            label="Mirror"
            labelSelected="UnMirror"
            isDisabled={!controlNodesAreLinked}
            isSelectable
            onClick={onMirrorControlPoints}
            isSelected={controlNodesAreMirrored}
          />
        </div>
      </div>
    </div>
  )
}

export default NodeEditor
