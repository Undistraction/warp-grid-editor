import { curry } from 'ramda'
import { isInteger } from 'ramda-adjunct'

import { clampNumberBetween } from './math'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const clampGridSquareToGridDimensions = curry(
  ({ columns, rows }, { x, y }) => {
    const columnsTotal = isInteger(columns) ? columns : columns.length
    const rowsTotal = isInteger(rows) ? rows : rows.length

    const gridSquare = {}

    const xInt = parseInt(x)
    const yInt = parseInt(y)

    if (isInteger(xInt)) {
      gridSquare.x = clampNumberBetween(0, columnsTotal - 1, x)
    }

    if (isInteger(yInt)) {
      gridSquare.y = clampNumberBetween(0, rowsTotal - 1, y)
    }

    return gridSquare
  }
)
