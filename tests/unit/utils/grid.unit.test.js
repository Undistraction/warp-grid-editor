import { clampGridSquareToGridDimensions } from '../../../src/utils/grid'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`success`, () => {
  it(`doesn't clamp when both rows and columns are greater than x and y`, () => {
    expect(
      clampGridSquareToGridDimensions(
        { columns: 10, rows: 10 },
        { columnIdx: 5, rowIdx: 5 }
      )
    ).toEqual({ columnIdx: 5, rowIdx: 5 })
  })

  it(`clamps x when columns is less than x`, () => {
    expect(
      clampGridSquareToGridDimensions(
        { columns: 10, rows: 10 },
        { columnIdx: 15, rowIdx: 5 }
      )
    ).toEqual({ columnIdx: 9, rowIdx: 5 })
  })

  it(`clamps y when rows is less than y`, () => {
    expect(
      clampGridSquareToGridDimensions(
        { columns: 10, rows: 10 },
        { columnIdx: 5, rowIdx: 15 }
      )
    ).toEqual({ columnIdx: 5, rowIdx: 9 })
  })

  it(`clamps x and y when both columns and rows are less than x and y`, () => {
    expect(
      clampGridSquareToGridDimensions(
        { columns: 10, rows: 10 },
        { columnIdx: 15, rowIdx: 15 }
      )
    ).toEqual({ columnIdx: 9, rowIdx: 9 })
  })
})
