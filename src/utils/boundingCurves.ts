import { curry, pipe, reduce } from 'ramda'

import { CORNER_POINTS } from '../const'
import { ControlPointId, CornerPointId, CurveId, CurvePointId } from '../enums'
import type { BoundingCurves, Point, ProjectConfig } from '../types'
import {
  getAngleBetweenPoints,
  getDistanceBetweenPoints,
  getInverseAngleRads,
  getPointAtDistanceAndAngle,
  pointAdd,
  pointsAreEqual,
  pointSubtract,
} from './trig'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Bounds {
  x: number
  y: number
  width: number
  height: number
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const EXPANSION_DISTANCE = 30

const INSET_DEFAULT = 50

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getUpdatedLinkedControlPointPosition = (
  newPosition: Point,
  linkedPoint: Point,
  cornerPoint: Point,
  { isMirrored }: { isMirrored: boolean }
) => {
  // Find the angle between the control point that has been moved and the corner

  const angleToCornerPointFromNewPositionRads = getAngleBetweenPoints(
    newPosition,
    cornerPoint
  )

  const distanceToCornerFromNewPosition = getDistanceBetweenPoints(
    cornerPoint,
    newPosition
  )

  // Find a new position for the linked control point that maintains the same
  // distance but is at the new angle
  const distanceToCornerFromLinkedPoint = getDistanceBetweenPoints(
    cornerPoint,
    linkedPoint
  )
  const inverseAngle = getInverseAngleRads(
    angleToCornerPointFromNewPositionRads
  )

  return getPointAtDistanceAndAngle(
    cornerPoint,
    inverseAngle,
    -(isMirrored
      ? distanceToCornerFromNewPosition
      : distanceToCornerFromLinkedPoint)
  )
}

const getLinkedControlPointPosition = (
  newPosition: Point,
  cornerId: CornerPointId,
  boundingCurves: BoundingCurves,
  linkedCurveName: CurveId,
  linkedCurvePointName: CurvePointId,
  config: ProjectConfig
) => {
  const { isLinked, isMirrored } = config.bounds.corners[cornerId]

  // If the corner points are linked
  if (isLinked) {
    const cornerPoint =
      getBoundingCurvesCorners(boundingCurves)[cornerId].cornerPoint.point
    const linkedPoint = boundingCurves[linkedCurveName][linkedCurvePointName]

    return getUpdatedLinkedControlPointPosition(
      newPosition,
      linkedPoint,
      cornerPoint,
      {
        isMirrored,
      }
    )
  }

  return boundingCurves[linkedCurveName][linkedCurvePointName]
}

const updateControlPointPositions = (
  boundingCurves: BoundingCurves,
  curve1Name: CurveId,
  curve1Point1Name: CurvePointId,
  curve1ControlPointPosition: Point,
  curve2Name: CurveId,
  curve2ConreolPointName: CurvePointId,
  curve2ControlPointPosition: Point
): BoundingCurves => {
  return {
    ...boundingCurves,
    [curve1Name]: {
      ...boundingCurves[curve1Name],
      [curve1Point1Name]: curve1ControlPointPosition,
    },
    [curve2Name]: {
      ...boundingCurves[curve2Name],
      [curve2ConreolPointName]: curve2ControlPointPosition,
    },
  }
}

const getUpdatedControlPointPositionsForCorner = (
  newPosition: Point,
  cornerId: CornerPointId,
  curveName: CurveId,
  curvePointName: CurvePointId,
  boundingCurves: BoundingCurves,
  linkedCurveName: CurveId,
  linkedCurvePointName: CurvePointId,
  config: ProjectConfig
) => {
  const linkedControlPointPosition = getLinkedControlPointPosition(
    newPosition,
    cornerId,
    boundingCurves,
    linkedCurveName,
    linkedCurvePointName,
    config
  )

  return updateControlPointPositions(
    boundingCurves,
    curveName,
    curvePointName,
    newPosition,
    linkedCurveName,
    linkedCurvePointName,
    linkedControlPointPosition
  )
}

const getUpdatedCornerPointPosition = (
  newPosition: Point,
  cornerPointPosition: Point,
  boundingCurves: BoundingCurves,
  curve1Name: CurveId,
  curve1Point1Name: CurvePointId,
  curve1Point2Name: CurvePointId,
  curve2Name: CurveId,
  curve2Point1Name: CurvePointId,
  curve2Point2Name: CurvePointId
) => {
  // The control points move relative to the corner point
  const controlPoint1StartPosition =
    boundingCurves[curve1Name][curve1Point2Name]

  const controlPoint2StartPosition =
    boundingCurves[curve2Name][curve2Point2Name]

  const deltas = pointSubtract(cornerPointPosition, newPosition)
  const controlPointCurve1 = pointAdd(deltas, controlPoint1StartPosition)
  const controlPointCurve2 = pointAdd(deltas, controlPoint2StartPosition)

  return {
    ...boundingCurves,
    [curve1Name]: {
      ...boundingCurves[curve1Name],
      [curve1Point1Name]: newPosition,
      [curve1Point2Name]: controlPointCurve1,
    },
    [curve2Name]: {
      ...boundingCurves[curve2Name],
      [curve2Point1Name]: newPosition,
      [curve2Point2Name]: controlPointCurve2,
    },
  }
}

const getDefaultBoundsForCanvas = (canvas: HTMLCanvasElement) => ({
  width: canvas.width - INSET_DEFAULT * 2,
  height: canvas.height - INSET_DEFAULT * 2,
  x: INSET_DEFAULT,
  y: INSET_DEFAULT,
})
// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getBoundingCurvesCorners = (boundingCurves: BoundingCurves) => {
  return {
    [CornerPointId.TOP_LEFT]: {
      cornerPoint: {
        id: CornerPointId.TOP_LEFT,
        point: boundingCurves.top.startPoint,
      },
      controlPoint1: {
        id: ControlPointId.TOP_LEFT_CONTROL_1,
        point: boundingCurves.top.controlPoint1,
      },
      controlPoint2: {
        id: ControlPointId.TOP_LEFT_CONTROL_2,
        point: boundingCurves.left.controlPoint1,
      },
    },
    [CornerPointId.TOP_RIGHT]: {
      cornerPoint: {
        id: CornerPointId.TOP_RIGHT,
        point: boundingCurves.top.endPoint,
      },
      controlPoint1: {
        id: ControlPointId.TOP_RIGHT_CONTROL_1,
        point: boundingCurves.top.controlPoint2,
      },
      controlPoint2: {
        id: ControlPointId.TOP_RIGHT_CONTROL_2,
        point: boundingCurves.right.controlPoint1,
      },
    },
    [CornerPointId.BOTTOM_LEFT]: {
      cornerPoint: {
        id: CornerPointId.BOTTOM_LEFT,
        point: boundingCurves.bottom.startPoint,
      },
      controlPoint1: {
        id: ControlPointId.BOTTOM_LEFT_CONTROL_1,
        point: boundingCurves.bottom.controlPoint1,
      },
      controlPoint2: {
        id: ControlPointId.BOTTOM_LEFT_CONTROL_2,
        point: boundingCurves.left.controlPoint2,
      },
    },
    [CornerPointId.BOTTOM_RIGHT]: {
      cornerPoint: {
        id: CornerPointId.BOTTOM_RIGHT,
        point: boundingCurves.bottom.endPoint,
      },
      controlPoint1: {
        id: ControlPointId.BOTTOM_RIGHT_CONTROL_1,
        point: boundingCurves.bottom.controlPoint2,
      },
      controlPoint2: {
        id: ControlPointId.BOTTOM_RIGHT_CONTROL_2,
        point: boundingCurves.right.controlPoint2,
      },
    },
  }
}

