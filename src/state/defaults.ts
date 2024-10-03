import { v4 } from 'uuid'

import { PROJECT_VERSION } from '../const'
import {
  CornerPointId,
  InterpolationStrategy,
  LineStrategy,
  SidebarSectionId,
} from '../enums'
import type {
  Config,
  GridDefinitionAllRequired,
  Project,
  ProjectConfig,
} from '../types'

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const GRID_DEFINITION_DEFAULT: GridDefinitionAllRequired = {
  columns: 25,
  rows: 25,
  gutter: [0, 0],
  lineStrategy: LineStrategy.CURVES,
  interpolationStrategy: InterpolationStrategy.EVEN,
  precision: 20,
  bezierEasing: {
    xAxis: [0, 0, 1, 1],
    yAxis: [0, 0, 1, 1],
  },
}

const PROJECT_CONFIG_DEFAULT: ProjectConfig = {
  gridSquare: {
    shouldShow: false,
    value: { columnIdx: 0, rowIdx: 0 },
  },
  grid: {
    shouldUseComplexColumnsRows: false,
    shouldDrawIntersections: false,
    shouldDrawGrid: true,
  },
  bounds: {
    shouldDrawBounds: true,
    shouldDrawCornerPoints: true,
    isLinked: true,
    isMirrored: false,
    corners: {
      [CornerPointId.TOP_LEFT]: { isLinked: true, isMirrored: false },
      [CornerPointId.TOP_RIGHT]: { isLinked: true, isMirrored: false },
      [CornerPointId.BOTTOM_LEFT]: { isLinked: true, isMirrored: false },
      [CornerPointId.BOTTOM_RIGHT]: { isLinked: true, isMirrored: false },
    },
  },
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const PROJECT_DEFAULT: Project = {
  meta: {
    name: `New project`,
    date: new Date().toUTCString(),
    version: PROJECT_VERSION,
    uuid: v4(),
    isSaved: false,
  },
  config: PROJECT_CONFIG_DEFAULT,
  gridDefinition: GRID_DEFINITION_DEFAULT,
}

export const APP_CONFIG_DEFAULT: Config = {
  ui: {
    welcomeScreen: {
      isHidden: false,
    },
    sidebar: {
      isHidden: false,
      sections: {
        [SidebarSectionId.CONFIG]: {
          isMinimised: true,
        },
        [SidebarSectionId.BOUNDS]: {
          isMinimised: true,
        },
        [SidebarSectionId.VISIBILITY]: {
          isMinimised: true,
        },
        [SidebarSectionId.GRID]: {
          isMinimised: true,
        },
        [SidebarSectionId.GRID_SQUARE]: {
          isMinimised: true,
        },
      },
    },
  },
}
