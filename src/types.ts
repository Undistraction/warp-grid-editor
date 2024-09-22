// eslint-disable-next-line import/named
import { BoundingCurves, GridDefinition, Point } from 'warp-grid'

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type SectionsConfig = {
  // eslint-disable-next-line unused-imports/no-unused-vars
  [key in SidebarSectionId]?: SectionConfig
}

export type Projects = Project[]

export type BezierEasingPair = [number, number]

export type PointPair = [Point, Point]

export type PointPairs = PointPair[]

export type Corners = CornerPointId[]

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface WelcomeScreenConfig {
  isHidden: boolean
}

export interface SectionConfig {
  isMinimised: boolean
}

export interface SidebarConfig {
  isHidden: boolean
  sections: SectionsConfig
}

export interface UIConfig {
  welcomeScreen: WelcomeScreenConfig
  sidebar: SidebarConfig
}

export interface ProjectMeta {
  name: string
  date: string
  version: number
  uuid: string
  isSaved: boolean
}

export interface GridSquare {
  columnIdx: number
  rowIdx: number
}

export interface GridSquareConfig {
  shouldShow: boolean
  value: GridSquare
}

export interface GridConfig {
  shouldUseComplexColumnsRows: boolean
  shouldDrawIntersections: boolean
  shouldDrawGrid: boolean
}

export interface CornerConfig {
  isLinked: boolean
  isMirrored: boolean
}

export interface CornersConfig {
  [key: string]: CornerConfig
}

export interface BoundsConfig {
  shouldDrawBounds: boolean
  shouldDrawCornerPoints: boolean
  isLinked: boolean
  isMirrored: boolean
  corners: CornersConfig
}

export interface ProjectConfig {
  gridSquare: GridSquareConfig
  grid: GridConfig
  bounds: BoundsConfig
}

export interface ProjectDefault {}

export interface Project {
  meta: ProjectMeta
  config: ProjectConfig
  gridDefinition: GridDefinition
  boundingCurves?: BoundingCurves
}

export interface Config {
  ui: UIConfig
}

export interface ProjectSlice {
  project: Project
}

export interface ResetSlice {
  reset: () => void
}

export interface ConfigSlice {
  config: Config
  setAppConfigValue: (pathToValue: string[], value: unknown) => void
}

export interface ProjectsSlice {
  projects: Projects
  saveProject: (project: Project) => void
  saveProjectAs: (project: Project) => void
  loadProject: (uuid: string) => void
}

export type AppSlice = ConfigSlice & ProjectSlice & ProjectsSlice & ResetSlice

export interface Size {
  width: number
  height: number
}

export interface Bounds {
  width: number
  height: number
  x: number
  y: number
}

export type CornerNodePoint = {
  point: Point
  id: ControlPointId | CornerPointId
}

export type CornerNode = {
  cornerPoint: CornerNodePoint
  controlPoint1: CornerNodePoint
  controlPoint2: CornerNodePoint
}

export type CornerNodeMap = {
  [CornerPointId.TOP_LEFT]: CornerNode
  [CornerPointId.TOP_RIGHT]: CornerNode
  [CornerPointId.BOTTOM_LEFT]: CornerNode
  [CornerPointId.BOTTOM_RIGHT]: CornerNode
}

// -----------------------------------------------------------------------------
// Function Signatures
// -----------------------------------------------------------------------------

export type UpdateBoundingCurvesNodePosition = (
  id: string
) => (newPosition: Point) => void

export type UpdateBoundingCurvesNodePositionX = (
  config: ProjectConfig,
  id: string,
  newPosition: Point,
  boundingCurves: BoundingCurves
) => void

export type SetGridDefinitionValue = (path: string[], value: unknown) => void

export type SetProjectConfigValue = (path: string[], value: unknown) => void

export type StraightLine = {
  startPoint: Point
  endPoint: Point
}

// -----------------------------------------------------------------------------
// Re-export types from warp-grid
// -----------------------------------------------------------------------------

export type {
  BezierEasing,
  BezierEasingParams,
  BoundingCurves,
  Curve,
  GridApi,
  GridDefinition,
  GridModel,
  InterpolatePointOnCurveFactory,
  Lines,
  Point,
  StepCurves,
  StepDefinition,
  Steps,
  WarpGrid,
} from 'warp-grid'
