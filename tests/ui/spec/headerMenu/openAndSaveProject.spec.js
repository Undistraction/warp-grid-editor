// eslint-disable-next-line import/named
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
