// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getHomePage = ({ page }) => {
  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  // Sidebar
  const sidebar = page.getByTestId(`sidebar`)
  const sidebarTitle = page.getByTestId(`sidebar-title`)
  const sidebarRepoLink = page.getByTestId(`sidebar-repo-link`)
  const sidebarCredit = page.getByTestId(`sidebar-credit`)
  const sidebarCreditLink = page.getByTestId(`sidebar-credit-link`)
  const sidebarLogo = page.getByTestId(`sidebar-logo`)
  // Sidebar Group
  const sidebarCloseButton = page.getByTestId(`sidebar-close-button`)
  const sidebarOpenButton = page.getByTestId(`sidebar-open-button`)
  // Visibility Editor
  const showBoundsSwitch = page.getByTestId(`show-bounds-switch`)
  const showCornerPointsSwitch = page.getByTestId(`show-corner-points-switch`)
  const showIntersectionsSwitch = page.getByTestId(`show-intersections-switch`)
  const showGridSwitch = page.getByTestId(`show-grid-switch`)
  // Config Editor
  const lineTypeSelect = page.getByTestId(`line-type-select`)
  const interpolationTypeSelect = page.getByTestId(`interpolation-type-select`)
  const precisionInput = page.getByTestId(`precision-input`)
  // Grid Editor
  const gridAdvancedModeSwitch = page.getByTestId(`grid-advanced-switch`)
  const gridRowsInput = page.getByTestId(`grid-rows-input`)
  const gridColumnsInput = page.getByTestId(`grid-columns-input`)
  const gridAdvancedRowsInput = page.getByTestId(`grid-advanced-rows-input`)
  const gridAdvancedColumnsInput = page.getByTestId(
    `grid-advanced-columns-input`
  )
  const gridGutterHorizontalInput = page.getByTestId(
    `grid-gutter-horizontal-input`
  )
  const gridGutterVerticalInput = page.getByTestId(`grid-gutter-vertical-input`)
  const gridEasingHorizontalGroup = page.getByTestId(
    `grid-easing-horizontal-group`
  )
  const gridEasingVerticalGroup = page.getByTestId(`grid-easing-vertical-group`)
  // Grid UI
  const gridCanvas = page.getByTestId(`grid-canvas`)
  const topLeftCornerNode = page.getByTestId(`corner-node-top-left`)
  const topRightCornerNode = page.getByTestId(`corner-node-top-right`)
  const bottomLeftCornerNode = page.getByTestId(`corner-node-bottom-left`)
  const bottomRightCornerNode = page.getByTestId(`corner-node-bottom-right`)

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  const goto = async () => await page.goto(`/`)

  const getSidebarGroup = async (group) => {
    return page.getByTestId(`sidebar-group-${group}`)
  }

  const setBezierEasingForAxisGroup = async (group, values) => {
    await group.getByTestId(`bezier-easing-1-slider`).fill(values[0])
    await group.getByTestId(`bezier-easing-2-slider`).fill(values[1])
    await group.getByTestId(`bezier-easing-3-slider`).fill(values[2])
    await group.getByTestId(`bezier-easing-4-slider`).fill(values[3])
  }

  const verifyBezierEasingForAxisGroup = async (group, values) => {
    await expect(group.getByTestId(`bezier-easing-1-slider`)).toHaveValue(
      values[0]
    )
    await expect(group.getByTestId(`bezier-easing-2-slider`)).toHaveValue(
      values[1]
    )
    await expect(group.getByTestId(`bezier-easing-3-slider`)).toHaveValue(
      values[2]
    )
    await expect(group.getByTestId(`bezier-easing-4-slider`)).toHaveValue(
      values[3]
    )
  }

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  return {
    goto,
    getSidebarGroup,
    setBezierEasingForAxisGroup,
    verifyBezierEasingForAxisGroup,
    sidebar,
    sidebarTitle,
    sidebarRepoLink,
    sidebarCredit,
    sidebarCreditLink,
    sidebarLogo,
    sidebarOpenButton,
    sidebarCloseButton,
    showBoundsSwitch,
    showCornerPointsSwitch,
    showIntersectionsSwitch,
    showGridSwitch,
    topLeftCornerNode,
    topRightCornerNode,
    bottomLeftCornerNode,
    bottomRightCornerNode,
    gridCanvas,
    lineTypeSelect,
    interpolationTypeSelect,
    precisionInput,
    gridRowsInput,
    gridColumnsInput,
    gridGutterHorizontalInput,
    gridGutterVerticalInput,
    gridEasingHorizontalGroup,
    gridEasingVerticalGroup,
    gridAdvancedModeSwitch,
    gridAdvancedRowsInput,
    gridAdvancedColumnsInput,
  }
}

export default getHomePage
