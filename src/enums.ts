export enum SidebarSectionId {
  PROJECT = `project`,
  CONFIG = `config`,
  BOUNDS = `bounds`,
  GRID = `grid`,
  GRID_SQUARE = `gridSquare`,
  VISIBILITY = `hideShow`,
}

export enum CornerPointId {
  TOP_LEFT = `cornerTopLeft`,
  TOP_RIGHT = `cornerTopRight`,
  BOTTOM_LEFT = `cornerBottomLeft`,
  BOTTOM_RIGHT = `cornerBottomRight`,
}

export enum ControlPointId {
  TOP_LEFT_CONTROL_1 = `controlTopLeft1`,
  TOP_LEFT_CONTROL_2 = `controlTopLeft2`,

  TOP_RIGHT_CONTROL_1 = `controlTopRight1`,
  TOP_RIGHT_CONTROL_2 = `controlTopRight2`,

  BOTTOM_LEFT_CONTROL_1 = `controlBottomLeft1`,
  BOTTOM_LEFT_CONTROL_2 = `controlBottomLeft2`,

  BOTTOM_RIGHT_CONTROL_1 = `controlBottomRight1`,
  BOTTOM_RIGHT_CONTROL_2 = `controlBottomRight2`,
}

export enum CurveId {
  TOP = `top`,
  LEFT = `left`,
  BOTTOM = `bottom`,
  RIGHT = `right`,
}

export enum CurvePointId {
  START_POINT = `startPoint`,
  END_POINT = `endPoint`,
  CONTROL_POINT_1 = `controlPoint1`,
  CONTROL_POINT_2 = `controlPoint2`,
}

export enum InterpolationStrategy {
  LINEAR = `linear`,
  EVEN = `even`,
}

export enum LineStrategy {
  STRAIGHT_LINES = `straightLines`,
  CURVES = `curves`,
}
