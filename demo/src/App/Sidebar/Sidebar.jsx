import SteppedInput from '../controls/SteppedInput'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const COLUMNS_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ROWS_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
}) => {
  return (
    <div className="flex flex-col space-y-3 divide-y-2 min-w-48">
      <button
        className="bg-black text-white rounded-md p-3"
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
      </div>
      <div className="flex flex-col space-y-2 pt-3 min-w-40">
        <SteppedInput
          label="Grid Square X"
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
          label="Grid Square Y"
          value={gridSquare ? gridSquare.y : ''}
          options={getGridSquareOptions(0, grid.rows)}
          onChange={(y) => {
            setGridSquare({
              ...gridSquare,
              y,
            })
          }}
        />
      </div>
    </div>
  )
}

export default Sidebar