export const moveBoundingCurves = curry(
  (position: Point, boundingCurves: BoundingCurves) => ({
    top: {
      startPoint: {
        x: position.x,
        y: position.y,
      },
      endPoint: {
        x:
          boundingCurves.top.endPoint.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.top.endPoint.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint1: {
        x:
          boundingCurves.top.controlPoint1.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.top.controlPoint1.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint2: {
        x:
          boundingCurves.top.controlPoint2.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.top.controlPoint2.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
    },
    bottom: {
      startPoint: {
        x:
          boundingCurves.bottom.startPoint.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.bottom.startPoint.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      endPoint: {
        x:
          boundingCurves.bottom.endPoint.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.bottom.endPoint.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint1: {
        x:
          boundingCurves.bottom.controlPoint1.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.bottom.controlPoint1.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint2: {
        x:
          boundingCurves.bottom.controlPoint2.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.bottom.controlPoint2.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
    },
    left: {
      startPoint: {
        x:
          boundingCurves.left.startPoint.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.left.startPoint.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      endPoint: {
        x:
          boundingCurves.left.endPoint.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.left.endPoint.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint1: {
        x:
          boundingCurves.left.controlPoint1.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.left.controlPoint1.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint2: {
        x:
          boundingCurves.left.controlPoint2.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.left.controlPoint2.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
    },
    right: {
      startPoint: {
        x:
          boundingCurves.right.startPoint.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.right.startPoint.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      endPoint: {
        x:
          boundingCurves.right.endPoint.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.right.endPoint.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint1: {
        x:
          boundingCurves.right.controlPoint1.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.right.controlPoint1.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
      controlPoint2: {
        x:
          boundingCurves.right.controlPoint2.x -
          boundingCurves.top.startPoint.x +
          position.x,
        y:
          boundingCurves.right.controlPoint2.y -
          boundingCurves.top.startPoint.y +
          position.y,
      },
    },
  })
)

export const moveBoundingCurvesToOrigin = moveBoundingCurves({ x: 0, y: 0 })

export const moveBoundingCurvesNodePosition = (
  config: ProjectConfig,
  id: string,
  newPosition: Point,
  boundingCurves: BoundingCurves
) => {
  // Top Left
  if (id === CornerPointId.TOP_LEFT) {
    return getUpdatedCornerPointPosition(
      newPosition,
      boundingCurves.top.startPoint,
      boundingCurves,
      CurveId.TOP,
      CurvePointId.START_POINT,
      CurvePointId.CONTROL_POINT_1,
      CurveId.LEFT,
      CurvePointId.START_POINT,
      CurvePointId.CONTROL_POINT_1
    )
  }

  if (id === ControlPointId.TOP_LEFT_CONTROL_1) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.TOP_LEFT,
      CurveId.TOP,
      CurvePointId.CONTROL_POINT_1,
      boundingCurves,
      CurveId.LEFT,
      CurvePointId.CONTROL_POINT_1,
      config
    )
  }

  if (id === ControlPointId.TOP_LEFT_CONTROL_2) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.TOP_LEFT,
      CurveId.LEFT,
      CurvePointId.CONTROL_POINT_1,
      boundingCurves,
      CurveId.TOP,
      CurvePointId.CONTROL_POINT_1,
      config
    )
  }

  if (id === CornerPointId.TOP_RIGHT) {
    return getUpdatedCornerPointPosition(
      newPosition,
      boundingCurves.top.endPoint,
      boundingCurves,
      CurveId.TOP,
      CurvePointId.END_POINT,
      CurvePointId.CONTROL_POINT_2,
      CurveId.RIGHT,
      CurvePointId.START_POINT,
      CurvePointId.CONTROL_POINT_1
    )
  }

  if (id === ControlPointId.TOP_RIGHT_CONTROL_1) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.TOP_RIGHT,
      CurveId.TOP,
      CurvePointId.CONTROL_POINT_2,
      boundingCurves,
      CurveId.RIGHT,
      CurvePointId.CONTROL_POINT_1,
      config
    )
  }

  if (id === ControlPointId.TOP_RIGHT_CONTROL_2) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.TOP_RIGHT,
      CurveId.RIGHT,
      CurvePointId.CONTROL_POINT_1,
      boundingCurves,
      CurveId.TOP,
      CurvePointId.CONTROL_POINT_2,
      config
    )
  }

  if (id === CornerPointId.BOTTOM_LEFT) {
    return getUpdatedCornerPointPosition(
      newPosition,
      boundingCurves.bottom.startPoint,
      boundingCurves,
      CurveId.BOTTOM,
      CurvePointId.START_POINT,
      CurvePointId.CONTROL_POINT_1,
      CurveId.LEFT,
      CurvePointId.END_POINT,
      CurvePointId.CONTROL_POINT_2
    )
  }

  if (id === ControlPointId.BOTTOM_LEFT_CONTROL_1) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.BOTTOM_LEFT,
      CurveId.BOTTOM,
      CurvePointId.CONTROL_POINT_1,
      boundingCurves,
      CurveId.LEFT,
      CurvePointId.CONTROL_POINT_2,
      config
    )
  }

  if (id === ControlPointId.BOTTOM_LEFT_CONTROL_2) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.BOTTOM_LEFT,
      CurveId.LEFT,
      CurvePointId.CONTROL_POINT_2,
      boundingCurves,
      CurveId.BOTTOM,
      CurvePointId.CONTROL_POINT_1,
      config
    )
    // BOTTOM RIGHT
  }

  if (id === CornerPointId.BOTTOM_RIGHT) {
    return getUpdatedCornerPointPosition(
      newPosition,
      boundingCurves.bottom.endPoint,
      boundingCurves,
      CurveId.BOTTOM,
      CurvePointId.END_POINT,
      CurvePointId.CONTROL_POINT_2,
      CurveId.RIGHT,
      CurvePointId.END_POINT,
      CurvePointId.CONTROL_POINT_2
    )
  }

  if (id === ControlPointId.BOTTOM_RIGHT_CONTROL_1) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.BOTTOM_RIGHT,
      CurveId.BOTTOM,
      CurvePointId.CONTROL_POINT_2,
      boundingCurves,
      CurveId.RIGHT,
      CurvePointId.CONTROL_POINT_2,
      config
    )
  }

  if (id === ControlPointId.BOTTOM_RIGHT_CONTROL_2) {
    return getUpdatedControlPointPositionsForCorner(
      newPosition,
      CornerPointId.BOTTOM_RIGHT,
      CurveId.RIGHT,
      CurvePointId.CONTROL_POINT_2,
      boundingCurves,
      CurveId.BOTTOM,
      CurvePointId.CONTROL_POINT_2,
      config
    )
  }

  throw new Error(`Unrecognised point ID: ${id}`)
}

