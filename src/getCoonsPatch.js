import { getIntersectionsBetweenCurveSets, interpolatCurve } from './utils'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getCoonsPatch = (boundingCurves, grid) => {
  const curvesFromLeftToRight = []
  const curvesFromTopToBottom = []

  for (let column = 0; column <= grid.width; column++) {
    // Ranges from 0 to 1
    const ratioX = column / grid.width
    const curve = interpolatCurve(
      ratioX,
      { curve1: boundingCurves.top, curve2: boundingCurves.bottom },
      { curve3: boundingCurves.left, curve4: boundingCurves.right }
    )
    curvesFromLeftToRight.push(curve)
  }

  for (let row = 0; row <= grid.height; row++) {
    // Ranges from 0 to 1
    const ratioY = row / grid.height
    const curve = interpolatCurve(
      ratioY,
      { curve1: boundingCurves.left, curve2: boundingCurves.right },
      { curve3: boundingCurves.top, curve4: boundingCurves.bottom }
    )
    curvesFromTopToBottom.push(curve)
  }

  const intersections = getIntersectionsBetweenCurveSets(
    curvesFromLeftToRight,
    curvesFromTopToBottom
  )

  return {
    intersections,
    curvesFromLeftToRight,
    curvesFromTopToBottom,
    boundingCurves,
  }
}

export default getCoonsPatch
