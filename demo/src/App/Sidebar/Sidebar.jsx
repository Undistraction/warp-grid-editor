import { INTERPOLATION_STRATEGY } from '../../../../src/const'
import SettingsLoader from '../controls/SettingsLoader'
import SettingsSaver from '../controls/SettingsSaver'
import SteppedInput from '../controls/SteppedInput'
import SidebarGroup from './SidebarGroup'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const COLUMNS_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ROWS_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const INTERPOLATION_STRATEGIES = [
  {
    label: 'Even',
    value: INTERPOLATION_STRATEGY.EVEN,
  },
  {
    label: 'Linear',
    value: INTERPOLATION_STRATEGY.LINEAR,
  },
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getGridSquareOptions = (minNumber, maxNumberOrArray) => {
  const maxNumber = Number.isInteger(maxNumberOrArray)
    ? maxNumberOrArray
    : maxNumberOrArray.length

  const options = ['']
  for (let i = minNumber; i < maxNumber; i++) {
    options.push(i)
  }

  return options
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Sidebar = ({
  grid,
  canvas,
  gridSquare,
  getRandomBoundingCurves,
  setBoundingCurves,
  setGrid,
  setGridSquare,
  onSave,
  onLoad,
  savedBounds,
}) => {
  return (
    <div className="flex min-w-72 flex-col space-y-3 divide-y-2">
      <SidebarGroup title="Grid">
        <button
          className="rounded-md bg-black p-3 text-white"
          onClick={() => {
            const boundingCurves = getRandomBoundingCurves(canvas)
            setBoundingCurves(boundingCurves)
          }}
        >
          Randomise shape
        </button>
        <SteppedInput
          label="Columns"
          value={grid.columns}
          options={COLUMNS_VALUES}
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
          options={ROWS_VALUES}
          onChange={(rows) => {
            setGrid({
              ...grid,
              rows: parseInt(rows),
            })
          }}
        />
        <SteppedInput
          label="Interpolation strategy"
          value={grid.interpolationStrategy}
          options={INTERPOLATION_STRATEGIES}
          onChange={(interpolationStrategy) =>
            setGrid({
              ...grid,
              interpolationStrategy,
            })
          }
          className="min-w-14 border border-black px-2 py-1"
        />
      </SidebarGroup>
      <SidebarGroup title="Grid square">
        <SteppedInput
          label="Across"
          value={gridSquare ? gridSquare.x : ''}
          options={getGridSquareOptions(0, grid.columns)}
          onChange={(x) => {
            setGridSquare({
              ...gridSquare,
              x,
            })
          }}
        />
        <SteppedInput
          label="Down"
          value={gridSquare ? gridSquare.y : ''}
          options={getGridSquareOptions(0, grid.rows)}
          onChange={(y) => {
            setGridSquare({
              ...gridSquare,
              y,
            })
          }}
        />
      </SidebarGroup>
      <SidebarGroup
        title="Load and save"
        hint="You can save and load your settings from/to the local-storage of your machine."
      >
        <SettingsLoader
          onLoad={onLoad}
          savedBounds={savedBounds}
        />
        <SettingsSaver onSave={onSave} />
      </SidebarGroup>
    </div>
  )
}

export default Sidebar
