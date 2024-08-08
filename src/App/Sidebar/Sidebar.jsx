import PropTypes from 'prop-types'
import React from 'react'

import SIDBAR_SECTION_IDS from '../../const/sidebarSections'
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
  const setProjectConfigValue = useAppStore.use.setProjectConfigValue()
  const setAppConfigValue = useAppStore.use.setAppConfigValue()
  const config = useAppStore.use.config()

  const setAppConfigSectionIsMinimised = (id) => (value) =>
    setAppConfigValue([`ui`, `sidebar`, `sections`, id, `isMinimised`], value)

  const getAppConfigSectionIsMinimised = (id) =>
    config.ui.sidebar.sections[id].isMinimised

  return (
    <div className="flex flex-col space-y-3 divide-y-2 py-5">
      <SidebarHeader />

      <SidebarGroup
        title="Project"
        tid="sidebar-group-project"
        hint="You can save and load your settings from/to the local-storage of your machine."
        isMinimised={getAppConfigSectionIsMinimised(SIDBAR_SECTION_IDS.PROJECT)}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.PROJECT
        )}
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
        tid="sidebar-group-config"
        hint="By default, all lines are straight, however you can switch to using curved lines which is significantly more memory intensive. When using curves, 'Even' is the default interpolation, and is much more accurate, especially with higher 'Precision' settings"
        isMinimised={getAppConfigSectionIsMinimised(SIDBAR_SECTION_IDS.CONFIG)}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.CONFIG
        )}
      >
        <ConfigEditor
          project={project}
          setGridDefinitionValue={setGridDefinitionValue}
        />
      </SidebarGroup>

      <SidebarGroup
        title="Bounds"
        tid="sidebar-group-bounds"
        isMinimised={getAppConfigSectionIsMinimised(SIDBAR_SECTION_IDS.BOUNDS)}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.BOUNDS
        )}
      >
        <PatchEditor
          canvas={canvas}
          project={project}
          exportBounds={exportBounds}
        />
      </SidebarGroup>

      <SidebarGroup
        title="Grid"
        tid="sidebar-group-grid"
        hint="Switch to 'Advanced' mode to input a comma deliniated list of column or row ratios. Values will be totalled, and each row or column will act as a ratio of that total."
        isMinimised={getAppConfigSectionIsMinimised(SIDBAR_SECTION_IDS.GRID)}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.GRID
        )}
      >
        <GridEditor
          setProjectConfigValue={setProjectConfigValue}
          setGridDefinitionValue={setGridDefinitionValue}
          project={project}
        />
        <Button
          label="Export"
          onClick={exportCellBounds}
        />
      </SidebarGroup>

      <SidebarGroup
        title="Grid square"
        tid="sidebar-group-grid-squre"
        isMinimised={getAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.GRID_SQUARE
        )}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.GRID_SQUARE
        )}
      >
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
