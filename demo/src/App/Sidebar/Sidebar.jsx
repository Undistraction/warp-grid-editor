import { INTERPOLATION_STRATEGY } from '../../../../src/const'
import BoundsLoader from '../controls/BoundsLoader'
import BoundsSaver from '../controls/BoundsSaver'
import SteppedInput from '../controls/SteppedInput'

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
    <div className="flex min-w-64 flex-col space-y-3 divide-y-2">
      <button
        className="rounded-md bg-black p-3 text-white"
        onClick={() => {
          const boundingCurves = getRandomBoundingCurves(canvas)
          setBoundingCurves(boundingCurves)
        }}
      >
        Randomise
      </button>
      <div className="flex flex-col space-y-2 pt-3">
        <SteppedInput
          label="Columns"
          value={grid.columns}
          options={COLUMNS_VALUES}
          onChange={(columns) => {
            setGrid({
              ...grid,
              columns,
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
              rows,
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
      </div>
      <div className="flex min-w-40 flex-col space-y-2 pt-3">
        <SteppedInput
          label="Grid Square X"
          value={gridSquare ? gridSquare.x : ''}
          options={getGridSquareOptions(0, grid.columns)}
          onChange={(x) => {
            console.log('SET', gridSquare, x)
            setGridSquare({
              ...gridSquare,
              x,
            })
          }}
        />
        <SteppedInput
          label="Grid Square Y"
          value={gridSquare ? gridSquare.y : ''}
          options={getGridSquareOptions(0, grid.rows)}
          onChange={(y) => {
            console.log('SET', gridSquare, y)
            setGridSquare({
              ...gridSquare,
              y,
            })
          }}
        />
      </div>
      <div className="flex flex-col space-y-2 pt-3">
        <BoundsLoader
          onLoad={onLoad}
          savedBounds={savedBounds}
        />
        <BoundsSaver onSave={onSave} />
      </div>
    </div>
  )
}

export default Sidebar
