// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getHomePage = ({ page }) => {
  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  const sidebar = page.getByTestId(`sidebar`)
  const sidebarTitle = page.getByTestId(`sidebar-title`)
  const sidebarRepoLink = page.getByTestId(`sidebar-repo-link`)
  const sidebarCredit = page.getByTestId(`sidebar-credit`)
  const sidebarCreditLink = page.getByTestId(`sidebar-credit-link`)
  const sidebarLogo = page.getByTestId(`sidebar-logo`)
  const sidebarCloseButton = page.getByTestId(`sidebar-close-button`)
  const sidebarOpenButton = page.getByTestId(`sidebar-open-button`)

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
  }
}

export default getHomePage
