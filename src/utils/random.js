import { reduce } from 'ramda'

import { CORNER_POINTS } from '../const'
import { expandBoundingCurvesCornerControlPoints } from './boundingCurves'
import { getRandomValueBetween } from './math'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const SHAPE_MIN_DISTANCE_FROM_EDGE = 100

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getCornerPoints = (x, y, width, height) => {
  const rightBounds = x + width
  const bottomBounds = y + height

  return {
    topLeft: { x, y },
    topRight: { x: rightBounds, y },
    bottomRight: { x: rightBounds, y: bottomBounds },
    bottomLeft: { x, y: bottomBounds },
  }
}

const getBoundingCurvesFromRectangularBounds = ({ x, y, width, height }) => {
  const corners = getCornerPoints(x, y, width, height)

  const boundingCurves = {
    top: {
      startPoint: corners.topLeft,
      controlPoint1: corners.topLeft,
      controlPoint2: corners.topRight,
      endPoint: corners.topRight,
    },
    right: {
      startPoint: corners.topRight,
      controlPoint1: corners.topRight,
      controlPoint2: corners.bottomRight,
      endPoint: corners.bottomRight,
    },
    bottom: {
      startPoint: corners.bottomLeft,
      controlPoint1: corners.bottomLeft,
      controlPoint2: corners.bottomRight,
      endPoint: corners.bottomRight,
    },
    left: {
      startPoint: corners.topLeft,
      controlPoint1: corners.topLeft,
      controlPoint2: corners.bottomLeft,
      endPoint: corners.bottomLeft,
    },
  }

  return boundingCurves
}

const getControlPoint = (
  point,
  { minDistanceX, maxDistanceX, minDistanceY, maxDistanceY }
) => {
  const offsetX = getRandomValueBetween(minDistanceX, maxDistanceX)
  const offsetY = getRandomValueBetween(minDistanceY, maxDistanceY)

  return {
    x: point.x + offsetX,
    y: point.y + offsetY,
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getRandomRectangleBounds = (
  availableWidth,
  availableHeight,
  minDistanceFromEdge
) => {
  const minWidth = 200
  const minHeight = 150

  // Generate random positions for the quadrilateral shape
  const maxWidth = availableWidth - minDistanceFromEdge * 2
  const maxHeight = availableHeight - minDistanceFromEdge * 2
  const width = getRandomValueBetween(minWidth, maxWidth)
  const height = getRandomValueBetween(minHeight, maxHeight)
  const x = getRandomValueBetween(
    minDistanceFromEdge,
    availableWidth - width - minDistanceFromEdge
  )
  const y = getRandomValueBetween(
    minDistanceFromEdge,
    availableHeight - height - minDistanceFromEdge
  )

  return { width, height, x, y }
}

export const addRandomControlPointsToCurves = (boundingCurves, maxDistance) => {
  const { top, right, bottom, left } = boundingCurves

  // Top left -
  top.controlPoint1 = getControlPoint(top.startPoint, {
    minDistanceX: maxDistance, // right
    maxDistanceX: 0,
    minDistanceY: -maxDistance, // down
    maxDistanceY: 0,
  })

  // Top right
  top.controlPoint2 = getControlPoint(top.endPoint, {
    minDistanceX: 0,
    maxDistanceX: -maxDistance, // left
    minDistanceY: -maxDistance, // down
    maxDistanceY: 0,
  })

  // Right top
  right.controlPoint1 = getControlPoint(right.startPoint, {
    minDistanceX: 0,
    maxDistanceX: maxDistance, // right
    minDistanceY: maxDistance, // down
    maxDistanceY: 0,
  })

  // Right bottom
  right.controlPoint2 = getControlPoint(right.endPoint, {
    minDistanceX: 0,
    maxDistanceX: maxDistance, // right
    minDistanceY: 0,
    maxDistanceY: -maxDistance, // up
  })

  // Left top
  left.controlPoint1 = getControlPoint(left.startPoint, {
    minDistanceX: -maxDistance, // left
    maxDistanceX: 0,
    minDistanceY: maxDistance, // down
    maxDistanceY: 0,
  })

  // Left bottom
  left.controlPoint2 = getControlPoint(left.endPoint, {
    minDistanceX: -maxDistance, // left
    maxDistanceX: 0,
    minDistanceY: -maxDistance, // up
    maxDistanceY: 0,
  })

  // Bottom left
  bottom.controlPoint1 = getControlPoint(bottom.startPoint, {
    minDistanceX: 0,
    maxDistanceX: maxDistance, // right
    minDistanceY: 0,
    maxDistanceY: maxDistance, // dpwn
  })

  // Bottom right
  bottom.controlPoint2 = getControlPoint(bottom.endPoint, {
    minDistanceX: 0,
    maxDistanceX: -maxDistance, // left
    minDistanceY: 0,
    maxDistanceY: maxDistance, // down
  })

  return boundingCurves
}

export const getRandomBoundingCurves = (canvas) => {
  const bounds = getRandomRectangleBounds(
    canvas.width,
    canvas.height,
    SHAPE_MIN_DISTANCE_FROM_EDGE
  )

  const boundingCurves = getBoundingCurvesFromRectangularBounds(bounds)

  // Loop through each corner and expand the control points
  return reduce(
    (acc, nodeId) => expandBoundingCurvesCornerControlPoints(nodeId, acc),
    boundingCurves,
    CORNER_POINTS
  )
}
