// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getHomePage = ({ page }) => {
  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  // Form
  const sidebarTitle = page.getByTestId(`sidebar-title`)
  const sidebarRepoLink = page.getByTestId(`sidebar-repo-link`)

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  const goto = async () => await page.goto(`/`)

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  return {
    goto,
    sidebarTitle,
    sidebarRepoLink,
  }
}

export default getHomePage
