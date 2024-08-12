import PropTypes from 'prop-types'
import React from 'react'

import ButtonLink from '../../ButtonLink'

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
    <div className="flex flex-row items-start space-x-3">
      <ButtonLink
        label="Ø"
        onClick={zeroControlPoints}
      />
      <ButtonLink
        label="Link"
        labelSelected="Unlink"
        onClick={linkControlPoints}
        isSelected={controlNodesAreLinked}
      />
      <ButtonLink
        label="Mirror"
        labelSelected="UnMirror"
        isDisabled={!controlNodesAreLinked}
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
