import PropTypes from 'prop-types'
import pipe from 'ramda/src/pipe'
import React from 'react'

import { typeProject, typeSurface } from '../../prop-types'
import useAppStore from '../../state/useAppStore'
import { getBoundingCurvesApi } from '../../utils/boundingCurvesApi'
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
  canvas,
  surface,
  getRandomBoundingCurves,
  setSurface,
  exportBounds,
  exportCellBounds,
  project,
}) => {
  const boundsApi = getBoundingCurvesApi(project.boundingCurves)
  const corners = boundsApi.getCorners()

  const zeroControlPoints = useAppStore.use.zeroControlPoints()
  const linkControlPoints = useAppStore.use.linkControlPoints()
  const mirrorControlPoints = useAppStore.use.mirrorControlPoints()
  const saveProject = useAppStore.use.saveProject()
  const saveProjectAs = useAppStore.use.saveProjectAs()
  const loadProject = useAppStore.use.loadProject()
  const setProjectName = useAppStore.use.setProjectName()
  const setBoundingCurves = useAppStore.use.setBoundingCurves()
  const projects = useAppStore.use.projects()
  const zeroControlPointsGlobal = useAppStore.use.zeroControlPointsGlobal()
  const linkControlPointsGlobal = useAppStore.use.linkControlPointsGlobal()
  const mirrorControlPointsGlobal = useAppStore.use.mirrorControlPointsGlobal()
  const updateBoundingCurvesCornerNode =
    useAppStore.use.updateBoundingCurvesCornerNode()
  const setGridDefinitionValue = useAppStore.use.setGridDefinitionValue()
  const setConfigValue = useAppStore.use.setConfigValue()

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
          saveProjectAs={saveProjectAs}
          setProjectName={setProjectName}
          project={project}
          projects={projects}
        />
      </SidebarGroup>
      <SidebarGroup
        title="Config"
        hint="By default, all lines are straight, however you can switch to using curved lines which is significantly more memory intensive. When using curves, 'Even' is the default interpolation, and is much more accurate, especially with higher 'Precision' settings"
      >
        <ConfigEditor
          project={project}
          setGridDefinitionValue={setGridDefinitionValue}
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
          isSelected={project.config.grid.shouldDrawIntersections}
          onChange={setConfigValue([`grid`, `shouldDrawIntersections`])}
        />
        <Switch
          label="Draw bounds"
          isSelected={project.config.bounds.shouldDrawBounds}
          onChange={setConfigValue([`bounds`, `shouldDrawBounds`])}
        />
        <Switch
          label="Draw corner points"
          isSelected={project.config.bounds.shouldDrawCornerPoints}
          onChange={setConfigValue([`bounds`, `shouldDrawCornerPoints`])}
        />

        <ControlPointEditor
          zeroControlPoints={zeroControlPointsGlobal}
          linkControlPoints={linkControlPointsGlobal}
          mirrorControlPoints={mirrorControlPointsGlobal}
          controlNodesAreLinked={project.config.bounds.isLinked}
          controlNodesAreMirrored={project.config.bounds.isMirrored}
        />
        {project.boundingCurves && (
          <BoundsEditor
            config={project.config}
            exportBounds={exportBounds}
            corners={corners}
            updateBoundingCurvesCornerNode={updateBoundingCurvesCornerNode}
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
          setConfigValue={setConfigValue}
          setGridDefinitionValue={setGridDefinitionValue}
          project={project}
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
              options={getGridSquareOptions(0, project.gridDefinition.columns)}
              onChange={pipe(parseInt, updateSurface([`gridSquare`, `x`]))}
            />
          </ControlGroup>
          <ControlGroup
            label="Down"
            direction="vertical"
          >
            <SteppedInput
              name="down"
              value={surface.gridSquare ? surface.gridSquare.y : ``}
              options={getGridSquareOptions(0, project.gridDefinition.rows)}
              onChange={pipe(parseInt, updateSurface([`gridSquare`, `y`]))}
            />
          </ControlGroup>
        </div>
      </SidebarGroup>
      <SidebarFooter />
    </div>
  )
}

Sidebar.propTypes = {
  canvas: PropTypes.object.isRequired,
  surface: typeSurface.isRequired,
  getRandomBoundingCurves: PropTypes.func.isRequired,
  setSurface: PropTypes.func.isRequired,
  exportBounds: PropTypes.func.isRequired,
  exportCellBounds: PropTypes.func.isRequired,
  project: typeProject.isRequired,
  setProject: PropTypes.func.isRequired,
}

export default Sidebar
