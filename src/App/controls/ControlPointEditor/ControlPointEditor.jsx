import React from 'react'
import IconButton from '../IconButton'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlPointEditor = ({
  onZeroControlPoints,
  onLinkControlPoints,
  onMirrorControlPoints,
  controlNodesAreLinked,
  controlNodesAreMirrored,
}) => {
  return (
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
  )
}

export default ControlPointEditor
