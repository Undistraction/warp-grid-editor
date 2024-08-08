import { times } from 'ramda'
import pipe from 'ramda/src/pipe'
import React from 'react'

import { typeProject } from '../../../../prop-types'
import useAppStore from '../../../../state/useAppStore'
import ControlGroup from '../../controls/ControlGroup'
import SteppedInput from '../../controls/SteppedInput'
import Switch from '../../controls/Switch'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getGridSquareOptions = (minNumber, maxNumberOrArray) => {
  const maxNumber = Number.isInteger(maxNumberOrArray)
    ? maxNumberOrArray
    : maxNumberOrArray.length

  // Columns and rows are zero-based but we show 1-based to the user
  return times(
    (n) => ({
      value: n,
      label: n + 1,
    }),
    maxNumber
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const GridSquareEditor = ({ project }) => {
  const setConfigValue = useAppStore.use.setConfigValue()

  return (
    <div className="flex flex-col space-y-3">
      <ControlGroup
        label="Show grid square"
        labelIsAfter
      >
        <Switch
          isSelected={project.config.gridSquare.shouldShow}
          onChange={setConfigValue([`gridSquare`, `shouldShow`])}
        />
      </ControlGroup>
      <div className="flex space-x-3 [&>*]:basis-1/2">
        <ControlGroup
          label="Across"
          direction="vertical"
        >
          <SteppedInput
            name="across"
            value={project.config.gridSquare.value.x}
            options={getGridSquareOptions(0, project.gridDefinition.columns)}
            onChange={pipe(
              parseInt,
              setConfigValue([`gridSquare`, `value`, `x`])
            )}
          />
        </ControlGroup>
        <ControlGroup
          label="Down"
          direction="vertical"
        >
          <SteppedInput
            name="down"
            value={project.config.gridSquare.value.y}
            options={getGridSquareOptions(0, project.gridDefinition.rows)}
            onChange={pipe(
              parseInt,
              setConfigValue([`gridSquare`, `value`, `y`])
            )}
          />
        </ControlGroup>
      </div>
    </div>
  )
}

GridSquareEditor.propTypes = {
  project: typeProject,
}

export default GridSquareEditor