export const expandBoundingCurvesCornerControlPoints = curry(
  (id: string, boundingCurves: BoundingCurves): BoundingCurves => {
    if (id === CornerPointId.TOP_LEFT) {
      const cornerPoint = boundingCurves.top.startPoint
      const curve1PointPosition = pointAdd(
        [EXPANSION_DISTANCE, -EXPANSION_DISTANCE],
        cornerPoint
      )
      const curve2PointPosition = pointAdd(
        [-EXPANSION_DISTANCE, EXPANSION_DISTANCE],
        cornerPoint
      )

      return updateControlPointPositions(
        boundingCurves,
        CurveId.TOP,
        CurvePointId.CONTROL_POINT_1,
        curve1PointPosition,
        CurveId.LEFT,
        CurvePointId.CONTROL_POINT_1,
        curve2PointPosition
      )
    }

    if (id === CornerPointId.TOP_RIGHT) {
      const cornerPoint = boundingCurves.top.endPoint
      const curve1PointPosition = pointAdd(-EXPANSION_DISTANCE, cornerPoint)

      const curve2PointPosition = pointAdd(
        {
          x: EXPANSION_DISTANCE,
          y: EXPANSION_DISTANCE,
        },
        cornerPoint
      )

      return updateControlPointPositions(
        boundingCurves,
        CurveId.TOP,
        CurvePointId.CONTROL_POINT_2,
        curve1PointPosition,
        CurveId.RIGHT,
        CurvePointId.CONTROL_POINT_1,
        curve2PointPosition
      )
    }

    if (id === CornerPointId.BOTTOM_LEFT) {
      const cornerPoint = boundingCurves.bottom.startPoint
      const curve1PointPosition = pointAdd(EXPANSION_DISTANCE, cornerPoint)
      const curve2PointPosition = pointAdd(-EXPANSION_DISTANCE, cornerPoint)

      return updateControlPointPositions(
        boundingCurves,
        CurveId.BOTTOM,
        CurvePointId.CONTROL_POINT_1,
        curve1PointPosition,
        CurveId.LEFT,
        CurvePointId.CONTROL_POINT_2,
        curve2PointPosition
      )
    }

    if (id === CornerPointId.BOTTOM_RIGHT) {
      const cornerPoint = boundingCurves.bottom.endPoint
      const curve1PointPosition = pointAdd(
        [-EXPANSION_DISTANCE, EXPANSION_DISTANCE],
        cornerPoint
      )

      const curve2PointPosition = pointAdd(
        [EXPANSION_DISTANCE, -EXPANSION_DISTANCE],
        cornerPoint
      )

      return updateControlPointPositions(
        boundingCurves,
        CurveId.BOTTOM,
        CurvePointId.CONTROL_POINT_2,
        curve1PointPosition,
        CurveId.RIGHT,
        CurvePointId.CONTROL_POINT_2,
        curve2PointPosition
      )
    }

    throw new Error(`Unrecognised point ID: ${id}`)
  }
)

