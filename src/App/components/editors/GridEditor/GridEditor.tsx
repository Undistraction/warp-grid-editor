import { map, pipe } from 'ramda'
import { isArray } from 'ramda-adjunct'

import type {
  Project,
  SetGridDefinitionValue,
  SetProjectConfigValue,
} from '../../../../types'
import ControlGroup from '../../controls/ControlGroup'
import NumericInput from '../../controls/NumericInput'
import Switch from '../../controls/Switch'
import TextInput from '../../controls/TextInput'
import EasingEditor from '../EasingEditor'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface GridEditorProps {
  project: Project
  setGridDefinitionValue: SetGridDefinitionValue
  setProjectConfigValue: SetProjectConfigValue
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getItemsFromString = (string: string) => {
  const list = string.split(`,`)
  const trimmed = list.map((value) => value.trim())
  return trimmed.filter(Number)
}

const convertListIntoInputString = (listOrNumber: number[] | number) => {
  return isArray(listOrNumber) ? listOrNumber.join(`, `) : listOrNumber
}

const stepsToInts = pipe(getItemsFromString, map(parseFloat))

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function GridEditor({
  project,
  setGridDefinitionValue,
  setProjectConfigValue,
}: GridEditorProps) {
  const isAdvanced = project.config.grid.shouldUseComplexColumnsRows

  const gutter = project.gridDefinition.gutter as [number, number]
  const [gutterHorizontal, gutterVertical] = gutter

  return (
    <div className="flex flex-col space-y-3">
      <ControlGroup
        label="Advanced"
        labelIsAfter
        htmlFor="grid-advanced-switch"
        tooltipText="Use advanced grid settings that allow you to enter invividual comma-separated values for columns and rows"
        labelClassName="min-w-24"
      >
        <Switch
          isSelected={isAdvanced}
          testId="grid-advanced-switch"
          id="grid-advanced-switch"
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
          <ControlGroup
            label="Columns"
            htmlFor="grid-advanced-columns-input"
            tooltipText="Enter a comma-separated list of values. Each value represents a single column."
            labelClassName="min-w-14"
          >
            <TextInput
              testId="grid-advanced-columns-input"
              value={convertListIntoInputString(
                project.gridDefinition.columns as number[]
              )}
              onChange={(columnsString) => {
                const columns = stepsToInts(columnsString)
                setGridDefinitionValue([`columns`], columns)
              }}
            />
          </ControlGroup>
          <ControlGroup
            label="Rows"
            htmlFor="grid-advanced-columns-input"
            tooltipText="Enter a comma-separated list of values. Each value represents a single row."
            labelClassName="min-w-14"
          >
            <TextInput
              testId="grid-advanced-rows-input"
              value={convertListIntoInputString(
                project.gridDefinition.rows as number[]
              )}
              onChange={(rowsString) => {
                const rows = stepsToInts(rowsString)
                setGridDefinitionValue([`rows`], rows)
              }}
            />
          </ControlGroup>
        </div>
      )}

      {!project.config.grid.shouldUseComplexColumnsRows && (
        <div className="flex space-x-3 [&>*]:basis-1/2">
          <ControlGroup
            direction="vertical"
            label="Columns"
            tooltipText="The number of columns in the grid"
          >
            <NumericInput
              name="columns"
              testId="grid-columns-input"
              value={project.gridDefinition.columns as number}
              onChange={(columns) => {
                setGridDefinitionValue([`columns`], columns)
              }}
            />
          </ControlGroup>
          <ControlGroup
            direction="vertical"
            label="Rows"
            tooltipText="The number of rows in the grid"
          >
            <NumericInput
              name="rows"
              testId="grid-rows-input"
              value={project.gridDefinition.rows as number}
              onChange={(rows) => {
                setGridDefinitionValue([`rows`], rows)
              }}
            />
          </ControlGroup>
        </div>
      )}
      <div className="flex space-x-3 [&>*]:basis-1/2">
        <ControlGroup
          label="Gutter horizontal"
          direction="vertical"
          tooltipText="The size of the horizontal space between columns"
        >
          <NumericInput
            testId="grid-gutter-horizontal-input"
            min={0}
            step={0.1}
            value={gutterHorizontal}
            onChange={(value) => {
              setGridDefinitionValue([`gutter`], [value, gutterVertical])
            }}
          />
        </ControlGroup>
        <ControlGroup
          label="Gutter vertical"
          direction="vertical"
          tooltipText="The size of the vertical space between rows"
        >
          <NumericInput
            testId="grid-gutter-vertical-input"
            min={0}
            step={0.1}
            value={gutterVertical}
            onChange={(value) => {
              setGridDefinitionValue([`gutter`], [gutterHorizontal, value])
            }}
          />
        </ControlGroup>
      </div>
      <div className="flex flex-col space-y-1">
        <h4 className="text-base font-bold">Distribution</h4>
        <div className="flex space-x-3 [&>*]:basis-1/2">
          <EasingEditor
            title="Horizontal"
            testId="grid-easing-horizontal-group"
            tooltipText="The shape of the beizer curve controls the distribution of columns along the X axis."
            easing={project.gridDefinition.bezierEasing.xAxis}
            setEasing={(easing) => {
              setGridDefinitionValue([`bezierEasing`], {
                xAxis: easing,
                yAxis: project.gridDefinition.bezierEasing.yAxis,
              })
            }}
          />
          <EasingEditor
            title="Vertical"
            testId="grid-easing-vertical-group"
            tooltipText="The shape of the beizer curve controls the distribution of rows along the Y axis."
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
    </div>
  )
}
