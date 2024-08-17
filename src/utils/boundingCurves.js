import { curry, reduce } from 'ramda'

import {
  BOUNDS_POINT_IDS,
  CORNER_POINTS,
  CURVE_NAMES,
  POINT_NAMES,
} from '../const'
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
// Const
// -----------------------------------------------------------------------------

const EXPANSION_DISTANCE = 30

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getUpdatedLinkedControlPointPosition = (
  newPosition,
  linkedPoint,
  cornerPoint,
  { isMirrored }
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
  newPosition,
  cornerId,
  boundingCurves,
  linkedCurveName,
  linkedControlPointName,
  config
) => {
  const { isLinked, isMirrored } = config.bounds.corners[cornerId]

  // If the corner points are linked
  if (isLinked) {
    const cornerPoint =
      getBoundingCurvesCorners(boundingCurves)[cornerId].cornerPoint.point
    const linkedPoint = boundingCurves[linkedCurveName][linkedControlPointName]

    return getUpdatedLinkedControlPointPosition(
      newPosition,
      linkedPoint,
      cornerPoint,
      {
        isMirrored,
      }
    )
  }

  return boundingCurves[linkedCurveName][linkedControlPointName]
}

const updateControlPointPositions = (
  boundingCurves,
  curve1Name,
  controlPoint1Name,
  curve1PointPosition,
  curve2Name,
  controlPoint2Name,
  curve2PointPosition
) => {
  return {
    ...boundingCurves,
    [curve1Name]: {
      ...boundingCurves[curve1Name],
      [controlPoint1Name]: curve1PointPosition,
    },
    [curve2Name]: {
      ...boundingCurves[curve2Name],
      [controlPoint2Name]: curve2PointPosition,
    },
  }
}

const getUpdatedControlPointPositionsForCorner = (
  newPosition,
  cornerId,
  curveName,
  controlPointName,
  boundingCurves,
  linkedCurveName,
  linkedControlPointName,
  config
) => {
  const linkedControlPointPosition = getLinkedControlPointPosition(
    newPosition,
    cornerId,
    boundingCurves,
    linkedCurveName,
    linkedControlPointName,
    config
  )

  return updateControlPointPositions(
    boundingCurves,
    curveName,
    controlPointName,
    newPosition,
    linkedCurveName,
    linkedControlPointName,
    linkedControlPointPosition
  )
}

const getUpdatedCornerPointPosition = (
  newPosition,
  cornerPoint,
  boundingCurves,
  curve1Name,
  curve1PointName,
  controlPointCurve1Name,
  curve2Name,
  curve2PointName,
  controlPointCurve2Name
) => {
  // The control points move relative to the corner point
  const controlPoint1StartPosition =
    boundingCurves[curve1Name][controlPointCurve1Name]

  const controlPoint2StartPosition =
    boundingCurves[curve2Name][controlPointCurve2Name]

  const deltas = pointSubtract(cornerPoint, newPosition)
  const controlPointCurve1 = pointAdd(deltas, controlPoint1StartPosition)
  const controlPointCurve2 = pointAdd(deltas, controlPoint2StartPosition)

  return {
    ...boundingCurves,
    [curve1Name]: {
      ...boundingCurves[curve1Name],
      [curve1PointName]: newPosition,
      [controlPointCurve1Name]: controlPointCurve1,
    },
    [curve2Name]: {
      ...boundingCurves[curve2Name],
      [curve2PointName]: newPosition,
      [controlPointCurve2Name]: controlPointCurve2,
    },
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getBoundingCurvesCorners = (boundingCurves) => {
  return {
    [BOUNDS_POINT_IDS.TOP_LEFT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.TOP_LEFT,
        point: boundingCurves.top.startPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1,
        point: boundingCurves.top.controlPoint1,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2,
        point: boundingCurves.left.controlPoint1,
      },
    },
    [BOUNDS_POINT_IDS.TOP_RIGHT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT,
        point: boundingCurves.top.endPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1,
        point: boundingCurves.top.controlPoint2,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2,
        point: boundingCurves.right.controlPoint1,
      },
    },
    [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT,
        point: boundingCurves.bottom.startPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1,
        point: boundingCurves.bottom.controlPoint1,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2,
        point: boundingCurves.left.controlPoint2,
      },
    },
    [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT,
        point: boundingCurves.bottom.endPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1,
        point: boundingCurves.bottom.controlPoint2,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2,
        point: boundingCurves.right.controlPoint2,
      },
    },
  }
}