export const zeroBoundingCurvesCornerControlPoints = curry(
  (id: string, boundingCurves: BoundingCurves) => {
    if (id === CornerPointId.TOP_LEFT) {
      const r = {
        ...boundingCurves,
        top: {
          ...boundingCurves.top,
          controlPoint1: {
            ...boundingCurves.top.startPoint,
          },
        },
        left: {
          ...boundingCurves.left,
          controlPoint1: {
            ...boundingCurves.left.startPoint,
          },
        },
      }
      return r
    }

    if (id === CornerPointId.TOP_RIGHT) {
      return {
        ...boundingCurves,
        top: {
          ...boundingCurves.top,
          controlPoint2: {
            ...boundingCurves.top.endPoint,
          },
        },
        right: {
          ...boundingCurves.right,
          controlPoint1: {
            ...boundingCurves.right.startPoint,
          },
        },
      }
    }

    if (id === CornerPointId.BOTTOM_LEFT) {
      return {
        ...boundingCurves,
        bottom: {
          ...boundingCurves.bottom,
          controlPoint1: {
            ...boundingCurves.bottom.startPoint,
          },
        },
        left: {
          ...boundingCurves.left,
          controlPoint2: {
            ...boundingCurves.left.endPoint,
          },
        },
      }
    }

    if (id === CornerPointId.BOTTOM_RIGHT) {
      return {
        ...boundingCurves,
        bottom: {
          ...boundingCurves.bottom,
          controlPoint2: {
            ...boundingCurves.bottom.endPoint,
          },
        },
        right: {
          ...boundingCurves.right,
          controlPoint2: {
            ...boundingCurves.right.endPoint,
          },
        },
      }
    }

    throw new Error(`Unrecognised point ID: ${id}`)
  }
)

