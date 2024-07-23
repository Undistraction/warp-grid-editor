import { Matrix, generateBasisMatrix, getRatioMatrix } from './matrix'

const fitCurveToPoints = (n, points, tvalues) => {
  // alright, let's do this thing:
  const tm = getRatioMatrix(tvalues, n),
    T = tm.transposedMatrix,
    Tt = tm.matrix,
    M = generateBasisMatrix(n),
    M1 = M.invert(),
    TtT1 = Tt.multiply(T).invert(),
    step1 = TtT1.multiply(Tt),
    step2 = M1.multiply(step1),
    // almost there...
    X = new Matrix(points.map((v) => [v.x])),
    Cx = step2.multiply(X),
    x = Cx.data,
    // almost...
    Y = new Matrix(points.map((v) => [v.y])),
    Cy = step2.multiply(Y),
    y = Cy.data,
    // last step!
    bpoints = x.map((r, i) => ({ x: r[0], y: y[i][0] }))

  return bpoints
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getBezierCurveFromPoints = (
  points,
  ratioMidpoint1,
  ratioMidpoint2
) => {
  const result = fitCurveToPoints(
    4,
    [points.startPoint, points.midPoint1, points.midPoint2, points.endPoint],
    [0, ratioMidpoint1, ratioMidpoint2, 1]
  )

  return {
    startPoint: result[0],
    controlPoint1: result[1],
    controlPoint2: result[2],
    endPoint: result[3],
  }
}
