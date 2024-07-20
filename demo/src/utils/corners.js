import { getDistanceBetweenPoints } from '../../../src/utils/interpolate'
import { BOUNDS_POINT_IDS, CURVE_NAMES, POINT_NAMES } from '../const'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const EXPANSION_DISTANCE = 30

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getPointAtDistanceAndAngle = (origin, angleRads, distance) => {
  return {
    x: origin.x + Math.round(Math.cos(angleRads) * distance),
    y: origin.y + Math.round(Math.sin(angleRads) * distance),
  }
}

const getUpdatedLinkedControlPoint = (
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
  console.log('= ', isMirrored)

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
  console.log('>>', config)
  const { isLinked, isMirrored } = config[cornerId]

  // If the corner points are linked
  if (isLinked) {
    const cornerPoint = getCorners(boundingCurves)[cornerId].cornerPoint.point
    const linkedPoint = boundingCurves[linkedCurveName][linkedControlPointName]
    return getUpdatedLinkedControlPoint(newPosition, linkedPoint, cornerPoint, {
      isMirrored,
    })
  }

  return boundingCurves[linkedCurveName][linkedControlPointName]
}

const getUpdatedControlPointPosition = (
  newPosition,
  cornerId,
  curveName,
  controlPointName,
  boundingCurves,
  linkedCurveName,
  linkedControlPointName,
  config
) => {
  const linkedControlPoint = getLinkedControlPointPosition(
    newPosition,
    cornerId,
    boundingCurves,
    linkedCurveName,
    linkedControlPointName,
    config
  )

  return {
    ...boundingCurves,
    [curveName]: {
      ...boundingCurves[curveName],
      [controlPointName]: newPosition,
    },
    [linkedCurveName]: {
      ...boundingCurves[linkedCurveName],
      [linkedControlPointName]: linkedControlPoint,
    },
  }
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

export const updateNodePosition = (boundingCurves, id, newPosition, config) => {
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
    return getUpdatedControlPointPosition(
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
    return getUpdatedControlPointPosition(
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
    return getUpdatedControlPointPosition(
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
    return getUpdatedControlPointPosition(
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
    return getUpdatedControlPointPosition(
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
    return getUpdatedControlPointPosition(
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
    return getUpdatedControlPointPosition(
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
    return getUpdatedControlPointPosition(
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

export const expandControlPoints = (boundingCurves, id) => {
  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    const cornerPoint = boundingCurves.top.startPoint
    boundingCurves.top.controlPoint1.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.top.controlPoint1.y = cornerPoint.y - EXPANSION_DISTANCE
    boundingCurves.left.controlPoint1.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.left.controlPoint1.y = cornerPoint.y + EXPANSION_DISTANCE
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
    const cornerPoint = boundingCurves.top.endPoint
    boundingCurves.top.controlPoint2.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.top.controlPoint2.y = cornerPoint.y - EXPANSION_DISTANCE
    boundingCurves.right.controlPoint1.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.right.controlPoint1.y = cornerPoint.y + EXPANSION_DISTANCE
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
    const cornerPoint = boundingCurves.bottom.startPoint
    boundingCurves.bottom.controlPoint1.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.bottom.controlPoint1.y = cornerPoint.y + EXPANSION_DISTANCE
    boundingCurves.left.controlPoint2.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.left.controlPoint2.y = cornerPoint.y - EXPANSION_DISTANCE
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
    const cornerPoint = boundingCurves.bottom.endPoint
    boundingCurves.bottom.controlPoint2.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.bottom.controlPoint2.y = cornerPoint.y + EXPANSION_DISTANCE
    boundingCurves.right.controlPoint2.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.right.controlPoint2.y = cornerPoint.y - EXPANSION_DISTANCE
    return { ...boundingCurves }
  }
}

export const zeroControlPoints = (boundingCurves, id) => {
  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    const cornerPoint = boundingCurves.top.startPoint
    boundingCurves.top.controlPoint1.x = cornerPoint.x
    boundingCurves.top.controlPoint1.y = cornerPoint.y
    boundingCurves.left.controlPoint1.x = cornerPoint.x
    boundingCurves.left.controlPoint1.y = cornerPoint.y
    return { ...boundingCurves }
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

export const getCorners = (boundingCurves) => {
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
