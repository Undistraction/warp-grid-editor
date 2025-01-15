import type { BoundingCurves, GridDefinition, Point } from 'warp-grid'

import { ControlPointId, CornerPointId, SidebarSectionId } from './enums'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type SectionsConfig = Partial<Record<SidebarSectionId, SectionConfig>>

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

export type CornersConfig = Record<string, CornerConfig>

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

// Make all the props required so we don't need to keep checking. We know they
// will all be present.
export type GridDefinitionAllRequired = Required<GridDefinition>

export interface Project {
  meta: ProjectMeta
  config: ProjectConfig
  gridDefinition: GridDefinitionAllRequired
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

export interface CornerNodePoint {
  point: Point
  id: ControlPointId | CornerPointId
}

export interface CornerNode {
  cornerPoint: CornerNodePoint
  controlPoint1: CornerNodePoint
  controlPoint2: CornerNodePoint
}

export interface CornerNodeMap {
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

export interface StraightLine {
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
  Point,
  StepDefinition,
  Step,
  WarpGrid,
} from 'warp-grid'
