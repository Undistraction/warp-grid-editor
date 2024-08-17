import { clampGridSquareToGridDimensions } from '../../../src/utils/grid'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`success`, () => {
  it(`doesn't clamp when both rows and columns are greater than x and y`, () => {
    expect(
      clampGridSquareToGridDimensions({ columns: 10, rows: 10 }, { x: 5, y: 5 })
    ).toEqual({ x: 5, y: 5 })
  })

  it(`clamps x when columns is less than x`, () => {
    expect(
      clampGridSquareToGridDimensions(
        { columns: 10, rows: 10 },
        { x: 15, y: 5 }
      )
    ).toEqual({ x: 9, y: 5 })
  })

  it(`clamps y when rows is less than y`, () => {
    expect(
      clampGridSquareToGridDimensions(
        { columns: 10, rows: 10 },
        { x: 5, y: 15 }
      )
    ).toEqual({ x: 5, y: 9 })
  })

  it(`clamps x and y when both columns and rows are less than x and y`, () => {
    expect(
      clampGridSquareToGridDimensions(
        { columns: 10, rows: 10 },
        { x: 15, y: 15 }
      )
    ).toEqual({ x: 9, y: 9 })
  })
})
