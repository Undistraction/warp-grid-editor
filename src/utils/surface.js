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
    // (1-v)C1(u) +
    (1 - v) * interpolatePointOnCurve(u, top)[axis] +
    // vC2(u)
    v * interpolatePointOnCurve(u, bottom)[axis] +
    // (1-u)C3(v) +
    (1 - u) * interpolatePointOnCurve(v, left)[axis] +
    // uC4(v) -
    u * interpolatePointOnCurve(v, right)[axis] -
    // (1-u)(1-v)P00
    (1 - u) * (1 - v) * cornerTopLeft[axis] -
    // u(1-v)P10
    u * (1 - v) * cornerTopRight[axis] -
    // (1−u)vP01
    (1 - u) * v * cornerBottomLeft[axis] -
    u * v * cornerBottomRight[axis]
  )
}

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
  const columnsTotal = columns.length
  const rowsTotal = rows.length

  const columnWidthRatio = 1 / columnsTotal
  const midPoint1Ratio = columnWidthRatio * 0.3333333
  const midPoint2Ratio = columnWidthRatio * 0.6666666

  const curves = []

  for (var rowIdx = 0; rowIdx <= rowsTotal; rowIdx++) {
    const curveSections = []
    const ratioY = rowIdx / rowsTotal
    for (var columnIdx = 0; columnIdx < columnsTotal; columnIdx++) {
      const ratioX = columnIdx / columnsTotal

      const startPoint = getPointOnSurface(
        boundingCurves,
        ratioX,
        ratioY,
        interpolatePointOnCurve
      )
      const endPoint = getPointOnSurface(
        boundingCurves,
        ratioX + columnWidthRatio,
        ratioY,
        interpolatePointOnCurve
      )
      const midPoint1 = getPointOnSurface(
        boundingCurves,
        ratioX + midPoint1Ratio,
        ratioY,
        interpolatePointOnCurve
      )

      const midPoint2 = getPointOnSurface(
        boundingCurves,
        ratioX + midPoint2Ratio,
        ratioY,
        interpolatePointOnCurve
      )
      const curve = getBezierCurveFromPoints(
        startPoint,
        midPoint1,
        midPoint2,
        endPoint
      )

      curveSections.push(curve)
    }
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
  const columnsTotal = columns.length
  const rowsTotal = rows.length

  const rowWidthRatio = 1 / rowsTotal
  const midPoint1Ratio = rowWidthRatio * 0.3333333
  const midPoint2Ratio = rowWidthRatio * 0.6666666

  const curves = []

  for (var columnIdx = 0; columnIdx <= columnsTotal; columnIdx++) {
    const curveSections = []
    const ratioX = columnIdx / columnsTotal
    for (var rowIdx = 0; rowIdx < rowsTotal; rowIdx++) {
      const ratioY = rowIdx / rowsTotal

      const startPoint = getPointOnSurface(
        boundingCurves,
        ratioX,
        ratioY,
        interpolatePointOnCurve
      )
      const endPoint = getPointOnSurface(
        boundingCurves,
        ratioX,
        ratioY + rowWidthRatio,
        interpolatePointOnCurve
      )
      const midPoint1 = getPointOnSurface(
        boundingCurves,
        ratioX,
        ratioY + midPoint1Ratio,
        interpolatePointOnCurve
      )

      const midPoint2 = getPointOnSurface(
        boundingCurves,
        ratioX,
        ratioY + midPoint2Ratio,
        interpolatePointOnCurve
      )
      const curve = getBezierCurveFromPoints(
        startPoint,
        midPoint1,
        midPoint2,
        endPoint
      )

      curveSections.push(curve)
    }
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
  const rowsTotal = rows.length

  for (var rowIdx = 0; rowIdx <= rowsTotal; rowIdx++) {
    for (var columnIdx = 0; columnIdx <= columnsTotal; columnIdx++) {
      const ratioX = columnIdx / columnsTotal
      const ratioY = rowIdx / rowsTotal
      const point = getPointOnSurface(
        boundingCurves,
        ratioX,
        ratioY,
        interpolatePointOnCurve
      )
      intersections.push(point, ratioX, ratioY)
    }
  }

  return intersections
}
