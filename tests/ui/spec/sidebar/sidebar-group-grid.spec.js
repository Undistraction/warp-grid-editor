import { expect } from '@playwright/test'

import { test } from '../../fixtures'

// -----------------------------------------------------------------------------
// Test
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  // Close the welcome modal
  await homePage.modalCloseButton.click()
  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  // Open the sidebar group
  const group = await homePage.getSidebarGroup(`grid`)
  const groupHeader = group.getByTestId(`sidebar-group-header`)
  await groupHeader.click()
})

test.describe(`Rows, columns and gutter`, () => {
  test(`Updates rows, columns and gutter`, async ({ homePage }) => {
    await homePage.gridRowsInput.fill(`3`)
    await homePage.gridColumnsInput.fill(`3`)
    await homePage.gridGutterHorizontalInput.fill(`1`)
    await homePage.gridGutterVerticalInput.fill(`0.5`)
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-3x3-with-gutter-1x0.5.png`
    )
    await homePage.gridRowsInput.fill(`50`)
    await homePage.gridColumnsInput.fill(`50`)
    await homePage.gridGutterHorizontalInput.fill(`1`)
    await homePage.gridGutterVerticalInput.fill(`5`)
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-50x50-with-gutter-1x5.png`
    )
    await homePage.gridRowsInput.fill(`1`)
    await homePage.gridColumnsInput.fill(`1`)
    await homePage.gridGutterHorizontalInput.fill(`0`)
    await homePage.gridGutterVerticalInput.fill(`0`)
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-1x1.png`)
  })

  test(`Updates easing`, async ({ homePage }) => {
    await homePage.gridRowsInput.fill(`10`)
    await homePage.gridColumnsInput.fill(`20`)
    await homePage.gridGutterHorizontalInput.fill(`1`)
    await homePage.gridGutterVerticalInput.fill(`2`)
    await homePage.setBezierEasingForAxis(homePage.gridEasingHorizontalGroup, [
      `0.15`,
      `0.4`,
      `0.85`,
      `0.6`,
    ])
    await homePage.setBezierEasingForAxis(homePage.gridEasingVerticalGroup, [
      `0.25`,
      `0.33`,
      `0.66`,
      `0.75`,
    ])

    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-10x20-with-gutter-1x2-with-easing.png`
    )
  })

  test(`Advanced mode`, async ({ homePage }) => {
    homePage.gridAdvancedModeSwitch.click()
    await homePage.gridAdvancedRowsInput.fill(`3, 5, 2, 1`)
    await homePage.gridAdvancedColumnsInput.fill(`5, 5, 5, 20, 10, 2, 2`)
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-advanced.png`)
  })

  test(`State is saved on page reload`, async ({ homePage, page }) => {
    await homePage.gridRowsInput.fill(`3`)
    await homePage.gridColumnsInput.fill(`8`)
    await homePage.gridGutterHorizontalInput.fill(`1`)
    await homePage.gridGutterVerticalInput.fill(`0.5`)
    await homePage.setBezierEasingForAxis(homePage.gridEasingHorizontalGroup, [
      `0.15`,
      `0.4`,
      `0.85`,
      `0.6`,
    ])
    await homePage.setBezierEasingForAxis(homePage.gridEasingVerticalGroup, [
      `0.25`,
      `0.33`,
      `0.66`,
      `0.75`,
    ])
    await page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-3x8-with-gutter-1x0.5-with-easing.png`
    )
    await expect(homePage.gridRowsInput).toHaveValue(`3`)
    await expect(homePage.gridColumnsInput).toHaveValue(`8`)
    await expect(homePage.gridGutterHorizontalInput).toHaveValue(`1`)
    await expect(homePage.gridGutterVerticalInput).toHaveValue(`0.5`)
  })
})
