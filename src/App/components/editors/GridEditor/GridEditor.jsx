import PropTypes from 'prop-types'
import { map, pipe } from 'ramda'
import { isArray } from 'ramda-adjunct'
import React from 'react'

import { typeProject } from '../../../../prop-types'
import ControlGroup from '../../controls/ControlGroup'
import NumericInput from '../../controls/NumericInput'
import SteppedInput from '../../controls/SteppedInput'
import Switch from '../../controls/Switch'
import TextInput from '../../controls/TextInput'
import EasingEditor from '../EasingEditor'

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

const GridEditor = ({
  project,
  setGridDefinitionValue,
  setProjectConfigValue,
}) => {
  const isAdvanced = project.config.grid.shouldUseComplexColumnsRows
  return (
    <div className="flex flex-col space-y-3">
      <ControlGroup
        label="Advanced"
        labelIsAfter
      >
        <Switch
          isSelected={isAdvanced}
          onChange={() =>
            setProjectConfigValue(
              [`grid`, `shouldUseComplexColumnsRows`],
              !isAdvanced
            )
          }
        />
      </ControlGroup>
      {project.config.grid.shouldUseComplexColumnsRows && (
        <div className="flex flex-col items-stretch space-y-2">
          <TextInput
            label="Columns"
            value={convertListIntoInputString(project.gridDefinition.columns)}
            onChange={(columnsString) => {
              const columns = stepsToInts(columnsString)
              setGridDefinitionValue([`columns`], columns)
            }}
          />
          <TextInput
            label="Rows"
            value={convertListIntoInputString(project.gridDefinition.rows)}
            onChange={(rowsString) => {
              const rows = stepsToInts(rowsString)
              setGridDefinitionValue([`rows`], rows)
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
                setGridDefinitionValue([`columns`], parseInt(columns))
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
                setGridDefinitionValue([`rows`], parseInt(rows))
              }}
            />
          </ControlGroup>
        </div>
      )}
      <div className="flex space-x-3 [&>*]:basis-1/2">
        <ControlGroup
          label="Gutter horizontal"
          direction="vertical"
        >
          <NumericInput
            min={0}
            step={0.1}
            value={project.gridDefinition.gutter[0]}
            onChange={(value) => {
              setGridDefinitionValue(
                [`gutter`],
                [value, project.gridDefinition.gutter[1]]
              )
            }}
          />
        </ControlGroup>
        <ControlGroup
          label="Gutter vertical"
          direction="vertical"
        >
          <NumericInput
            min={0}
            step={0.1}
            value={project.gridDefinition.gutter[1]}
            onChange={(value) => {
              setGridDefinitionValue(
                [`gutter`],
                [project.gridDefinition.gutter[0], value]
              )
            }}
          />
        </ControlGroup>
      </div>
      <div className="flex space-x-3 [&>*]:basis-1/2">
        <EasingEditor
          title="Easing horizontal"
          easing={project.gridDefinition.bezierEasing.xAxis}
          setEasing={(easing) => {
            setGridDefinitionValue([`bezierEasing`], {
              xAxis: easing,
              yAxis: project.gridDefinition.bezierEasing.yAxis,
            })
          }}
        />
        <EasingEditor
          title="Easing vertical"
          easing={project.gridDefinition.bezierEasing.yAxis}
          setEasing={(easing) => {
            setGridDefinitionValue([`bezierEasing`], {
              xAxis: project.gridDefinition.bezierEasing.xAxis,
              yAxis: easing,
            })
          }}
        />
      </div>
    </div>
  )
}

GridEditor.propTypes = {
  project: typeProject.isRequired,
  setProjectConfigValue: PropTypes.func.isRequired,
  setGridDefinitionValue: PropTypes.func.isRequired,
}

export default GridEditor
