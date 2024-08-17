import { flatten, map } from 'ramda'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getMoveForPoint = ({ x, y }) => `M${x} ${y}`

const getCubicBezierToPoint = ({ controlPoint1, controlPoint2, endPoint }) =>
  `C${controlPoint1.x} ${controlPoint1.y} ${controlPoint2.x} ${controlPoint2.y} ${endPoint.x} ${endPoint.y}`

const getPathForBounds = ({ top, bottom, left, right }) => {
  const bottomReversed = {
    endPoint: bottom.startPoint,
    controlPoint1: bottom.controlPoint2,
    controlPoint2: bottom.controlPoint1,
  }

  const leftReversed = {
    endPoint: left.startPoint,
    controlPoint1: left.controlPoint2,
    controlPoint2: left.controlPoint1,
  }

  return `${getMoveForPoint(top.startPoint)} ${getCubicBezierToPoint(top)} ${getCubicBezierToPoint(right)} ${getCubicBezierToPoint(bottomReversed)} ${getCubicBezierToPoint(leftReversed)} Z`
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// Run through each subcell, rendering the palette colours
export const getSvgForGrid = (grid, { width, height }) => {
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
