import { SidebarSectionId } from '../../enums'
import useAppStore from '../../state/useAppStore'
import type { Project, WarpGrid } from '../../types'
import ConfigEditor from '../components/editors/ConfigEditor'
import GridEditor from '../components/editors/GridEditor'
import GridSquareEditor from '../components/editors/GridSqureEditor'
import PatchEditor from '../components/editors/PatchEditor'
import VisibilityEditor from '../components/editors/VisibilityEditor'
import SidebarFooter from './SidebarFooter'
import SidebarGroup from './SidebarGroup'
import SidebarHeader from './SidebarHeader'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SidebarProps {
  project: Project
  grid: WarpGrid
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function Sidebar({ project, grid }: SidebarProps) {
  const setGridDefinitionValue = useAppStore.use.setGridDefinitionValue()
  const setProjectConfigValue = useAppStore.use.setProjectConfigValue()
  const setAppConfigValue = useAppStore.use.setAppConfigValue()
  const config = useAppStore.use.config()

  const setAppConfigSectionIsMinimised = (id: string) => (value: boolean) =>
    setAppConfigValue([`ui`, `sidebar`, `sections`, id, `isMinimised`], value)

  const getAppConfigSectionIsMinimised = (id: string) =>
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
        isMinimised={getAppConfigSectionIsMinimised(SidebarSectionId.GRID)}
        onToggleMinimise={setAppConfigSectionIsMinimised(SidebarSectionId.GRID)}
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
        isMinimised={getAppConfigSectionIsMinimised(SidebarSectionId.CONFIG)}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SidebarSectionId.CONFIG
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
        isMinimised={getAppConfigSectionIsMinimised(SidebarSectionId.BOUNDS)}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SidebarSectionId.BOUNDS
        )}
      >
        {project.boundingCurves && <PatchEditor project={project} />}
      </SidebarGroup>

      <SidebarGroup
        title="Visibility"
        testId="sidebar-group-visibility"
        hint="Hide or show parts of your grid"
        isMinimised={getAppConfigSectionIsMinimised(
          SidebarSectionId.VISIBILITY
        )}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SidebarSectionId.VISIBILITY
        )}
      >
        <VisibilityEditor project={project} />
      </SidebarGroup>

      <SidebarGroup
        title="Debug"
        hint="Debug your grid"
        testId="sidebar-group-grid-square"
        isMinimised={getAppConfigSectionIsMinimised(
          SidebarSectionId.GRID_SQUARE
        )}
        onToggleMinimise={setAppConfigSectionIsMinimised(
          SidebarSectionId.GRID_SQUARE
        )}
      >
        <GridSquareEditor
          project={project}
          grid={grid}
        />
      </SidebarGroup>

      <SidebarFooter />
    </div>
  )
}
