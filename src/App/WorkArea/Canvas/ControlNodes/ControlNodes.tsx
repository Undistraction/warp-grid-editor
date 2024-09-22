import dasherize from 'dasherize'
import { ReactNode } from 'react'
import { DraggableData, DraggableEvent } from 'react-draggable'

import { ControlPointId, CornerPointId } from '../../../../enums'
import useAppStore from '../../../../state/useAppStore'
import type { BoundingCurves, Point } from '../../../../types'
import ControlPointNode from './ControlPointNode'
import CornerNode from './CornerNode'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type NodeFunc = ({
  id,
  position,
  onDrag,
  onDoubleClick,
  testId,
}: {
  id: string
  onDrag: (id: string) => (event: DraggableEvent, data: DraggableData) => void
  onDoubleClick: (id: string) => () => void
  testId: string
  position: Point
}) => ReactNode

interface Node {
  id: string
  position: Point
  Component: NodeFunc
}

type Nodes = Node[]

interface ControlNodesProps {
  boundingCurves: BoundingCurves
}

type NodeDragHandler = (
  id: string
) => (event: DraggableEvent, data: DraggableData) => void

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderNodes = (
  {
    handleNodeDrag,
    toggleZeroExpandControlPoints,
  }: {
    handleNodeDrag: NodeDragHandler
    toggleZeroExpandControlPoints: (id: string) => () => void
  },
  nodes: Nodes
) => {
  return nodes.map(
    ({
      id,
      position,
      Component,
    }: {
      id: string
      position: Point
      Component: NodeFunc
    }) => {
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
    }
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ControlNodes = ({ boundingCurves }: ControlNodesProps): ReactNode => {
  const updateBoundingCurvesNodePosition =
    useAppStore.use.updateBoundingCurvesNodePosition()

  const toggleZeroExpandControlPoints =
    useAppStore.use.toggleZeroExpandControlPoints()

  const handleNodeDrag =
    (id: string) => (event: DraggableEvent, data: DraggableData) => {
      const newPosition = {
        x: data.x,
        y: data.y,
      }

      updateBoundingCurvesNodePosition(id)(newPosition)
    }

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0">
      {renderNodes({ handleNodeDrag, toggleZeroExpandControlPoints }, [
        {
          id: ControlPointId.TOP_LEFT_CONTROL_1,
          position: boundingCurves.top.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: ControlPointId.TOP_LEFT_CONTROL_2,
          position: boundingCurves.left.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: ControlPointId.TOP_RIGHT_CONTROL_1,
          position: boundingCurves.top.controlPoint2,
          Component: ControlPointNode,
        },
        {
          id: ControlPointId.TOP_RIGHT_CONTROL_2,
          position: boundingCurves.right.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: ControlPointId.BOTTOM_LEFT_CONTROL_1,
          position: boundingCurves.bottom.controlPoint1,
          Component: ControlPointNode,
        },
        {
          id: ControlPointId.BOTTOM_LEFT_CONTROL_2,
          position: boundingCurves.left.controlPoint2,
          Component: ControlPointNode,
        },

        {
          id: ControlPointId.BOTTOM_RIGHT_CONTROL_1,
          position: boundingCurves.bottom.controlPoint2,
          Component: ControlPointNode,
        },
        {
          id: ControlPointId.BOTTOM_RIGHT_CONTROL_2,
          position: boundingCurves.right.controlPoint2,
          Component: ControlPointNode,
        },
        {
          id: CornerPointId.TOP_LEFT,
          position: boundingCurves.top.startPoint,
          Component: CornerNode,
        },
        {
          id: CornerPointId.TOP_RIGHT,
          position: boundingCurves.top.endPoint,
          Component: CornerNode,
        },
        {
          id: CornerPointId.BOTTOM_LEFT,
          position: boundingCurves.bottom.startPoint,
          Component: CornerNode,
        },
        {
          id: CornerPointId.BOTTOM_RIGHT,
          position: boundingCurves.bottom.endPoint,
          Component: CornerNode,
        },
      ])}
    </div>
  )
}

export default ControlNodes
