// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import dasherize from 'dasherize'
import React from 'react'

import { BOUNDS_POINT_IDS } from '../../../../const'
import { typeBoundingCurves } from '../../../../prop-types'
import useAppStore from '../../../../state/useAppStore'
import ControlPointNode from './ControlPointNode'
import CornerNode from './CornerNode'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderNodes = (
  { handleNodeDrag, toggleZeroExpandControlPoints },
  nodes
) => {
  return nodes.map(({ id, position, Component }) => {
    const tid = dasherize(id)
    return (
      <Component
        id={id}
        key={id}
        onDrag={handleNodeDrag}
        onDoubleClick={toggleZeroExpandControlPoints}
        position={position}
        testId={tid}
      />
    )
  })
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlNodes = ({ boundingCurves }) => {
  const updateBoundingCurvesNodePosition =
    useAppStore.use.updateBoundingCurvesNodePosition()

  const toggleZeroExpandControlPoints =
    useAppStore.use.toggleZeroExpandControlPoints()

  const handleNodeDrag = (id) => (event, dragElement) => {
    const newPosition = {
      x: dragElement.x,
      y: dragElement.y,
    }

    updateBoundingCurvesNodePosition(id)(newPosition)
  }

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0">
      {renderNodes({ handleNodeDrag, toggleZeroExpandControlPoints }, [
        {
          id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1,
          position: boundingCurves.top.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2,
          position: boundingCurves.left.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1,
          position: boundingCurves.top.controlPoint2,
          Component: ControlPointNode,
        },
        {
          id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2,
          position: boundingCurves.right.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1,
          position: boundingCurves.bottom.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2,
          position: boundingCurves.left.controlPoint2,
          Component: ControlPointNode,
        },

        {
          id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1,
          position: boundingCurves.bottom.controlPoint2,
          Component: ControlPointNode,
        },
        {
          id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2,
          position: boundingCurves.right.controlPoint2,
          Component: ControlPointNode,
        },
        {
          id: BOUNDS_POINT_IDS.TOP_LEFT,
          position: boundingCurves.top.startPoint,
          Component: CornerNode,
        },
        {
          id: BOUNDS_POINT_IDS.TOP_RIGHT,
          position: boundingCurves.top.endPoint,
          Component: CornerNode,
        },
        {
          id: BOUNDS_POINT_IDS.BOTTOM_LEFT,
          position: boundingCurves.bottom.startPoint,
          Component: CornerNode,
        },
        {
          id: BOUNDS_POINT_IDS.BOTTOM_RIGHT,
          position: boundingCurves.bottom.endPoint,
          Component: CornerNode,
        },
      ])}
    </div>
  )
}

ControlNodes.propTypes = {
  boundingCurves: typeBoundingCurves,
}

export default ControlNodes
