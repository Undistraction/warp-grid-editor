import { flatten, map } from 'ramda'

import type { BoundingCurves, Curve, Point, Size, WarpGrid } from '../types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getMoveForPoint = ({ x, y }: Point) => `M ${x} ${y}`

export const getCubicBezierToPoint = ({
  controlPoint1,
  controlPoint2,
  endPoint,
}: Curve) => {
  return `C ${controlPoint1.x} ${controlPoint1.y} ${controlPoint2.x} ${controlPoint2.y} ${endPoint.x} ${endPoint.y}`
}

export const getPathForBounds = ({
  top,
  bottom,
  left,
  right,
}: BoundingCurves) => {
  const bottomReversed = {
    startPoint: bottom.endPoint,
    endPoint: bottom.startPoint,
    controlPoint1: bottom.controlPoint2,
    controlPoint2: bottom.controlPoint1,
  }

  const leftReversed = {
    startPoint: left.endPoint,
    endPoint: left.startPoint,
    controlPoint1: left.controlPoint2,
    controlPoint2: left.controlPoint1,
  }

  return `${getMoveForPoint(top.startPoint)} ${getCubicBezierToPoint(top)} ${getCubicBezierToPoint(right)} ${getCubicBezierToPoint(bottomReversed)} ${getCubicBezierToPoint(leftReversed)} Z`
}

// Run through each subcell, rendering the palette colours
export const getSvgForGrid = (grid: WarpGrid, { width, height }: Size) => {
  const gridCells = grid.getAllCellBounds()
  const gridCellsFlat = flatten(gridCells)

  const elements = map((cell) => {
    const paths = getPathForBounds(cell)
    return `<path stroke="black" fill="transparent" d="${paths}" />`
  }, gridCellsFlat)

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  overflow="visible"
  viewBox="0 0 ${width} ${height}"
  width="${width}px"
  height="${height}px"
>
  ${elements.join(`\n  `)}
</svg>`
}
