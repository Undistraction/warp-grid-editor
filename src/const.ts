import { CornerPointId } from './enums'
import type { Corners } from './types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const CORNER_POINTS: Corners = [
  CornerPointId.TOP_LEFT,
  CornerPointId.TOP_RIGHT,
  CornerPointId.BOTTOM_LEFT,
  CornerPointId.BOTTOM_RIGHT,
]

export const METRICS = {
  CONTROL_POINT: {
    SIZE: 12,
  },
  CORNER_POINT: {
    SIZE: 24,
  },
  CANVAS: {
    BORDER_WIDTH: 1,
  },
}

export const PROJECT_VERSION = 1
