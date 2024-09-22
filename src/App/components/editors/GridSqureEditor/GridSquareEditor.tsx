import { times } from 'ramda'
import pipe from 'ramda/src/pipe'
import { isNumber } from 'ramda-adjunct'

import useAppStore from '../../../../state/useAppStore'
import type { Project, StepDefinition } from '../../../../types'
import ControlGroup from '../../controls/ControlGroup'
import SteppedInput from '../../controls/SteppedInput'
import Switch from '../../controls/Switch'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface GridSquareEditorProps {
  project: Project
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getGridSquareOptions = (
  minNumber: number,
  maxNumberOrArray: number | number[] | StepDefinition
) => {
  const maxNumber = isNumber(maxNumberOrArray)
    ? maxNumberOrArray
    : maxNumberOrArray.length

  // Columns and rows are zero-based but we show 1-based to the user
  return times(
    (n) => ({
      value: n,
      label: (n + 1).toString(),
    }),
    maxNumber
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function GridSquareEditor({ project }: GridSquareEditorProps) {
  const setProjectConfigValue = useAppStore.use.setProjectConfigValue()

  return (
    <div className="flex flex-col space-y-3">
      <ControlGroup
        label="Show grid square"
        labelIsAfter
        tooltipText="Highlight the grid square at the specified column and row indexes"
      >
        <Switch
          isSelected={project.config.gridSquare.shouldShow}
          onChange={setProjectConfigValue([`gridSquare`, `shouldShow`])}
        />
      </ControlGroup>
      <div className="flex space-x-3 [&>*]:basis-1/2">
        <ControlGroup
          label="Across"
          direction="vertical"
          tooltipText="The grid square's column index"
        >
          <SteppedInput
            name="across"
            value={project.config.gridSquare.value.rowIdx}
            options={getGridSquareOptions(0, project.gridDefinition.columns)}
            onChange={pipe(
              parseInt,
              setProjectConfigValue([`gridSquare`, `value`, `columnIdx`])
            )}
          />
        </ControlGroup>
        <ControlGroup
          label="Down"
          direction="vertical"
          tooltipText="The grid square's row index"
        >
          <SteppedInput
            name="down"
            value={project.config.gridSquare.value.columnIdx}
            options={getGridSquareOptions(0, project.gridDefinition.rows)}
            onChange={pipe(
              parseInt,
              setProjectConfigValue([`gridSquare`, `value`, `rowIdx`])
            )}
          />
        </ControlGroup>
      </div>
    </div>
  )
}
