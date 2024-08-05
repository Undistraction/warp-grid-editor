import PropTypes from 'prop-types'
import { assocPath, map, pipe } from 'ramda'
import { isArray } from 'ramda-adjunct'
import React from 'react'
import { typeProject } from '../../../../prop-types'
import ControlGroup from '../../controls/ControlGroup'
import NumericInput from '../../controls/NumericInput'
import SteppedInput from '../../controls/SteppedInput'
import Switch from '../../controls/Switch'
import TextInput from '../../controls/TextInput'

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

const stepsToInts = pipe(getItemsFromString, map(parseFloat))

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const GridEditor = ({ project, setProject }) => {
  const isAdvanced = project.config.grid.shouldUseComplexColumnsRows
  return (
    <div className="flex flex-col space-y-3">
      <Switch
        label="Advanced"
        isSelected={isAdvanced}
        onChange={() =>
          setProject(
            assocPath(
              [`config`, `grid`, `shouldUseComplexColumnsRows`],
              !isAdvanced,
              project
            )
          )
        }
      />
      {project.config.grid.shouldUseComplexColumnsRows && (
        <div className="flex flex-col items-stretch space-y-2">
          <TextInput
            label="Columns"
            value={convertListIntoInputString(project.gridDefinition.columns)}
            onChange={(columnsString) => {
              const columns = stepsToInts(columnsString)
              setProject(
                assocPath([`gridDefinition`, `columns`], columns, project)
              )
            }}
          />
          <TextInput
            label="Rows"
            value={convertListIntoInputString(project.gridDefinition.rows)}
            onChange={(rowsString) => {
              const rows = stepsToInts(rowsString)
              setProject(assocPath([`gridDefinition`, `rows`], rows, project))
            }}
          />
        </div>
      )}

      {!project.config.grid.shouldUseComplexColumnsRows && (
        <div className="flex space-x-3 [&>*]:basis-1/2">
          <ControlGroup
            direction="vertical"
            label="Columns"
          >
            <SteppedInput
              name="columns"
              value={project.gridDefinition.columns}
              options={COLUMNS_OPTIONS}
              onChange={(columns) => {
                setProject(
                  assocPath(
                    [`gridDefinition`, `columns`],
                    parseInt(columns),
                    project
                  )
                )
              }}
            />
          </ControlGroup>
          <ControlGroup
            direction="vertical"
            label="Rows"
          >
            <SteppedInput
              name="rows"
              value={project.gridDefinition.rows}
              options={ROWS_OPTIONS}
              onChange={(rows) => {
                setProject(
                  assocPath([`gridDefinition`, `rows`], parseInt(rows), project)
                )
              }}
            />
          </ControlGroup>
        </div>
      )}
      <div className="flex flex-col items-stretch space-y-2">
        <ControlGroup
          labelIsAfter
          label="Gutter"
          isEven
        >
          <NumericInput
            min={0}
            step={0.1}
            labelIsAfter
            onChange={(value) => {
              setProject(
                assocPath([`gridDefinition`, `gutter`], value, project)
              )
            }}
          />
        </ControlGroup>
      </div>
    </div>
  )
}

GridEditor.propTypes = {
  project: typeProject.isRequired,
  setProject: PropTypes.func.isRequired,
}

export default GridEditor
