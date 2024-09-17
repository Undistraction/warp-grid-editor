// eslint-disable-next-line import/named

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getHomePage = ({ page }) => {
  // ---------------------------------------------------------------------------
  // Locators
  // ---------------------------------------------------------------------------

  //Header
  const headerTitle = page.getByTestId(`header-title`)
  // Sidebar
  const sidebar = page.getByTestId(`sidebar`)
  const projectName = page.getByTestId(`project-name`)
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
  // Corner Nodes
  const cornerPointTopLeft = page.getByTestId(`corner-top-left`)
  const cornerPointTopRight = page.getByTestId(`corner-top-right`)
  const cornerPointBottomLeft = page.getByTestId(`corner-bottom-left`)
  const cornerPointBottomRight = page.getByTestId(`corner-bottom-right`)
  // Control point nodes
  const controlPointTopLeft1 = page.getByTestId(`control-top-left1`)
  const controlPointTopLeft2 = page.getByTestId(`control-top-left2`)
  const controlPointTopRight1 = page.getByTestId(`control-top-right1`)
  const controlPointTopRight2 = page.getByTestId(`control-top-right2`)
  const controlPointBottomLeft1 = page.getByTestId(`control-bottom-left1`)
  const controlPointBottomLeft2 = page.getByTestId(`control-bottom-left2`)
  const controlPointBottomRight1 = page.getByTestId(`control-bottom-right1`)
  const controlPointBottomRight2 = page.getByTestId(`control-bottom-right2`)
  // Header menu
  const saveProjectButton = page.getByTestId(`save-project-button`)
  const saveProjectAsButton = page.getByTestId(`save-project-as-button`)
  const loadProjectButton = page.getByTestId(`load-project-button`)
  const exportProjectButton = page.getByTestId(`export-project-button`)
  // Modal content
  const saveProjectModalContent = page.getByTestId(`save-project-modal-content`)
  const loadProjectModalContent = page.getByTestId(`load-project-modal-content`)
  const exportProjectModalContent = page.getByTestId(
    `export-project-modal-content`
  )
  const welcomeModalContent = page.getByTestId(`welcome-modal-content`)
  // Project loader
  const projectLoaderSelect = page.getByTestId(`project-loader-select`)
  const projectLoaderLoadButton = page.getByTestId(`project-loader-load-button`)
  // Project saver
  const projectSaverNameInput = page.getByTestId(`project-saver-name-input`)
  const projectSaverSaveButton = page.getByTestId(`project-saver-save-button`)
  // Project exporter
  const exportCodeTab = page.getByTestId(`export-code-tab`)
  const exportSvgTab = page.getByTestId(`export-svg-tab`)
  // Export
  const exportCodeBlock = page.getByTestId(`export-code-block`)
  const copyCodeButton = page.getByTestId(`copy-code-button`)
  const copySvgButton = page.getByTestId(`copy-svg-button`)
  // Modal
  const modal = page.getByTestId(`modal`)
  const modalOverlay = page.getByTestId(`modal-overlay`)
  const modalCloseButton = page.getByTestId(`modal-close-button`)

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  const goto = async () => await page.goto(`/`)

  const dragNode = async (node, x, y) => {
    await node.hover()
    await page.mouse.down()
    await page.mouse.move(x, y)
    page.mouse.up()
  }

  const getSidebarGroup = async (group) => {
    return page.getByTestId(`sidebar-group-${group}`)
  }

  const setBezierEasingForAxis = async (group, values) => {
    const bounds = await group.getByTestId(`bezier-easing-bounds`).boundingBox()
    const startNode = await group.getByTestId(`control-point-start`)
    const endNode = await group.getByTestId(`control-point-end`)
    await dragNode(
      startNode,
      bounds.x + bounds.width * values[0],
      bounds.y + bounds.height * values[1]
    )
    await dragNode(
      endNode,
      bounds.x + bounds.width * values[2],
      bounds.y + bounds.height * values[3]
    )
  }

  const saveUnsavedProject = async (name) => {
    await saveProjectButton.click()
    await projectSaverNameInput.fill(name)
    await projectSaverSaveButton.click()
  }

  const saveProjectAs = async (name) => {
    await saveProjectAsButton.click()
    await projectSaverNameInput.fill(name)
    await projectSaverSaveButton.click()
  }

  const verifyBezierEasingForAxisGroup = async (group, values) => {}

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  return {
    // Actions
    goto,
    dragNode,
    getSidebarGroup,
    setBezierEasingForAxis,
    saveUnsavedProject,
    saveProjectAs,
    // Assertions
    verifyBezierEasingForAxisGroup,
    // Elements
    headerTitle,
    sidebar,
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
    cornerPointTopLeft,
    cornerPointTopRight,
    cornerPointBottomLeft,
    cornerPointBottomRight,
    controlPointTopLeft1,
    controlPointTopLeft2,
    controlPointTopRight1,
    controlPointTopRight2,
    controlPointBottomLeft1,
    controlPointBottomLeft2,
    controlPointBottomRight1,
    controlPointBottomRight2,
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
    saveProjectButton,
    saveProjectAsButton,
    loadProjectButton,
    exportProjectButton,
    saveProjectModalContent,
    loadProjectModalContent,
    exportProjectModalContent,
    projectSaverNameInput,
    projectSaverSaveButton,
    modal,
    modalOverlay,
    modalCloseButton,
    projectName,
    projectLoaderSelect,
    projectLoaderLoadButton,
    exportCodeBlock,
    exportCodeTab,
    exportSvgTab,
    copyCodeButton,
    copySvgButton,
    welcomeModalContent,
  }
}

export default getHomePage
