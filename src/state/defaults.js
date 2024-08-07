import { v4 } from 'uuid'

import {
  BOUNDS_POINT_IDS,
  INTERPOLATION_STRATEGY,
  LINE_STRATEGY,
  PROJECT_VERSION,
} from '../const'

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const GRID_DEFINITION_DEFAULT = {
  columns: 25,
  rows: 25,
  gutter: 0,
  lineStrategy: LINE_STRATEGY.CURVES,
  interpolationStrategy: INTERPOLATION_STRATEGY.EVEN,
  precision: 20,
}

const CONFIG_DEFAULT = {
  gridSquare: { x: 0, y: 0 },
  grid: {
    shouldUseComplexColumnsRows: false,
    shouldDrawIntersections: false,
  },
  bounds: {
    shouldDrawBounds: true,
    shouldDrawCornerPoints: true,
    isLinked: true,
    isMirrored: false,
    corners: {
      [BOUNDS_POINT_IDS.TOP_LEFT]: { isLinked: true, isMirrored: false },
      [BOUNDS_POINT_IDS.TOP_RIGHT]: { isLinked: true, isMirrored: false },
      [BOUNDS_POINT_IDS.BOTTOM_LEFT]: { isLinked: true, isMirrored: false },
      [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: { isLinked: true, isMirrored: false },
    },
  },
}

export const PROJECT_DEFAULT = {
  meta: {
    name: `New project`,
    date: new Date().toUTCString(),
    version: PROJECT_VERSION,
    uuid: v4(),
  },
  config: CONFIG_DEFAULT,
  gridDefinition: GRID_DEFINITION_DEFAULT,
  boundingCurves: null,
}
