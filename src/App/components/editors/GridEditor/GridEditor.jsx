import PropTypes from 'prop-types'
import { map, pipe } from 'ramda'
import { isArray } from 'ramda-adjunct'
import React from 'react'

import { typeProject } from '../../../../prop-types'
import ControlGroup from '../../controls/ControlGroup'
import NumericInput from '../../controls/NumericInput'
import Switch from '../../controls/Switch'
import TextInput from '../../controls/TextInput'
import EasingEditor from '../EasingEditor'

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
          testId="grid-advanced-switch"
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
            testId="grid-advanced-columns-input"
            value={convertListIntoInputString(project.gridDefinition.columns)}
            onChange={(columnsString) => {
              const columns = stepsToInts(columnsString)
              setGridDefinitionValue([`columns`], columns)
            }}
          />
          <TextInput
            label="Rows"
            testId="grid-advanced-rows-input"
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
            <NumericInput
              name="columns"
              testId="grid-columns-input"
              value={project.gridDefinition.columns}
              onChange={(columns) => {
                setGridDefinitionValue([`columns`], parseInt(columns))
              }}
            />
          </ControlGroup>
          <ControlGroup
            direction="vertical"
            label="Rows"
          >
            <NumericInput
              name="rows"
              testId="grid-rows-input"
              value={project.gridDefinition.rows}
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
            testId="grid-gutter-horizontal-input"
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
            testId="grid-gutter-vertical-input"
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
          testId="grid-easing-horizontal-group"
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
          testId="grid-easing-vertical-group"
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