export const toggleZeroExpandBoundingCurvesControlPoints = curry(
  (id: string, boundingCurves: BoundingCurves) => {
    if (id === CornerPointId.TOP_LEFT) {
      const top = boundingCurves[CurveId.TOP]
      const left = boundingCurves[CurveId.LEFT]

      if (
        pointsAreEqual(top.startPoint, top.controlPoint1) &&
        pointsAreEqual(left.startPoint, left.controlPoint1)
      ) {
        return expandBoundingCurvesCornerControlPoints(id, boundingCurves)
      }
      return zeroBoundingCurvesCornerControlPoints(id, boundingCurves)
    }

    if (id === CornerPointId.TOP_RIGHT) {
      const top = boundingCurves[CurveId.TOP]
      const right = boundingCurves[CurveId.RIGHT]

      if (
        pointsAreEqual(top.endPoint, top.controlPoint2) &&
        pointsAreEqual(right.startPoint, right.controlPoint1)
      ) {
        return expandBoundingCurvesCornerControlPoints(id, boundingCurves)
      }
      return zeroBoundingCurvesCornerControlPoints(id, boundingCurves)
    }

    if (id === CornerPointId.BOTTOM_LEFT) {
      const bottom = boundingCurves[CurveId.BOTTOM]
      const left = boundingCurves[CurveId.LEFT]

      if (
        pointsAreEqual(bottom.startPoint, bottom.controlPoint1) &&
        pointsAreEqual(left.endPoint, left.controlPoint2)
      ) {
        return expandBoundingCurvesCornerControlPoints(id, boundingCurves)
      }
      return zeroBoundingCurvesCornerControlPoints(id, boundingCurves)
    }

    if (id === CornerPointId.BOTTOM_RIGHT) {
      const bottom = boundingCurves[CurveId.BOTTOM]
      const right = boundingCurves[CurveId.RIGHT]

      if (
        pointsAreEqual(bottom.endPoint, bottom.controlPoint2) &&
        pointsAreEqual(right.endPoint, right.controlPoint2)
      ) {
        return expandBoundingCurvesCornerControlPoints(id, boundingCurves)
      }
      return zeroBoundingCurvesCornerControlPoints(id, boundingCurves)
    }

    throw new Error(`Unrecognised point ID: ${id}`)
  }
)

