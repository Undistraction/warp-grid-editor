import PropTypes from 'prop-types'
import React from 'react'
import {
  typeBoundingCurves,
  typeConfig,
  typeGrid,
  typeSurface,
} from '../../prop-types'
import { getBoundsApi } from '../../utils/boundsApi'
import BoundsEditor from '../controls/BoundsEditor'
import Button from '../controls/Button'
import ConfigEditor from '../controls/ConfigEditor'
import ControlPointEditor from '../controls/ControlPointEditor'
import GridEditor from '../controls/GridEditor'
import SettingsLoader from '../controls/SettingsLoader'
import SettingsSaver from '../controls/SettingsSaver'
import SteppedInput from '../controls/SteppedInput'
import Switch from '../controls/Switch'
import SidebarGroup from './SidebarGroup'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getGridSquareOptions = (minNumber, maxNumberOrArray) => {
  const maxNumber = Number.isInteger(maxNumberOrArray)
    ? maxNumberOrArray
    : maxNumberOrArray.length

  const options = [``]
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
  savedProjects,
  setSurface,
  boundingCurves,
  config,
  setConfig,
  onSave,
  onLoad,
  onNodePositionChange,
  onLinkControlPoints,
  onZeroControlPoints,
  onMirrorControlPoints,
  onZeroControlPointsGlobal,
  onLinkControlPointsGlobal,
  onMirrorControlPointsGlobal,
}) => {
  const boundsApi = getBoundsApi(boundingCurves)
  const corners = boundsApi.getCorners()
  return (
    <div className="flex flex-col space-y-3 divide-y-2 py-5">
      <header className="flex flex-row items-center justify-between">
        <h1>coons-patch-editor</h1>
        <a
          className="underline"
          href="https://github.com/Undistraction/coons-patch"
        >
          Github
        </a>
      </header>
      <SidebarGroup
        title="Config"
        hint="By default, all lines are straight, however you can switch to using curved lines which is significantly more memory intensive. When using curves, 'Even' is the default interpolation, and is much more accurate, especially with higher 'Precision' settings"
      >
        <ConfigEditor
          grid={grid}
          setGrid={setGrid}
        />
      </SidebarGroup>
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
          isSelected={config.grid.shouldDrawIntersections}
          onChange={(value) =>
            setConfig({
              ...config,
              grid: {
                ...config.grid,
                shouldDrawIntersections: value,
              },
            })
          }
        />
        <Switch
          label="Draw bounds"
          isSelected={config.bounds.shouldDrawBounds}
          onChange={(value) =>
            setConfig({
              ...config,
              bounds: {
                ...config.bounds,
                shouldDrawBounds: value,
              },
            })
          }
        />
        <Switch
          label="Draw corner points"
          isSelected={config.bounds.shouldDrawCornerPoints}
          onChange={(value) =>
            setConfig({
              ...config,
              bounds: {
                ...config.bounds,
                shouldDrawCornerPoints: value,
              },
            })
          }
        />
        <ControlPointEditor
          onZeroControlPoints={onZeroControlPointsGlobal}
          onLinkControlPoints={onLinkControlPointsGlobal}
          onMirrorControlPoints={onMirrorControlPointsGlobal}
          controlNodesAreLinked={config.global.isLinked}
          controlNodesAreMirrored={config.global.isMirrored}
        />
        {boundingCurves && (
          <BoundsEditor
            corners={corners}
            boundingCurves={boundingCurves}
            setBoundingCurves={setBoundingCurves}
            config={config}
            setConfig={setConfig}
            onNodePositionChange={onNodePositionChange}
            onLinkControlPoints={onLinkControlPoints}
            onZeroControlPoints={onZeroControlPoints}
            onMirrorControlPoints={onMirrorControlPoints}
          />
        )}
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

      <SidebarGroup title="Grid square">
        <SteppedInput
          label="Across"
          value={surface.gridSquare ? surface.gridSquare.x : ``}
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
          value={surface.gridSquare ? surface.gridSquare.y : ``}
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
        title="Load and save project"
        hint="You can save and load your settings from/to the local-storage of your machine."
      >
        <SettingsLoader
          onLoad={onLoad}
          savedProjects={savedProjects}
        />
        <SettingsSaver onSave={onSave} />
      </SidebarGroup>
      <div className="flex justify-center pt-2 align-middle text-sm text-gray-500">
        <div>
          Built by{` `}
          <a
            className="text-black"
            href="https://undistraction.com"
          >
            Undistraction
          </a>
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  grid: typeGrid.isRequired,
  canvas: PropTypes.object.isRequired,
  surface: typeSurface.isRequired,
  getRandomBoundingCurves: PropTypes.func.isRequired,
  setBoundingCurves: PropTypes.func.isRequired,
  setGrid: PropTypes.func.isRequired,
  savedProjects: PropTypes.array.isRequired,
  setSurface: PropTypes.func.isRequired,
  boundingCurves: typeBoundingCurves,
  config: typeConfig.isRequired,
  setConfig: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onNodePositionChange: PropTypes.func.isRequired,
  onLinkControlPoints: PropTypes.func.isRequired,
  onZeroControlPoints: PropTypes.func.isRequired,
  onMirrorControlPoints: PropTypes.func.isRequired,
  onZeroControlPointsGlobal: PropTypes.func.isRequired,
  onLinkControlPointsGlobal: PropTypes.func.isRequired,
  onMirrorControlPointsGlobal: PropTypes.func.isRequired,
}

export default Sidebar
