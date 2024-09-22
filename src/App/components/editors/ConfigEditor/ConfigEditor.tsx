import React from 'react'

import {
  InterpolationStrategy,
  LineStrategy,
  Project,
  SetGridDefinitionValue,
} from '../../../../types'
import ControlGroup from '../../controls/ControlGroup'
import NumericInput from '../../controls/NumericInput'
import SteppedInput from '../../controls/SteppedInput'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ConfigEditorProps {
  project: Project
  setGridDefinitionValue: SetGridDefinitionValue
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const INTERPOLATION_STRATEGY_OPTIONS = [
  {
    label: `Even`,
    value: InterpolationStrategy.EVEN,
  },
  {
    label: `Linear`,
    value: InterpolationStrategy.LINEAR,
  },
]

export const LINE_STRATEGY_OPTIONS = [
  {
    label: `Curves`,
    value: LineStrategy.CURVES,
  },
  {
    label: `Straight`,
    value: LineStrategy.STRAIGHT_LINES,
  },
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderCurvesConfig = (
  project: Project,
  setGridDefinitionValue: SetGridDefinitionValue
) => {
  return (
    <React.Fragment>
      {project.gridDefinition.interpolationStrategy ===
        InterpolationStrategy.EVEN && (
        <ControlGroup
          labelIsAfter
          label="Precision"
          isEven
          htmlFor="precision"
          tooltipText="How precise the curves are. Higher values will result in more accuracy at the expense of performance."
        >
          <NumericInput
            testId="precision-input"
            id="precision"
            value={project.gridDefinition.precision}
            min={1}
            onChange={(precision) => {
              setGridDefinitionValue([`precision`], precision)
            }}
          />
        </ControlGroup>
      )}
    </React.Fragment>
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const ConfigEditor = ({
  project,
  setGridDefinitionValue,
}: ConfigEditorProps) => {
  return (
    <div className="flex flex-col items-stretch space-y-3">
      <ControlGroup
        label="Line type"
        labelIsAfter
        isEven
        htmlFor="line-type"
        tooltipText="The type of lines used to draw the grid. Straight lines are more performant, but curves are more accurate."
      >
        <SteppedInput
          name="line-type"
          value={project.gridDefinition.lineStrategy}
          options={LINE_STRATEGY_OPTIONS}
          testId="line-type-select"
          onChange={(lineStrategy) => {
            setGridDefinitionValue([`lineStrategy`], lineStrategy)
          }}
        />
      </ControlGroup>
      <ControlGroup
        label="Interpolation type"
        labelIsAfter
        isEven
        htmlFor="interpolation-type"
        tooltipText="The type of interpolation used to draw the grid. Even interpolation will result in a more uniform grid at the expense of performance."
      >
        <SteppedInput
          name="interpolation-type"
          value={project.gridDefinition.interpolationStrategy as string}
          options={INTERPOLATION_STRATEGY_OPTIONS}
          testId="interpolation-type-select"
          onChange={(interpolationStrategy) => {
            setGridDefinitionValue(
              [`interpolationStrategy`],
              interpolationStrategy
            )
          }}
        />
      </ControlGroup>
      {project.gridDefinition.lineStrategy === LineStrategy.CURVES &&
        renderCurvesConfig(project, setGridDefinitionValue)}
    </div>
  )
}

export default ConfigEditor
