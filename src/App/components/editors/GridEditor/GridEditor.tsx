import { isArray, isNumber } from 'ramda-adjunct'

import type {
  Project,
  SetGridDefinitionValue,
  SetProjectConfigValue,
  Step,
  StepDefinition,
} from '../../../../types'
import ControlGroup from '../../controls/ControlGroup'
import NumericInput from '../../controls/NumericInput'
import Switch from '../../controls/Switch'
import EasingEditor from '../EasingEditor'
import StepsAdvancedEditor from '../StepsAdvancedEditor'
import { times } from 'ramda'

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

// Make sure we are using Steps
const ensureAdvancedStepValue = (value: StepDefinition): Step[] => {
  if (isNumber(value)) {
    return times<Step>(
      () => ({
        value: 1,
      }),
      value
    )
  }
  // It will never be an array of numbers, so we can safely cast
  return value as Step[]
}

const ensureSimpleStepValue = (value: StepDefinition) => {
  if (isArray(value)) {
    // Count the number of steps that aren't gutters
    return (value as Step[]).reduce((acc: number, step: Step) => {
      return step.isGutter ? acc : acc + 1
    }, 0)
  }

  return value as number
}

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
        tooltipText="Use advanced grid settings that allow you to enter individual comma-separated values for columns and rows"
        labelClassName="min-w-24"
      >
        <Switch
          isSelected={isAdvanced}
          testId="grid-advanced-switch"
          id="grid-advanced-switch"
          onChange={() => {
            const isAdvancedNew = !isAdvanced
            setProjectConfigValue(
              [`grid`, `shouldUseComplexColumnsRows`],
              isAdvancedNew
            )
            if (isAdvancedNew) {
              setGridDefinitionValue(
                [`columns`],
                ensureAdvancedStepValue(project.gridDefinition.columns)
              )
              setGridDefinitionValue(
                [`rows`],
                ensureAdvancedStepValue(project.gridDefinition.columns)
              )
            } else {
              setGridDefinitionValue(
                [`columns`],
                ensureSimpleStepValue(project.gridDefinition.columns)
              )
              setGridDefinitionValue(
                [`rows`],
                ensureSimpleStepValue(project.gridDefinition.rows)
              )
            }
            setProjectConfigValue([`gridSquare`, `value`, `rowIdx`], 0)
            setProjectConfigValue([`gridSquare`, `value`, `columnIdx`], 0)
          }}
        />
      </ControlGroup>
      {project.config.grid.shouldUseComplexColumnsRows && (
        <div className="flex flex-col items-stretch space-y-2">
          <ControlGroup
            label="Columns"
            direction="vertical"
            htmlFor="grid-advanced-columns-input"
            tooltipText="Enter a comma-separated list of values. Each value represents a single column."
            labelClassName="min-w-14"
          >
            <StepsAdvancedEditor
              testId="grid-advanced-columns-input"
              name="Column"
              value={ensureAdvancedStepValue(project.gridDefinition.columns)}
              onChange={(columns: Step[]) => {
                setGridDefinitionValue([`columns`], columns)
              }}
            />
          </ControlGroup>
          <ControlGroup
            label="Rows"
            direction="vertical"
            htmlFor="grid-advanced-columns-input"
            tooltipText="Enter a comma-separated list of values. Each value represents a single row."
            labelClassName="min-w-14"
          >
            <StepsAdvancedEditor
              testId="grid-advanced-rows-input"
              name="Row"
              value={ensureAdvancedStepValue(project.gridDefinition.rows)}
              onChange={(rows: Step[]) => {
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
              value={ensureSimpleStepValue(project.gridDefinition.columns)}
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
              value={ensureSimpleStepValue(project.gridDefinition.rows)}
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