export const moveBoundingCurves = curry((position, boundingCurves) => ({
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
}))

export const moveBoundingCurvesToOrigin = moveBoundingCurves({ x: 0, y: 0 })

export const updateBoundingCurvesNodePosition = curry(
  (config, id, newPosition, boundingCurves) => {
    // Top Left
    if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
      return getUpdatedCornerPointPosition(
        newPosition,
        boundingCurves.top.startPoint,
        boundingCurves,
        CURVE_NAMES.TOP,
        POINT_NAMES.START_POINT,
        POINT_NAMES.CONTROL_POINT_1,
        CURVE_NAMES.LEFT,
        POINT_NAMES.START_POINT,
        POINT_NAMES.CONTROL_POINT_1
      )
    }

    if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.TOP_LEFT,
        CURVE_NAMES.TOP,
        POINT_NAMES.CONTROL_POINT_1,
        boundingCurves,
        CURVE_NAMES.LEFT,
        POINT_NAMES.CONTROL_POINT_1,
        config
      )
    }

    if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.TOP_LEFT,
        CURVE_NAMES.LEFT,
        POINT_NAMES.CONTROL_POINT_1,
        boundingCurves,
        CURVE_NAMES.TOP,
        POINT_NAMES.CONTROL_POINT_1,
        config
      )
    }

    if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
      return getUpdatedCornerPointPosition(
        newPosition,
        boundingCurves.top.endPoint,
        boundingCurves,
        CURVE_NAMES.TOP,
        POINT_NAMES.END_POINT,
        POINT_NAMES.CONTROL_POINT_2,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.START_POINT,
        POINT_NAMES.CONTROL_POINT_1
      )
    }

    if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.TOP_RIGHT,
        CURVE_NAMES.TOP,
        POINT_NAMES.CONTROL_POINT_2,
        boundingCurves,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.CONTROL_POINT_1,
        config
      )
    }

    if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.TOP_RIGHT,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.CONTROL_POINT_1,
        boundingCurves,
        CURVE_NAMES.TOP,
        POINT_NAMES.CONTROL_POINT_2,
        config
      )
      // BOTTOM LEFT
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
      return getUpdatedCornerPointPosition(
        newPosition,
        boundingCurves.bottom.startPoint,
        boundingCurves,
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.START_POINT,
        POINT_NAMES.CONTROL_POINT_1,
        CURVE_NAMES.LEFT,
        POINT_NAMES.END_POINT,
        POINT_NAMES.CONTROL_POINT_2
      )
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.BOTTOM_LEFT,
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.CONTROL_POINT_1,
        boundingCurves,
        CURVE_NAMES.LEFT,
        POINT_NAMES.CONTROL_POINT_2,
        config
      )
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.BOTTOM_LEFT,
        CURVE_NAMES.LEFT,
        POINT_NAMES.CONTROL_POINT_2,
        boundingCurves,
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.CONTROL_POINT_1,
        config
      )
      // BOTTOM RIGHT
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
      return getUpdatedCornerPointPosition(
        newPosition,
        boundingCurves.bottom.endPoint,
        boundingCurves,
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.END_POINT,
        POINT_NAMES.CONTROL_POINT_2,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.END_POINT,
        POINT_NAMES.CONTROL_POINT_2
      )
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.BOTTOM_RIGHT,
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.CONTROL_POINT_2,
        boundingCurves,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.CONTROL_POINT_2,
        config
      )
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2) {
      return getUpdatedControlPointPositionsForCorner(
        newPosition,
        BOUNDS_POINT_IDS.BOTTOM_RIGHT,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.CONTROL_POINT_2,
        boundingCurves,
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.CONTROL_POINT_2,
        config
      )
    }

    throw new Error(`Unrecognised point ID: ${id}`)
  }
)

