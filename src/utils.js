import { curry, reduce } from 'ramda'
import { isInteger } from 'ramda-adjunct'

import { CORNER_POINTS } from './const'
import { expandBoundingCurvesCornerControlPoints } from './utils/boundingCurves'
import { clampNumberBetween } from './utils/math'
import { getRandomRectangleBounds } from './utils/random'

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

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getRandomBoundingCurves = (canvas) => {
  const bounds = getRandomRectangleBounds(
    canvas.width,
    canvas.height,
    SHAPE_MIN_DISTANCE_FROM_EDGE
  )

  const boundingCurves = getBoundingCurvesFromRectangularBounds(bounds)

  // Loop through each corner and expand the control points
  return reduce(
    (acc, name) => expandBoundingCurvesCornerControlPoints(acc, name),
    boundingCurves,
    CORNER_POINTS
  )
}

export const clampGridSquareToGridDimensions = curry(
  ({ columns, rows }, { x, y }) => {
    const columnsTotal = isInteger(columns) ? columns : columns.length
    const rowsTotal = isInteger(rows) ? rows : rows.length

    const gridSquare = {}

    const xInt = parseInt(x)
    const yInt = parseInt(y)

    if (isInteger(xInt)) {
      gridSquare.x = clampNumberBetween(0, columnsTotal - 1, x)
    }

    if (isInteger(yInt)) {
      gridSquare.y = clampNumberBetween(0, rowsTotal - 1, y)
    }

    return gridSquare
  }
)
