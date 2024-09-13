// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../../fixtures'

// -----------------------------------------------------------------------------
// Test
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  // Open the sidebar group
  const group = await homePage.getSidebarGroup(`config`)
  const groupHeader = group.getByTestId(`sidebar-group-header`)
  await groupHeader.click()
})

test.describe(`Line-type`, () => {
  test(`Toggles line-type between Curves and Straight`, async ({
    homePage,
  }) => {
    await homePage.lineTypeSelect.selectOption({ label: `Straight` })
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-line-type-straight.png`
    )
    await homePage.lineTypeSelect.selectOption({ label: `Curves` })
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`Saves state when page is reloaded`, async ({ homePage, page }) => {
    await homePage.lineTypeSelect.selectOption({ label: `Straight` })
    page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-line-type-straight.png`
    )
    await expect(homePage.lineTypeSelect).toHaveValue(`straightLines`)
    await homePage.lineTypeSelect.selectOption({ label: `Curves` })
    page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
    await expect(homePage.lineTypeSelect).toHaveValue(`curves`)
  })
})

test.describe(`Interpolation-type`, () => {
  test(`Toggles interpolation-type between Even and Linear`, async ({
    homePage,
  }) => {
    await homePage.interpolationTypeSelect.selectOption({ label: `Linear` })
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-interpolation-type-linear.png`
    )
    await homePage.interpolationTypeSelect.selectOption({ label: `Even` })
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`Saves state when page is reloaded`, async ({ homePage, page }) => {
    await homePage.interpolationTypeSelect.selectOption({ label: `Linear` })
    page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-interpolation-type-linear.png`
    )
    await expect(homePage.interpolationTypeSelect).toHaveValue(`linear`)
    await homePage.interpolationTypeSelect.selectOption({ label: `Even` })
    page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
    await expect(homePage.interpolationTypeSelect).toHaveValue(`even`)
  })
})

test.describe(`Precision`, () => {
  test(`Allows precsion to be edited`, async ({ homePage }) => {
    await expect(homePage.precisionInput).toHaveValue(`20`)
    await homePage.precisionInput.fill(`5`)
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-precision-5.png`)
    await homePage.precisionInput.fill(`20`)
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`Saves state when page is reloaded`, async ({ homePage, page }) => {
    await homePage.precisionInput.fill(`5`)
    page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-precision-5.png`)
    await expect(homePage.precisionInput).toHaveValue(`5`)
    await homePage.precisionInput.fill(`20`)
    page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
    await expect(homePage.interpolationTypeSelect).toHaveValue(`even`)
    await expect(homePage.precisionInput).toHaveValue(`20`)
  })
})