export const expandBoundingCurvesCornerControlPoints = curry(
  (id, boundingCurves) => {
    if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
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
        CURVE_NAMES.TOP,
        POINT_NAMES.CONTROL_POINT_1,
        curve1PointPosition,
        CURVE_NAMES.LEFT,
        POINT_NAMES.CONTROL_POINT_1,
        curve2PointPosition
      )
    }

    if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
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
        CURVE_NAMES.TOP,
        POINT_NAMES.CONTROL_POINT_2,
        curve1PointPosition,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.CONTROL_POINT_1,
        curve2PointPosition
      )
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
      const cornerPoint = boundingCurves.bottom.startPoint
      const curve1PointPosition = pointAdd(EXPANSION_DISTANCE, cornerPoint)
      const curve2PointPosition = pointAdd(-EXPANSION_DISTANCE, cornerPoint)

      return updateControlPointPositions(
        boundingCurves,
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.CONTROL_POINT_1,
        curve1PointPosition,
        CURVE_NAMES.LEFT,
        POINT_NAMES.CONTROL_POINT_2,
        curve2PointPosition
      )
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
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
        CURVE_NAMES.BOTTOM,
        POINT_NAMES.CONTROL_POINT_2,
        curve1PointPosition,
        CURVE_NAMES.RIGHT,
        POINT_NAMES.CONTROL_POINT_2,
        curve2PointPosition
      )
    }

    throw new Error(`Unrecognised point ID: ${id}`)
  }
)

export const zeroBoundingCurvesCornerControlPoints = curry(
  (id, boundingCurves) => {
    if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
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

    if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
      console.log(`@@TOPRIGHT`)
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

    if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
      const r = {
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
      console.log(`@@ret`, r.left)
      return r
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
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
  (id, boundingCurves) => {
    if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
      const top = boundingCurves[CURVE_NAMES.TOP]
      const left = boundingCurves[CURVE_NAMES.LEFT]

      if (
        pointsAreEqual(top.startPoint, top.controlPoint1) &&
        pointsAreEqual(left.startPoint, left.controlPoint1)
      ) {
        return expandBoundingCurvesCornerControlPoints(id, boundingCurves)
      }
      return zeroBoundingCurvesCornerControlPoints(id, boundingCurves)
    }

    if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
      const top = boundingCurves[CURVE_NAMES.TOP]
      const right = boundingCurves[CURVE_NAMES.RIGHT]

      if (
        pointsAreEqual(top.endPoint, top.controlPoint2) &&
        pointsAreEqual(right.startPoint, right.controlPoint1)
      ) {
        return expandBoundingCurvesCornerControlPoints(id, boundingCurves)
      }
      return zeroBoundingCurvesCornerControlPoints(id, boundingCurves)
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
      const bottom = boundingCurves[CURVE_NAMES.BOTTOM]
      const left = boundingCurves[CURVE_NAMES.LEFT]

      if (
        pointsAreEqual(bottom.startPoint, bottom.controlPoint1) &&
        pointsAreEqual(left.endPoint, left.controlPoint2)
      ) {
        return expandBoundingCurvesCornerControlPoints(id, boundingCurves)
      }
      return zeroBoundingCurvesCornerControlPoints(id, boundingCurves)
    }

    if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
      const bottom = boundingCurves[CURVE_NAMES.BOTTOM]
      const right = boundingCurves[CURVE_NAMES.RIGHT]

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

export const expandAllBoundingCurvesControlPoints = (boundingCurves) =>
  reduce(
    (acc, nodeId) => expandBoundingCurvesCornerControlPoints(nodeId, acc),
    boundingCurves,
    CORNER_POINTS
  )

export const zeroAllBoundingCurvesControlPoints = (boundingCurves) =>
  reduce(
    (acc, nodeId) => {
      return zeroBoundingCurvesCornerControlPoints(nodeId, acc)
    },
    boundingCurves,
    CORNER_POINTS
  )
