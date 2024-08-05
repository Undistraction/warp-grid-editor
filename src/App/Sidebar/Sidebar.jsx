import PropTypes from 'prop-types'
import React from 'react'
import AppApiContext from '../../context/AppApiContext'
import {
  typeBoundingCurves,
  typeConfig,
  typeGrid,
  typeSurface,
} from '../../prop-types'
import { getBoundsApi } from '../../utils/boundsApi'
import { updateObject } from '../../utils/object'
import Button from '../components/Button'
import ControlGroup from '../components/controls/ControlGroup'
import SteppedInput from '../components/controls/SteppedInput'
import Switch from '../components/controls/Switch'
import BoundsEditor from '../components/editors/BoundsEditor'
import ConfigEditor from '../components/editors/ConfigEditor'
import ControlPointEditor from '../components/editors/ControlPointEditor'
import GridEditor from '../components/editors/GridEditor'
import ProjectEditor from '../components/editors/ProjectEditor'
import SidebarFooter from './SidebarFooter'
import SidebarGroup from './SidebarGroup'
import SidebarHeader from './SidebarHeader'

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
  saveProject,
  loadProject,
  exportBounds,
  exportCellBounds,
  project,
}) => {
  const boundsApi = getBoundsApi(boundingCurves)
  const corners = boundsApi.getCorners()
  const {
    linkControlPoints,
    zeroControlPoints,
    mirrorControlPoints,
    linkControlPointsGlobal,
    zeroControlPointsGlobal,
    mirrorControlPointsGlobal,
    updateBounds,
  } = React.useContext(AppApiContext)

  const updateConfig = updateObject(config, setConfig)
  const updateSurface = updateObject(surface, setSurface)

  return (
    <div className="flex flex-col space-y-3 divide-y-2 py-5">
      <SidebarHeader />
      <SidebarGroup
        title="Project"
        hint="You can save and load your settings from/to the local-storage of your machine."
      >
        {project ? project?.name : `Untitled`}
        <ProjectEditor
          loadProject={loadProject}
          saveProject={saveProject}
          project={project}
          savedProjects={savedProjects}
        />
      </SidebarGroup>
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
        <div className="flex space-x-3 [&>*]:basis-1/2">
          <Button
            label="Randomise"
            onClick={() => {
              const boundingCurves = getRandomBoundingCurves(canvas)
              setBoundingCurves(boundingCurves)
            }}
          />
          <Button
            label="Export"
            onClick={exportBounds}
          />
        </div>
        <Switch
          label="Draw intersections"
          isSelected={config.grid.shouldDrawIntersections}
          onChange={updateConfig([`grid`, `shouldDrawIntersections`])}
        />
        <Switch
          label="Draw bounds"
          isSelected={config.bounds.shouldDrawBounds}
          onChange={updateConfig([`bounds`, `shouldDrawBounds`])}
        />
        <Switch
          label="Draw corner points"
          isSelected={config.bounds.shouldDrawCornerPoints}
          onChange={updateConfig([`bounds`, `shouldDrawCornerPoints`])}
        />
        <ControlPointEditor
          zeroControlPoints={zeroControlPointsGlobal}
          linkControlPoints={linkControlPointsGlobal}
          mirrorControlPoints={mirrorControlPointsGlobal}
          controlNodesAreLinked={config.global.isLinked}
          controlNodesAreMirrored={config.global.isMirrored}
        />
        {boundingCurves && (
          <BoundsEditor
            exportBounds={exportBounds}
            corners={corners}
            setBoundingCurves={setBoundingCurves}
            config={config}
            setConfig={setConfig}
            updateBounds={updateBounds}
            linkControlPoints={linkControlPoints}
            zeroControlPoints={zeroControlPoints}
            mirrorControlPoints={mirrorControlPoints}
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
        <Button
          label="Export"
          onClick={exportCellBounds}
        />
      </SidebarGroup>

      <SidebarGroup title="Grid square">
        <div className="flex space-x-3 [&>*]:basis-1/2">
          <ControlGroup
            label="Across"
            direction="vertical"
          >
            <SteppedInput
              name="across"
              value={surface.gridSquare ? surface.gridSquare.x : ``}
              options={getGridSquareOptions(0, grid.columns)}
              onChange={updateSurface([`gridSquare`, `x`])}
            />
          </ControlGroup>
          <ControlGroup
            label="Down"
            direction="vertical"
          >
            <SteppedInput
              name="down"
              value={surface.gridSquare ? surface.gridSquare.y : ``}
              options={getGridSquareOptions(0, grid.rows)}
              onChange={updateSurface([`gridSquare`, `y`])}
            />
          </ControlGroup>
        </div>
      </SidebarGroup>
      <SidebarFooter />
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
  saveProject: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
  exportBounds: PropTypes.func.isRequired,
  exportCellBounds: PropTypes.func.isRequired,
  project: PropTypes.object,
}

export default Sidebar
