// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getRandomValueBetween = (min, max) => {
  return Math.random() * (max - min) + min
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

export const getRandomBounds = (
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
  const x = getRandomValueBetween(minDistanceFromEdge, maxWidth - width)
  const y = getRandomValueBetween(minDistanceFromEdge, maxHeight - height)

  return { width, height, x, y }
}

export const addRandomControlPointsToCurves = (boundingCurves, maxDistance) => {
  const { top, right, bottom, left } = boundingCurves

  top.controlPoint1 = getControlPoint(top.startPoint, {
    minDistanceX: 0,
    maxDistanceX: 0,
    minDistanceY: -maxDistance,
    maxDistanceY: 0,
  })

  top.controlPoint2 = getControlPoint(top.endPoint, {
    minDistanceX: -maxDistance,
    maxDistanceX: 0,
    minDistanceY: -maxDistance,
    maxDistanceY: 0,
  })

  right.controlPoint1 = getControlPoint(right.startPoint, {
    minDistanceX: 0,
    maxDistanceX: maxDistance,
    minDistanceY: 0,
    maxDistanceY: maxDistance,
  })

  right.controlPoint2 = getControlPoint(right.endPoint, {
    minDistanceX: 0,
    maxDistanceX: maxDistance,
    minDistanceY: -maxDistance,
    maxDistanceY: 0,
  })

  left.controlPoint1 = getControlPoint(left.startPoint, {
    minDistanceX: -maxDistance,
    maxDistanceX: 0,
    minDistanceY: 0,
    maxDistanceY: maxDistance,
  })

  left.controlPoint2 = getControlPoint(left.endPoint, {
    minDistanceX: -maxDistance,
    maxDistanceX: 0,
    minDistanceY: -maxDistance,
    maxDistanceY: 0,
  })

  bottom.controlPoint1 = getControlPoint(bottom.startPoint, {
    minDistanceX: 0,
    maxDistanceX: maxDistance,
    minDistanceY: 0,
    maxDistanceY: maxDistance,
  })

  bottom.controlPoint2 = getControlPoint(bottom.endPoint, {
    minDistanceX: 0,
    maxDistanceX: -maxDistance,
    minDistanceY: 0,
    maxDistanceY: maxDistance,
  })

  return boundingCurves
}
