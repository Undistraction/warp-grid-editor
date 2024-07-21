import React from 'react'
import { getBoundsApi } from '../../utils/boundsApi'
import BoundsEditor from '../controls/BoundsEditor'
import Button from '../controls/Button'
import GridEditor from '../controls/GridEditor'
import SettingsLoader from '../controls/SettingsLoader'
import SettingsSaver from '../controls/SettingsSaver'
import SteppedInput from '../controls/SteppedInput'
import Switch from '../controls/Switch'
import SidebarGroup from './SidebarGroup'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

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
      <SidebarGroup
        title="Grid"
        hint="Switch to 'Advanced' mode to input a comma deliniated list of column or row ratios. Values will be totalled, and each row or column will act as a ratio of that total."
      >
        <GridEditor
          grid={grid}
          setGrid={setGrid}
          config={config}
          setConfig={setConfig}
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
