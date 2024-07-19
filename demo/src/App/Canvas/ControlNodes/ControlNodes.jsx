// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

import React from 'react'
import { BOUNDS_POINT_IDS } from '../../../const'
import { updateBoundingCurves } from '../../../utils'
import ControlPointNode from './ControlPointNode'
import CornerNode from './CornerNode'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderNodes = (
  handleNodeDragStart,
  handleNodeDrag,
  handleNodeDragEnd,
  nodes
) => {
  return nodes.map(({ id, position, Component }) => {
    return (
      <Component
        id={id}
        key={id}
        onDragStart={handleNodeDragStart}
        onDrag={handleNodeDrag}
        onDragEnd={handleNodeDragEnd}
        position={position}
      />
    )
  })
}

const getTranslateXY = (element) => {
  const style = window.getComputedStyle(element)
  const matrix = new DOMMatrixReadOnly(style.transform)
  return {
    x: matrix.m41,
    y: matrix.m42,
  }
}

const snapshotPositions = (cache) => {
  Object.values(BOUNDS_POINT_IDS).map((id) => {
    const element = document.getElementById(id)
    const point = getTranslateXY(element)
    cache[id] = point
  })
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlNodes = ({ boundingCurves, setBoundingCurves }) => {
  const startingPositions = React.useRef({})

  const update = (element, id) => {
    const newPosition = {
      x: element.x,
      y: element.y,
    }

    const originalPosition = startingPositions.current[id]

    const deltas = {
      x: newPosition.x - originalPosition.x,
      y: newPosition.y - originalPosition.y,
    }

    const newBoundingCurves = updateBoundingCurves(
      id,
      boundingCurves,
      newPosition,
      deltas,
      startingPositions.current
    )

    setBoundingCurves(newBoundingCurves)
  }

  const handleNodeDrag = (id) => (event, dragElement) => {
    update(dragElement, id)
  }

  const handleNodeDragStart = (id) => (event, dragElement) => {
    snapshotPositions(startingPositions.current)
    update(dragElement, id)
  }

  const handleNodeDragEnd = (id) => (event, dragElement) => {
    update(dragElement, id)
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      {renderNodes(handleNodeDragStart, handleNodeDrag, handleNodeDragEnd, [
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
      ])}
    </div>
  )
}

export default ControlNodes
