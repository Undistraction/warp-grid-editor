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

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  return {
    goto,
    getSidebarGroup,
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
  }
}

export default getHomePage