export const expandAllBoundingCurvesControlPoints = (
  boundingCurves: BoundingCurves
) =>
  reduce(
    (acc, nodeId) => expandBoundingCurvesCornerControlPoints(nodeId, acc),
    boundingCurves,
    CORNER_POINTS
  )

export const zeroAllBoundingCurvesControlPoints = (
  boundingCurves: BoundingCurves
) =>
  reduce(
    (acc, nodeId) => {
      return zeroBoundingCurvesCornerControlPoints(nodeId, acc)
    },
    boundingCurves,
    CORNER_POINTS
  )

export const getCornerPoints = ({ x, y, width, height }: Bounds) => {
  const rightBounds = x + width
  const bottomBounds = y + height

  return {
    cornerTopLeft: { x, y },
    cornerTopRight: { x: rightBounds, y },
    cornerBottomRight: { x: rightBounds, y: bottomBounds },
    cornerBottomLeft: { x, y: bottomBounds },
  }
}

export const getBoundingCurvesFromRectangularBounds = ({
  x,
  y,
  width,
  height,
}: Bounds) => {
  const corners = getCornerPoints({ x, y, width, height })

  const boundingCurves: BoundingCurves = {
    top: {
      startPoint: corners.cornerTopLeft,
      controlPoint1: corners.cornerTopLeft,
      controlPoint2: corners.cornerTopRight,
      endPoint: corners.cornerTopRight,
    },
    right: {
      startPoint: corners.cornerTopRight,
      controlPoint1: corners.cornerTopRight,
      controlPoint2: corners.cornerBottomRight,
      endPoint: corners.cornerBottomRight,
    },
    bottom: {
      startPoint: corners.cornerBottomLeft,
      controlPoint1: corners.cornerBottomLeft,
      controlPoint2: corners.cornerBottomRight,
      endPoint: corners.cornerBottomRight,
    },
    left: {
      startPoint: corners.cornerTopLeft,
      controlPoint1: corners.cornerTopLeft,
      controlPoint2: corners.cornerBottomLeft,
      endPoint: corners.cornerBottomLeft,
    },
  }

  return boundingCurves
}

export const getDefaultBoundingCurves = pipe(
  getDefaultBoundsForCanvas,
  getBoundingCurvesFromRectangularBounds,
  expandAllBoundingCurvesControlPoints
)
