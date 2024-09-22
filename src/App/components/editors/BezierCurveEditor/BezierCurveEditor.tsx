import { map } from 'ramda'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { DraggableData, DraggableEvent } from 'react-draggable'

import useObserveClientSize from '../../../../hooks/useObserveClientSize'
import {
  BezierEasingPair,
  // eslint-disable-next-line import/named
  BezierEasingParams,
  // eslint-disable-next-line import/named
  Point,
  PointPairs,
  Size,
} from '../../../../types'
import BezierCurve from './BezierCurve'
import ControlPointNode from './ControlPointNode'
import ControlPointStems from './ControlPointStems'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface BezierCurveEditorProps {
  onChange: (values: BezierEasingParams) => void
  values: BezierEasingParams
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_NODE_SIZE = 12
const CONTROL_POINT_NODE_SIZE_HALF = CONTROL_POINT_NODE_SIZE * 0.5

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------
const clampT = (t: number) => Math.min(Math.max(t, 0), 1)

const getPositionFromValue = (
  v1: number,
  v2: number,
  { width, height }: Size
) => ({
  x: v1 * (width - CONTROL_POINT_NODE_SIZE) + CONTROL_POINT_NODE_SIZE_HALF,
  y:
    (1 - v2) * (height - CONTROL_POINT_NODE_SIZE) +
    CONTROL_POINT_NODE_SIZE_HALF,
})

const getValuesFromPosition = (
  { x, y }: Point,
  { width, height }: Size
): BezierEasingPair => {
  const v1 =
    (x - CONTROL_POINT_NODE_SIZE_HALF) / (width - CONTROL_POINT_NODE_SIZE)
  const v2 =
    1 - (y - CONTROL_POINT_NODE_SIZE_HALF) / (height - CONTROL_POINT_NODE_SIZE)
  return map(clampT, [v1, v2]) as BezierEasingPair
}

const getPositionsFromValues = (
  [v1, v2, v3, v4]: BezierEasingParams,
  size: Size
) => ({
  controlPointStart: getPositionFromValue(v1, v2, size),
  controlPointEnd: getPositionFromValue(v3, v4, size),
})

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const BezierCurveEditor = ({
  onChange,
  values: bezierEasingParams,
}: BezierCurveEditorProps) => {
  const [bounds, setBounds] = useState<DOMRect | null>(null)
  const [{ width, height }, setDimensions] = useState<Size>({
    width: 0,
    height: 0,
  })

  const ref = useRef<HTMLDivElement>(null)
  useObserveClientSize(ref, setDimensions)

  useEffect(() => {
    if (ref.current) {
      const newBounds = ref.current.getBoundingClientRect()
      if (width > 0) {
        setBounds(newBounds)
      }
    }
  }, [width, height, ref])

  const positions = useMemo(() => {
    if (!bounds) return null
    return getPositionsFromValues(bezierEasingParams, bounds)
  }, [bezierEasingParams, bounds])

  const boundsInset = useMemo(() => {
    if (!bounds) return null
    return {
      width: bounds.width - CONTROL_POINT_NODE_SIZE,
      height: bounds.height - CONTROL_POINT_NODE_SIZE,
      x: CONTROL_POINT_NODE_SIZE_HALF,
      y: CONTROL_POINT_NODE_SIZE_HALF,
    }
  }, [bounds])

  const handleNodeDrag =
    (id: string) => (event: DraggableEvent, draggableData: DraggableData) => {
      if (!bounds) return

      const bezierEasingParamsUpdated: BezierEasingPair = getValuesFromPosition(
        draggableData,
        bounds
      )

      const valuesNew: BezierEasingParams =
        id === `controlPointStart`
          ? [
              bezierEasingParamsUpdated[0],
              bezierEasingParamsUpdated[1],
              bezierEasingParams[2],
              bezierEasingParams[3],
            ]
          : [
              bezierEasingParams[0],
              bezierEasingParams[1],
              bezierEasingParamsUpdated[0],
              bezierEasingParamsUpdated[1],
            ]

      onChange(valuesNew)
    }

  const stemPoints: PointPairs | null = useMemo(() => {
    if (!positions || !boundsInset) return null

    return [
      [
        { x: 0, y: boundsInset.height },
        {
          x: positions.controlPointStart.x - CONTROL_POINT_NODE_SIZE_HALF,
          y: positions.controlPointStart.y - CONTROL_POINT_NODE_SIZE_HALF,
        },
      ],
      [
        { x: boundsInset.width, y: 0 },
        {
          x: positions.controlPointEnd.x - CONTROL_POINT_NODE_SIZE_HALF,
          y: positions.controlPointEnd.y - CONTROL_POINT_NODE_SIZE_HALF,
        },
      ],
    ]
  }, [boundsInset, positions])

  return (
    <div
      className="relative w-[100%] pb-[100%]"
      ref={ref}
      data-tid="bezier-easing-bounds"
    >
      <div className="absolute inset-0 border border-black" />
      {boundsInset && stemPoints && positions && (
        <Fragment>
          <div className="absolute inset-[6px]">
            <BezierCurve
              bounds={boundsInset}
              values={bezierEasingParams}
            />
          </div>
          <ControlPointStems
            bounds={boundsInset}
            points={stemPoints}
          />
          <ControlPointNode
            id="controlPointStart"
            onDrag={handleNodeDrag}
            position={positions.controlPointStart}
          />
          <ControlPointNode
            id="controlPointEnd"
            onDrag={handleNodeDrag}
            position={positions.controlPointEnd}
          />
        </Fragment>
      )}
    </div>
  )
}

export default BezierCurveEditor
