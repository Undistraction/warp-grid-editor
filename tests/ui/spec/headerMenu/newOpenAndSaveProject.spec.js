import { expect } from '@playwright/test'

import { test } from '../../fixtures'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  // Close the welcome modal
  await homePage.modalCloseButton.click()
})

test.describe(`'New' button`, () => {
  test.describe(`With a currently saved project`, () => {
    test(`should provide option not to save project before opening new project`, async ({
      homePage,
    }) => {
      const PROJECT_NAME = `My Project`
      // Edit the grid
      await homePage.dragNode(homePage.cornerPointTopLeft, 300, 200)
      await homePage.dragNode(homePage.cornerPointTopRight, 500, 100)
      await homePage.dragNode(homePage.cornerPointBottomLeft, 200, 500)
      await homePage.dragNode(homePage.cornerPointBottomRight, 600, 600)
      await expect(homePage.gridCanvas).toHaveScreenshot(
        `grid-corner-dragged.png`
      )
      // Save the project
      await homePage.saveUnsavedProject(PROJECT_NAME)
      await expect(homePage.projectName).toHaveText(PROJECT_NAME)

      // New project
      await homePage.newProjectButton.click()
      await homePage.yesNoDialogueNoButton.click()
      await expect(homePage.projectName).toHaveText(`New project`)
      await expect(homePage.gridCanvas).toHaveScreenshot(`grid-new-project.png`)
    })
  })

  test.describe(`With current unsaved project`, () => {
    test(`should provide option not to save project before opening new project`, async ({
      homePage,
    }) => {
      // Edit the grid
      await homePage.dragNode(homePage.cornerPointTopLeft, 300, 200)
      await homePage.dragNode(homePage.cornerPointTopRight, 500, 100)
      await homePage.dragNode(homePage.cornerPointBottomLeft, 200, 500)
      await homePage.dragNode(homePage.cornerPointBottomRight, 600, 600)
      await expect(homePage.gridCanvas).toHaveScreenshot(
        `grid-corner-dragged.png`
      )

      // New project
      await homePage.newProjectButton.click()
      await homePage.yesNoDialogueNoButton.click()
      await expect(homePage.projectName).toHaveText(`New project`)
      await expect(homePage.gridCanvas).toHaveScreenshot(`grid-new-project.png`)
    })
  })
})

test.describe(`'Open' button`, () => {
  test(`should allow the project to be saved and resaved`, async ({
    homePage,
  }) => {
    const PROJECT_NAME_1 = `My Project 1`
    const PROJECT_NAME_2 = `My Project 2`
    await homePage.saveUnsavedProject(PROJECT_NAME_1)
    await homePage.saveProjectAs(PROJECT_NAME_2)
    await expect(homePage.projectName).toHaveText(PROJECT_NAME_2)
    await homePage.loadProjectButton.click()
    await homePage.projectLoaderSelect.selectOption({ label: PROJECT_NAME_1 })
    await homePage.projectLoaderLoadButton.click()
    await expect(homePage.projectName).toHaveText(PROJECT_NAME_1)
    await homePage.loadProjectButton.click()
    await homePage.projectLoaderSelect.selectOption({
      label: PROJECT_NAME_2,
    })
    await homePage.projectLoaderLoadButton.click()
    await expect(homePage.projectName).toHaveText(PROJECT_NAME_2)
  })
})

test.describe(`'Save' button`, () => {
  test(`should allow the project to be saved and resaved`, async ({
    homePage,
  }) => {
    const PROJECT_NAME = `My Project`
    await expect(homePage.projectName).toHaveText(`New project`)
    // Check that save dialogue is displayed
    await homePage.saveUnsavedProject(PROJECT_NAME)
    await expect(homePage.modal).toBeHidden()
    await expect(homePage.projectName).toHaveText(PROJECT_NAME)
    // Check that save is transparent now
    await homePage.saveProjectButton.click()
    await expect(homePage.modal).toBeHidden()
  })
})

test.describe(`'Save as' button`, () => {
  test(`should allow the project to be saved as a new project`, async ({
    homePage,
  }) => {
    const PROJECT_NAME_1 = `My Project 1`
    const PROJECT_NAME_2 = `My Project 2`
    await homePage.saveUnsavedProject(PROJECT_NAME_1)
    await homePage.saveProjectAs(PROJECT_NAME_2)
    await expect(homePage.projectName).toHaveText(PROJECT_NAME_2)
  })
})
