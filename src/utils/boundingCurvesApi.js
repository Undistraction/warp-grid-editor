import { assocPath, pipe } from 'ramda'

import { BOUNDS_POINT_IDS, CURVE_NAMES, POINT_NAMES } from '../const'
import { getDistanceBetweenPoints, getPointAtDistanceAndAngle } from './trig'

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
  const deltasToCornerPointFromNewPosition = {
    x: cornerPoint.x - newPosition.x,
    y: cornerPoint.y - newPosition.y,
  }

  const angleToCornerPointFromNewPositionRads = Math.atan2(
    deltasToCornerPointFromNewPosition.y,
    deltasToCornerPointFromNewPosition.x
  )

  const distanceToCornerFromNewPosition = getDistanceBetweenPoints(
    cornerPoint,
    newPosition
  )

  // Find the distance between the linked control point and the corner

  // Find a new position for the linked control point that maintains the same
  // distance but is at the new angle
  const distanceToCornerFromLinkedPoint = getDistanceBetweenPoints(
    cornerPoint,
    linkedPoint
  )
  const inverseAngle = angleToCornerPointFromNewPositionRads - Math.PI

  const linkedPointNew = getPointAtDistanceAndAngle(
    cornerPoint,
    inverseAngle,
    -(isMirrored
      ? distanceToCornerFromNewPosition
      : distanceToCornerFromLinkedPoint)
  )

  return linkedPointNew
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

  const deltas = {
    x: newPosition.x - cornerPoint.x,
    y: newPosition.y - cornerPoint.y,
  }

  const controlPointCurve1 = {
    x: controlPoint1StartPosition.x + deltas.x,
    y: controlPoint1StartPosition.y + deltas.y,
  }

  const controlPointCurve2 = {
    x: controlPoint2StartPosition.x + deltas.x,
    y: controlPoint2StartPosition.y + deltas.y,
  }

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
        point: boundingCurves?.top?.startPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1,
        point: boundingCurves?.top?.controlPoint1,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2,
        point: boundingCurves?.left?.controlPoint1,
      },
    },
    [BOUNDS_POINT_IDS.TOP_RIGHT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT,
        point: boundingCurves?.top?.endPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1,
        point: boundingCurves?.top?.controlPoint2,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2,
        point: boundingCurves?.right?.controlPoint1,
      },
    },
    [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT,
        point: boundingCurves?.bottom?.startPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1,
        point: boundingCurves?.bottom?.controlPoint1,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2,
        point: boundingCurves?.left?.controlPoint2,
      },
    },
    [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT,
        point: boundingCurves?.bottom?.endPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1,
        point: boundingCurves?.bottom?.controlPoint2,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2,
        point: boundingCurves?.right?.controlPoint2,
      },
    },
  }
}

export const translateBoundingCurves = (boundingCurves, position) => ({
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

export const updateBoundingCurvesNodePosition = (
  boundingCurves,
  config,
  id,
  newPosition
) => {
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
  } else if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1) {
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
  } else if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2) {
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
    // Top Right
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
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
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1) {
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
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2) {
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
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
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
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1) {
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
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2) {
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
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
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
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1) {
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
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2) {
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
}

export const expandBoundingCurvesControlPoints = (boundingCurves, id) => {
  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    const cornerPoint = boundingCurves.top.startPoint
    const curve1PointPosition = {
      x: cornerPoint.x + EXPANSION_DISTANCE,
      y: cornerPoint.y - EXPANSION_DISTANCE,
    }
    const curve2PointPosition = {
      x: cornerPoint.x - EXPANSION_DISTANCE,
      y: cornerPoint.y + EXPANSION_DISTANCE,
    }

    return updateControlPointPositions(
      boundingCurves,
      CURVE_NAMES.TOP,
      POINT_NAMES.CONTROL_POINT_1,
      curve1PointPosition,
      CURVE_NAMES.LEFT,
      POINT_NAMES.CONTROL_POINT_1,
      curve2PointPosition
    )
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
    const cornerPoint = boundingCurves.top.endPoint
    const curve1PointPosition = {
      x: cornerPoint.x - EXPANSION_DISTANCE,
      y: cornerPoint.y - EXPANSION_DISTANCE,
    }
    const curve2PointPosition = {
      x: cornerPoint.x + EXPANSION_DISTANCE,
      y: cornerPoint.y + EXPANSION_DISTANCE,
    }

    return updateControlPointPositions(
      boundingCurves,
      CURVE_NAMES.TOP,
      POINT_NAMES.CONTROL_POINT_2,
      curve1PointPosition,
      CURVE_NAMES.RIGHT,
      POINT_NAMES.CONTROL_POINT_1,
      curve2PointPosition
    )
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
    const cornerPoint = boundingCurves.bottom.startPoint
    const curve1PointPosition = {
      x: cornerPoint.x + EXPANSION_DISTANCE,
      y: cornerPoint.y + EXPANSION_DISTANCE,
    }
    const curve2PointPosition = {
      x: cornerPoint.x - EXPANSION_DISTANCE,
      y: cornerPoint.y - EXPANSION_DISTANCE,
    }

    return updateControlPointPositions(
      boundingCurves,
      CURVE_NAMES.BOTTOM,
      POINT_NAMES.CONTROL_POINT_1,
      curve1PointPosition,
      CURVE_NAMES.LEFT,
      POINT_NAMES.CONTROL_POINT_2,
      curve2PointPosition
    )
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
    const cornerPoint = boundingCurves.bottom.endPoint
    const curve1PointPosition = {
      x: cornerPoint.x - EXPANSION_DISTANCE,
      y: cornerPoint.y + EXPANSION_DISTANCE,
    }
    const curve2PointPosition = {
      x: cornerPoint.x + EXPANSION_DISTANCE,
      y: cornerPoint.y - EXPANSION_DISTANCE,
    }

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
}

export const zeroBoundingCurvesControlPoints = (boundingCurves, id) => {
  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    return pipe(
      assocPath(
        [CURVE_NAMES.TOP, POINT_NAMES.CONTROL_POINT_1],
        boundingCurves.top.startPoint
      ),
      assocPath(
        [CURVE_NAMES.LEFT, POINT_NAMES.CONTROL_POINT_1],
        boundingCurves.top.startPoint
      )
    )(boundingCurves)
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
    const cornerPoint = boundingCurves.top.endPoint
    boundingCurves.top.controlPoint2.x = cornerPoint.x
    boundingCurves.top.controlPoint2.y = cornerPoint.y
    boundingCurves.right.controlPoint1.x = cornerPoint.x
    boundingCurves.right.controlPoint1.y = cornerPoint.y
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
    const cornerPoint = boundingCurves.bottom.startPoint
    boundingCurves.bottom.controlPoint1.x = cornerPoint.x
    boundingCurves.bottom.controlPoint1.y = cornerPoint.y
    boundingCurves.left.controlPoint2.x = cornerPoint.x
    boundingCurves.left.controlPoint2.y = cornerPoint.y
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
    const cornerPoint = boundingCurves.bottom.endPoint
    boundingCurves.bottom.controlPoint2.x = cornerPoint.x
    boundingCurves.bottom.controlPoint2.y = cornerPoint.y
    boundingCurves.right.controlPoint2.x = cornerPoint.x
    boundingCurves.right.controlPoint2.y = cornerPoint.y
    return { ...boundingCurves }
  }
}
