export const BOUNDS_POINT_IDS = {
  TOP_LEFT: `topLeft`,
  TOP_RIGHT: `topRight`,

  BOTTOM_LEFT: `bottomLeft`,
  BOTTOM_RIGHT: `bottomRight`,

  TOP_LEFT_CONTROL_1: `topLeftControl1`,
  TOP_LEFT_CONTROL_2: `topLeftControl2`,

  TOP_RIGHT_CONTROL_1: `topRightControl1`,
  TOP_RIGHT_CONTROL_2: `topRightControl2`,

  BOTTOM_LEFT_CONTROL_1: `bottomLeftControl1`,
  BOTTOM_LEFT_CONTROL_2: `bottomLeftControl2`,

  BOTTOM_RIGHT_CONTROL_1: `bottomRightControl1`,
  BOTTOM_RIGHT_CONTROL_2: `bottomRightControl2`,
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
    WIDTH: 12,
    HEIGHT: 12,
  },
  CORNER_POINT: {
    WIDTH: 24,
    HEIGHT: 24,
  },
  CANVAS: {
    BORDER_WIDTH: 1,
  },
}
