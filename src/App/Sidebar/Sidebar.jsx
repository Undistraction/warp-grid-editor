import PropTypes from 'prop-types'
import React from 'react'

import { typeProject } from '../../prop-types'
import useAppStore from '../../state/useAppStore'
import Button from '../components/Button'
import ConfigEditor from '../components/editors/ConfigEditor'
import GridEditor from '../components/editors/GridEditor'
import GridSquareEditor from '../components/editors/GridSqureEditor'
import PatchEditor from '../components/editors/PatchEditor'
import ProjectEditor from '../components/editors/ProjectEditor'
import SidebarFooter from './SidebarFooter'
import SidebarGroup from './SidebarGroup'
import SidebarHeader from './SidebarHeader'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Sidebar = ({ canvas, exportBounds, exportCellBounds, project }) => {
  const saveProject = useAppStore.use.saveProject()
  const saveProjectAs = useAppStore.use.saveProjectAs()
  const loadProject = useAppStore.use.loadProject()
  const setProjectName = useAppStore.use.setProjectName()
  const projects = useAppStore.use.projects()
  const setGridDefinitionValue = useAppStore.use.setGridDefinitionValue()
  const setConfigValue = useAppStore.use.setConfigValue()

  return (
    <div className="flex flex-col space-y-3 divide-y-2 py-5">
      <SidebarHeader />

      <SidebarGroup
        title="Project"
        hint="You can save and load your settings from/to the local-storage of your machine."
      >
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
        <PatchEditor
          canvas={canvas}
          project={project}
          exportBounds={exportBounds}
        />
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
        <GridSquareEditor project={project} />
      </SidebarGroup>

      <SidebarFooter />
    </div>
  )
}

Sidebar.propTypes = {
  canvas: PropTypes.object.isRequired,
  exportBounds: PropTypes.func.isRequired,
  exportCellBounds: PropTypes.func.isRequired,
  project: typeProject.isRequired,
}

export default Sidebar
