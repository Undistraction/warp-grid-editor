import PropTypes from 'prop-types'
import React from 'react'

import { INTERPOLATION_STRATEGY, LINE_STRATEGY } from '../../../../const'
import { typeProject } from '../../../../prop-types'
import ControlGroup from '../../controls/ControlGroup'
import NumericInput from '../../controls/NumericInput'
import SteppedInput from '../../controls/SteppedInput'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const INTERPOLATION_STRATEGY_OPTIONS = [
  {
    label: `Even`,
    value: INTERPOLATION_STRATEGY.EVEN,
  },
  {
    label: `Linear`,
    value: INTERPOLATION_STRATEGY.LINEAR,
  },
]

export const LINE_STRATEGY_OPTIONS = [
  {
    label: `Curves`,
    value: LINE_STRATEGY.CURVES,
  },
  {
    label: `Straight`,
    value: LINE_STRATEGY.STRAIGHT_LINES,
  },
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderCurvesConfig = (project, setGridDefinitionValue) => {
  return (
    <React.Fragment>
      <ControlGroup
        label="Interpolation type"
        labelIsAfter
        isEven
      >
        <SteppedInput
          name="interpolation-type"
          value={project.gridDefinition.interpolationStrategy}
          options={INTERPOLATION_STRATEGY_OPTIONS}
          onChange={(interpolationStrategy) => {
            setGridDefinitionValue(
              [`interpolationStrategy`],
              interpolationStrategy
            )
          }}
        />
      </ControlGroup>
      {project.gridDefinition.interpolationStrategy ===
        INTERPOLATION_STRATEGY.EVEN && (
        <ControlGroup
          labelIsAfter
          label="Precision"
          isEven
        >
          <NumericInput
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

const ConfigEditor = ({ project, setGridDefinitionValue }) => {
  return (
    <div className="flex flex-col items-stretch space-y-3">
      <ControlGroup
        label="Line type"
        labelIsAfter
        isEven
      >
        <SteppedInput
          name="line-type"
          value={project.gridDefinition.lineStrategy}
          options={LINE_STRATEGY_OPTIONS}
          onChange={(lineStrategy) => {
            setGridDefinitionValue([`lineStrategy`], lineStrategy)
          }}
        />
      </ControlGroup>
      {project.gridDefinition.lineStrategy === LINE_STRATEGY.CURVES &&
        renderCurvesConfig(project, setGridDefinitionValue)}
    </div>
  )
}

ConfigEditor.propTypes = {
  project: typeProject.isRequired,
  setGridDefinitionValue: PropTypes.func.isRequired,
}

export default ConfigEditor
