import warpGrid from 'warp-grid'

import { getSvgForGrid } from '../../../src/utils/svg'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const BOUNDING_CURVES = {
  top: {
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 100, y: 0 },
    controlPoint1: { x: 10, y: -10 },
    controlPoint2: { x: 90, y: -10 },
  },
  bottom: {
    startPoint: { x: 0, y: 100 },
    endPoint: { x: 100, y: 100 },
    controlPoint1: { x: -10, y: 110 },
    controlPoint2: { x: 110, y: 110 },
  },
  left: {
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 100 },
    controlPoint1: { x: -10, y: -10 },
    controlPoint2: { x: -10, y: 110 },
  },
  right: {
    startPoint: { x: 100, y: 0 },
    endPoint: { x: 100, y: 100 },
    controlPoint1: { x: 110, y: -10 },
    controlPoint2: { x: 110, y: 110 },
  },
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`getSvgForGrid`, () => {
  it(`returns an svg document for the supplied grid`, () => {
    const grid = warpGrid(BOUNDING_CURVES, { columns: 3, rows: 5 })
    expect(getSvgForGrid(grid, { width: 110, height: 110 })).toMatchSnapshot()
  })
})
