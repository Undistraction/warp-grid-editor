import React from 'react'
import { INTERPOLATION_STRATEGY } from '../../../../src/const'
import { getBoundsApi } from '../../utils/boundsApi'
import BoundsEditor from '../controls/BoundsEditor'
import Button from '../controls/Button'
import SettingsLoader from '../controls/SettingsLoader'
import SettingsSaver from '../controls/SettingsSaver'
import SteppedInput from '../controls/SteppedInput'
import Switch from '../controls/Switch'
import SidebarGroup from './SidebarGroup'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const COLUMNS_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50]
const ROWS_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50]

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
  surface,
  getRandomBoundingCurves,
  setBoundingCurves,
  setGrid,
  onSave,
  onLoad,
  savedBounds,
  setSurface,
  boundingCurves,
  config,
  setConfig,
  onNodePositionChange,
}) => {
  const boundsApi = getBoundsApi(boundingCurves)
  const { corners } = boundsApi
  return (
    <div className="flex flex-col space-y-3 divide-y-2 py-5">
      <SidebarGroup title="Bounds">
        <Button
          label="Randomise"
          onClick={() => {
            const boundingCurves = getRandomBoundingCurves(canvas)
            setBoundingCurves(boundingCurves)
          }}
        />
        <Switch
          label="Draw intersections"
          isSelected={grid.shouldDrawIntersections}
          onChange={(value) =>
            setGrid({
              ...grid,
              shouldDrawIntersections: value,
            })
          }
        />
      </SidebarGroup>
      <SidebarGroup title="Grid">
        <div className="flex [&>*]:basis-1/2">
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
        </div>
        <SteppedInput
          label="Interpolation strategy"
          value={grid.interpolationStrategy}
          options={INTERPOLATION_STRATEGIES}
          onChange={(interpolationStrategy) => {
            setGrid({
              ...grid,
              interpolationStrategy,
            })
          }}
        />
      </SidebarGroup>
      <SidebarGroup title="Nodes">
        <BoundsEditor
          corners={corners}
          boundingCurves={boundingCurves}
          setBoundingCurves={setBoundingCurves}
          config={config}
          setConfig={setConfig}
          onNodePositionChange={onNodePositionChange}
        />
      </SidebarGroup>

      <SidebarGroup title="Grid square">
        <SteppedInput
          label="Across"
          value={surface.gridSquare ? surface.gridSquare.x : ''}
          options={getGridSquareOptions(0, grid.columns)}
          onChange={(x) => {
            setSurface({
              ...surface,
              gridSquare: {
                ...surface.gridSquare,
                x,
              },
            })
          }}
        />
        <SteppedInput
          label="Down"
          value={surface.gridSquare ? surface.gridSquare.y : ''}
          options={getGridSquareOptions(0, grid.rows)}
          onChange={(y) => {
            setSurface({
              ...surface,
              gridSquare: {
                ...surface.gridSquare,
                y,
              },
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
