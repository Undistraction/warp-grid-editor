export const BOUNDS_POINT_IDS = {
  TOP_LEFT: `cornerTopLeft`,
  TOP_RIGHT: `cornerTopRight`,

  BOTTOM_LEFT: `cornerBottomLeft`,
  BOTTOM_RIGHT: `cornerBottomRight`,

  TOP_LEFT_CONTROL_1: `controlTopLeft1`,
  TOP_LEFT_CONTROL_2: `controlTopLeft2`,

  TOP_RIGHT_CONTROL_1: `controlTopRight1`,
  TOP_RIGHT_CONTROL_2: `controlTopRight2`,

  BOTTOM_LEFT_CONTROL_1: `controlBottomLeft1`,
  BOTTOM_LEFT_CONTROL_2: `controlBottomLeft2`,

  BOTTOM_RIGHT_CONTROL_1: `controlBottomRight1`,
  BOTTOM_RIGHT_CONTROL_2: `controlBottomRight2`,
}

export const CURVE_NAMES = {
  TOP: `top`,
  LEFT: `left`,
  BOTTOM: `bottom`,
  RIGHT: `right`,
}

export const POINT_NAMES = {
  START_POINT: `startPoint`,
  END_POINT: `endPoint`,
  CONTROL_POINT_1: `controlPoint1`,
  CONTROL_POINT_2: `controlPoint2`,
}

export const CORNER_POINTS = [
  BOUNDS_POINT_IDS.TOP_LEFT,
  BOUNDS_POINT_IDS.TOP_RIGHT,
  BOUNDS_POINT_IDS.BOTTOM_LEFT,
  BOUNDS_POINT_IDS.BOTTOM_RIGHT,
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

export const INTERPOLATION_STRATEGY = {
  EVEN: `even`,
  LINEAR: `linear`,
}

export const LINE_STRATEGY = {
  STRAIGHT_LINES: `straightLines`,
  CURVES: `curves`,
}

export const PROJECT_VERSION = 1
