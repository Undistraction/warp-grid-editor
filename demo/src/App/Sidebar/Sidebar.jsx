import React from 'react'
import { INTERPOLATION_STRATEGY } from '../../../../src/const'
import { BOUNDS_POINT_IDS } from '../../const'
import NodeEditor from '../controls/NodeEditor'
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
}) => {
  return (
    <div className="flex flex-col space-y-3 divide-y-2 py-5">
      <SidebarGroup title="Shape">
        <button
          className="rounded-md bg-black p-3 text-white"
          onClick={() => {
            const boundingCurves = getRandomBoundingCurves(canvas)
            setBoundingCurves(boundingCurves)
          }}
        >
          Randomise shape
        </button>
        <Switch
          label="Draw intersections"
          isSelected={grid.shouldDrawIntersections}
          onChange={(value) =>
            setGrid({
              ...grid,
              shouldDrawIntersections: value,
            })
          }
        ></Switch>
      </SidebarGroup>
      <SidebarGroup title="Nodes">
        <NodeEditor
          title="Top Left"
          onChange={(id) => (point) => {
            if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
              setBoundingCurves({
                ...boundingCurves,
                top: {
                  ...boundingCurves.top,
                  startPoint: point,
                },
                left: {
                  ...boundingCurves.left,
                  startPoint: point,
                },
              })
            } else if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1) {
              setBoundingCurves({
                ...boundingCurves,
                top: {
                  ...boundingCurves.top,
                  controlPoint1: point,
                },
              })
            } else if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2) {
              setBoundingCurves({
                ...boundingCurves,
                left: {
                  ...boundingCurves.left,
                  controlPoint1: point,
                },
              })
            }
          }}
          cornerPoint={{
            id: BOUNDS_POINT_IDS.TOP_LEFT,
            point: boundingCurves?.top?.startPoint,
          }}
          controlPoint1={{
            id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1,
            point: boundingCurves?.top?.controlPoint1,
          }}
          controlPoint2={{
            id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2,
            point: boundingCurves?.left?.controlPoint1,
          }}
        />
      </SidebarGroup>
      <SidebarGroup title="Grid">
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
          onChange={(interpolationStrategy) => {
            setGrid({
              ...grid,
              interpolationStrategy,
            })
          }}
          className="min-w-14 border border-black px-2 py-1"
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
