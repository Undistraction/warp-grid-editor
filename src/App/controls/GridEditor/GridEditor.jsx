import PropTypes from 'prop-types'
import { isArray } from 'ramda-adjunct'
import React from 'react'
import { typeConfig, typeGrid } from '../../../prop-types'
import NumericInput from '../NumericInput'
import SteppedInput from '../SteppedInput'
import Switch from '../Switch'
import TextInput from '../TextInput'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const COLUMNS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50]
const ROWS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getItemsFromString = (string) => {
  const list = string.split(`,`)
  const trimmed = list.map((value) => value.trim())
  return trimmed.filter(Number)
}

const convertListIntoInputString = (listOrNumber) => {
  return isArray(listOrNumber) ? listOrNumber.join(`, `) : listOrNumber
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const GridEditor = ({ grid, setGrid, config, setConfig }) => {
  return (
    <div className="flex flex-col space-y-3">
      <Switch
        label="Advanced"
        isSelected={config.grid.shouldUseComplexColumnsRows}
        onChange={() =>
          setConfig({
            ...config,
            grid: {
              ...config.grid,
              shouldUseComplexColumnsRows:
                !config.grid.shouldUseComplexColumnsRows,
            },
          })
        }
      />
      {config.grid.shouldUseComplexColumnsRows && (
        <div className="flex flex-col items-stretch space-y-2">
          <TextInput
            label="Columns"
            value={convertListIntoInputString(grid.columns)}
            onChange={(columnsString) => {
              const columns = getItemsFromString(columnsString)
              setGrid({
                ...grid,
                columns: columns.map(parseFloat),
              })
            }}
          />
          <TextInput
            label="Rows"
            value={convertListIntoInputString(grid.rows)}
            onChange={(rowsString) => {
              const rows = getItemsFromString(rowsString)
              setGrid({
                ...grid,
                rows: rows.map(parseFloat),
              })
            }}
          />
        </div>
      )}

      {!config.grid.shouldUseComplexColumnsRows && (
        <div className="flex [&>*]:basis-1/2">
          <SteppedInput
            label="Columns"
            value={grid.columns}
            options={COLUMNS_OPTIONS}
            onChange={(columns) => {
              setGrid({
                ...grid,
                columns: parseInt(columns),
              })
            }}
          />
          <SteppedInput
            label="Rows"
            value={grid.rows}
            options={ROWS_OPTIONS}
            onChange={(rows) => {
              setGrid({
                ...grid,
                rows: parseInt(rows),
              })
            }}
          />
        </div>
      )}
      <div className="flex flex-col items-stretch space-y-2">
        <NumericInput
          label="Gutter"
          value={grid.gutter}
          min={0}
          step={0.1}
          labelIsAfter
          onChange={(value) => {
            setGrid({
              ...grid,
              gutter: value,
            })
          }}
        />
      </div>
    </div>
  )
}

GridEditor.propTypes = {
  grid: typeGrid.isRequired,
  setGrid: PropTypes.func.isRequired,
  config: typeConfig,
  setConfig: PropTypes.func.isRequired,
}

export default GridEditor
