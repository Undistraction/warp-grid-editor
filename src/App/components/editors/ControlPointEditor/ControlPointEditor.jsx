import PropTypes from 'prop-types'
import React from 'react'

import IconButton from '../../IconButton'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlPointEditor = ({
  zeroControlPoints,
  linkControlPoints,
  mirrorControlPoints,
  controlNodesAreLinked,
  controlNodesAreMirrored,
}) => {
  return (
    <div className="flex flex-row items-start space-x-3 pl-3">
      <IconButton
        label="Ø"
        onClick={zeroControlPoints}
      />
      <IconButton
        label="Link"
        labelSelected="Unlink"
        isSelectable
        onClick={linkControlPoints}
        isSelected={controlNodesAreLinked}
      />
      <IconButton
        label="Mirror"
        labelSelected="UnMirror"
        isDisabled={!controlNodesAreLinked}
        isSelectable
        onClick={mirrorControlPoints}
        isSelected={controlNodesAreMirrored}
      />
    </div>
  )
}

ControlPointEditor.propTypes = {
  zeroControlPoints: PropTypes.func.isRequired,
  linkControlPoints: PropTypes.func.isRequired,
  mirrorControlPoints: PropTypes.func.isRequired,
  controlNodesAreLinked: PropTypes.bool.isRequired,
  controlNodesAreMirrored: PropTypes.bool.isRequired,
}

export default ControlPointEditor
