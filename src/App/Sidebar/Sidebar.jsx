import PropTypes from 'prop-types'
import React from 'react'

import SIDBAR_SECTION_IDS from '../../const/sidebarSections'
import { typeProject } from '../../prop-types'
import useAppStore from '../../state/useAppStore'
import ConfigEditor from '../components/editors/ConfigEditor'
import GridEditor from '../components/editors/GridEditor'
import GridSquareEditor from '../components/editors/GridSqureEditor'
import BoundsEditor from '../components/editors/PatchEditor'
import VisibilityEditor from '../components/editors/VisibilityEditor'
import SidebarFooter from './SidebarFooter'
import SidebarGroup from './SidebarGroup'
import SidebarHeader from './SidebarHeader'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Sidebar = ({ canvas, project }) => {
  const setGridDefinitionValue = useAppStore.use.setGridDefinitionValue()
  const setProjectConfigValue = useAppStore.use.setProjectConfigValue()
  const setAppConfigValue = useAppStore.use.setAppConfigValue()
  const config = useAppStore.use.config()

  const setAppConfigSectionIsMinimised = (id) => (value) =>
    setAppConfigValue([`ui`, `sidebar`, `sections`, id, `isMinimised`], value)

  const getAppConfigSectionIsMinimised = (id) =>
    config.ui.sidebar.sections[id].isMinimised

  return (
    <div
      className={`flex flex-col space-y-3 divide-y-2 bg-white pr-5`}
      data-tid="sidebar"
    >
      <SidebarHeader />

      <SidebarGroup
        title="Grid"
        testId="sidebar-group-grid"
        hint="Edit your grid's columns, rows, and gutter"
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
      </SidebarGroup>

      <SidebarGroup
        title="Config"
        testId="sidebar-group-config"
        hint="Configure how your grid is calculated"
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
        hint="Edit the shape of your grid"
        testId="sidebar-group-bounds"
        isMinimised={getAppConfigSectionIsMinimised(SIDBAR_SECTION_IDS.BOUNDS)}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.BOUNDS
        )}
      >
        {project.boundingCurves && (
          <BoundsEditor
            canvas={canvas}
            project={project}
          />
        )}
      </SidebarGroup>

      <SidebarGroup
        title="Visibility"
        testId="sidebar-group-visibility"
        hint="Hide or show parts of your grid"
        isMinimised={getAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.VISIBILITY
        )}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SIDBAR_SECTION_IDS.VISIBILITY
        )}
      >
        <VisibilityEditor project={project} />
      </SidebarGroup>

      <SidebarGroup
        title="Debug"
        hint="Debug your grid"
        testId="sidebar-group-grid-square"
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
  project: typeProject.isRequired,
}

export default Sidebar
