import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import PropTypes from 'prop-types'
import React from 'react'

import { typeCornerPoint, typePoint } from '../../../../prop-types'
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
  updateBoundingCurvesNodePosition,
  zeroControlPoints,
  mirrorControlPoints,
  linkControlPoints,
  controlNodesAreLinked,
  controlNodesAreMirrored,
}) => {
  const [isMinimised, setIsMinised] = React.useState(true)
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
              label="Corner"
              point={cornerPoint.point}
              onChange={updateBoundingCurvesNodePosition(cornerPoint.id)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm">Control point 1</h4>
            <PositionInput
              label="Ctrl 1"
              point={controlPoint1.point}
              onChange={updateBoundingCurvesNodePosition(controlPoint1.id)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm">Control point 2</h4>
            <PositionInput
              label="Ctrl 2"
              point={controlPoint2.point}
              onChange={updateBoundingCurvesNodePosition(controlPoint2.id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

NodeEditor.propTypes = {
  title: PropTypes.string.isRequired,
  cornerPoint: typeCornerPoint.isRequired,
  controlPoint1: PropTypes.shape({
    point: typePoint.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  controlPoint2: PropTypes.shape({
    point: typePoint.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  updateBoundingCurvesNodePosition: PropTypes.func.isRequired,
  zeroControlPoints: PropTypes.func.isRequired,
  mirrorControlPoints: PropTypes.func.isRequired,
  linkControlPoints: PropTypes.func.isRequired,
  controlNodesAreLinked: PropTypes.bool.isRequired,
  controlNodesAreMirrored: PropTypes.bool.isRequired,
}

export default NodeEditor
