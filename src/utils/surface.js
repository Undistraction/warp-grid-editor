// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

import { COORDINATE } from '../const'
import { getBezierCurveFromPoints } from './bezier'

const getCoordinateOnSurface = (
  { top, bottom, left, right },
  u,
  v,
  axis,
  interpolatePointOnCurve
) => {
  const cornerBottomLeft = bottom.startPoint
  const cornerBottomRight = bottom.endPoint
  const cornerTopLeft = top.startPoint
  const cornerTopRight = top.endPoint

  return (
    (1 - v) * interpolatePointOnCurve(u, top)[axis] +
    v * interpolatePointOnCurve(u, bottom)[axis] +
    (1 - u) * interpolatePointOnCurve(v, left)[axis] +
    u * interpolatePointOnCurve(v, right)[axis] -
    (1 - u) * (1 - v) * cornerTopLeft[axis] -
    u * (1 - v) * cornerTopRight[axis] -
    (1 - u) * v * cornerBottomLeft[axis] -
    u * v * cornerBottomRight[axis]
  )
}

const addAll = (list) => list.reduce((total, value) => total + value)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getPointOnSurface = (
  boundingCurves,
  u,
  v,
  interpolatePointOnCurve
) => ({
  x: getCoordinateOnSurface(
    boundingCurves,
    u,
    v,
    COORDINATE.X,
    interpolatePointOnCurve
  ),
  y: getCoordinateOnSurface(
    boundingCurves,
    u,
    v,
    COORDINATE.Y,
    interpolatePointOnCurve
  ),
})

export const getCurvesOnSurfaceLeftToRight = (
  boundingCurves,
  columns,
  rows,
  interpolatePointOnCurve
) => {
  const columnsTotalCount = columns.length
  const rowsTotalCount = rows.length

  const columnsTotalValue = addAll(columns)
  const rowsTotalValue = addAll(rows)

  const curves = []
  let rowsTotalRatio = 0

  for (let rowIdx = 0; rowIdx <= rowsTotalCount; rowIdx++) {
    const curveSections = []
    const rowValue = rows[rowIdx]
    const rowRatio = rowValue / rowsTotalValue

    let columnsTotalRatio = 0

    for (let columnIdx = 0; columnIdx < columnsTotalCount; columnIdx++) {
      const columnValue = columns[columnIdx]
      const columnRatio = columnValue / columnsTotalValue
      const columnEndRatio = columnsTotalRatio + columnRatio

      const startPoint = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio,
        rowsTotalRatio,
        interpolatePointOnCurve
      )

      const endPoint = getPointOnSurface(
        boundingCurves,
        columnEndRatio,
        rowsTotalRatio,
        interpolatePointOnCurve
      )

      const midPoint1 = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio + columnRatio * 0.3333333,
        rowsTotalRatio,
        interpolatePointOnCurve
      )

      const midPoint2 = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio + columnRatio * 0.6666666,
        rowsTotalRatio,
        interpolatePointOnCurve
      )

      const curve = getBezierCurveFromPoints({
        startPoint,
        midPoint1,
        midPoint2,
        endPoint,
      })

      columnsTotalRatio = columnsTotalRatio + columnRatio
      curveSections.push(curve)
    }

    rowsTotalRatio = rowsTotalRatio + rowRatio
    curves.push(curveSections)
  }

  return curves
}

export const getCurvesOnSurfaceTopToBottom = (
  boundingCurves,
  columns,
  rows,
  interpolatePointOnCurve
) => {
  const columnsTotalCount = columns.length
  const rowsTotalCount = rows.length

  const columnsTotalValue = addAll(columns)
  const rowsTotalValue = addAll(rows)

  const curves = []
  let columnsTotalRatio = 0

  for (let columnIdx = 0; columnIdx <= columnsTotalCount; columnIdx++) {
    const curveSections = []
    const columnValue = columns[columnIdx]
    const columnRatio = columnValue / columnsTotalValue

    let rowsTotalRatio = 0

    for (let rowIdx = 0; rowIdx < rowsTotalCount; rowIdx++) {
      const rowValue = rows[rowIdx]
      const rowRatio = rowValue / rowsTotalValue
      const rowEndRatio = rowsTotalRatio + rowRatio

      const startPoint = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio,
        rowsTotalRatio,
        interpolatePointOnCurve
      )

      const endPoint = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio,
        rowEndRatio,
        interpolatePointOnCurve
      )
      const midPoint1 = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio,
        rowsTotalRatio + rowRatio * 0.3333333,
        interpolatePointOnCurve
      )

      const midPoint2 = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio,
        rowsTotalRatio + rowRatio * 0.6666666,
        interpolatePointOnCurve
      )

      const curve = getBezierCurveFromPoints({
        startPoint,
        midPoint1,
        midPoint2,
        endPoint,
      })

      rowsTotalRatio = rowsTotalRatio + rowRatio

      curveSections.push(curve)
    }
    columnsTotalRatio = columnsTotalRatio + columnRatio
    curves.push(curveSections)
  }

  return curves
}

export const getGridIntersections = (
  boundingCurves,
  columns,
  rows,
  interpolatePointOnCurve
) => {
  const intersections = []
  const columnsTotal = columns.length
  const columnsTotalValue = addAll(columns)
  const rowsTotal = rows.length
  const rowsTotalValue = addAll(rows)

  let rowsTotalRatio = 0

  for (let rowIdx = 0; rowIdx <= rowsTotal; rowIdx++) {
    const rowValue = rows[rowIdx]
    const rowRatio = rowValue / rowsTotalValue

    let columnsTotalRatio = 0

    for (let columnIdx = 0; columnIdx <= columnsTotal; columnIdx++) {
      const columnValue = columns[columnIdx]
      const columnRatio = columnValue / columnsTotalValue

      const point = getPointOnSurface(
        boundingCurves,
        columnsTotalRatio,
        rowsTotalRatio,
        interpolatePointOnCurve
      )

      intersections.push(point)
      columnsTotalRatio = columnsTotalRatio + columnRatio
    }
    rowsTotalRatio = rowsTotalRatio + rowRatio
  }

  return intersections
}
