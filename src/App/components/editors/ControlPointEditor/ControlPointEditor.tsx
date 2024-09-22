import {
  ArrowsPointingInIcon,
  EqualsIcon,
  LinkIcon,
  LinkSlashIcon,
  SlashIcon,
} from '@heroicons/react/16/solid'
import React from 'react'

import ButtonLink from '../../ButtonLink'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ControlPointEditorProps {
  zeroControlPoints: () => void
  linkControlPoints: () => void
  mirrorControlPoints: () => void
  controlNodesAreLinked: boolean
  controlNodesAreMirrored: boolean
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function ControlPointEditor({
  zeroControlPoints,
  linkControlPoints,
  mirrorControlPoints,
  controlNodesAreLinked,
  controlNodesAreMirrored,
}: ControlPointEditorProps) {
  return (
    <div className="flex flex-row items-start space-x-2">
      <ButtonLink
        icon={<ArrowsPointingInIcon />}
        onClick={zeroControlPoints}
        tooltipText="Set the control points to the same position as their corresponding corner. This will give you a angular corner."
      />
      <ButtonLink
        icon={<LinkSlashIcon />}
        iconSelected={<LinkIcon />}
        onClick={linkControlPoints}
        isSelected={controlNodesAreLinked}
        tooltipText="Toggle between linking the control points so they are always opposite each other, or allowing them to move independently."
      />
      <ButtonLink
        icon={<EqualsIcon />}
        iconSelected={<SlashIcon />}
        isDisabled={!controlNodesAreLinked}
        onClick={mirrorControlPoints}
        isSelected={controlNodesAreMirrored}
        tooltipText="Toggle between mirroring the control points so they are always the same distance from the corner as each other, or allowing them to have different distances."
      />
    </div>
  )
}
