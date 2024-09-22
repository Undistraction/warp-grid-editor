import { curry } from 'ramda'
import { isInteger } from 'ramda-adjunct'

// eslint-disable-next-line import/named
import { GridDefinition, GridSquare } from '../types'
import { clampNumberBetween } from './math'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const clampGridSquareToGridDimensions = curry(
  ({ columns, rows }: GridDefinition, { columnIdx, rowIdx }: GridSquare) => {
    const columnsTotal = isInteger(columns) ? columns : columns.length
    const rowsTotal = isInteger(rows) ? rows : rows.length

    return {
      columnIdx: clampNumberBetween(0, columnsTotal - 1, columnIdx),
      rowIdx: clampNumberBetween(0, rowsTotal - 1, rowIdx),
    }
  }
)
