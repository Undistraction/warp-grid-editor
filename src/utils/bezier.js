import { Matrix } from './matrix'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const binomialCoefficients = [[1], [1, 1]]

const binomial = (n, k) => {
  if (n === 0) return 1
  var lut = binomialCoefficients
  while (n >= lut.length) {
    var s = lut.length
    var nextRow = [1]
    for (var i = 1, prev = s - 1; i < s; i++) {
      nextRow[i] = lut[prev][i - 1] + lut[prev][i]
    }
    nextRow[s] = 1
    lut.push(nextRow)
  }
  return lut[n][k]
}

const formTMatrix = (row, n) => {
  // it's actually easier to create the transposed
  // version, and then (un)transpose that to get T!
  let data = []
  for (var i = 0; i < n; i++) {
    data.push(row.map((v) => v ** i))
  }
  const Tt = new Matrix(n, n, data)
  const T = Tt.transpose()
  return { T, Tt }
}

const generateBasisMatrix = (n) => {
  const M = new Matrix(n, n)

  // populate the main diagonal
  var k = n - 1
  for (let i = 0; i < n; i++) {
    M.set(i, i, binomial(k, i))
  }

  // compute the remaining values
  for (var c = 0, r; c < n; c++) {
    for (r = c + 1; r < n; r++) {
      var sign = (r + c) % 2 === 0 ? 1 : -1
      var value = binomial(r, c) * M.get(r, r)
      M.set(r, c, sign * value)
    }
  }

  return M
}

const fitCurveToPoints = (n, points, tvalues) => {
  // alright, let's do this thing:
  const tm = formTMatrix(tvalues, n),
    T = tm.T,
    Tt = tm.Tt,
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
