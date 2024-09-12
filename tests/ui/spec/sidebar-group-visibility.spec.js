// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../fixtures'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const verifyCornerNodesAreVisible = async (homePage) => {
  await expect(homePage.topLeftCornerNode).toBeVisible()
  await expect(homePage.topRightCornerNode).toBeVisible()
  await expect(homePage.bottomLeftCornerNode).toBeVisible()
  await expect(homePage.bottomRightCornerNode).toBeVisible()
}

const verifyCornerNodesAreHidden = async (homePage) => {
  await expect(homePage.topLeftCornerNode).toBeHidden()
  await expect(homePage.topRightCornerNode).toBeHidden()
  await expect(homePage.bottomLeftCornerNode).toBeHidden()
  await expect(homePage.bottomRightCornerNode).toBeHidden()
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
})

test.describe(`Bounds`, () => {
  test(`Hides/shows`, async ({ homePage }) => {
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    await groupHeader.click()
    // Hide bounds
    await homePage.showBoundsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-bounds-hidden.png`
    )
    await homePage.showBoundsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`Saves state when page is reloaded`, async ({ homePage, page }) => {
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    // Hide bounds
    await groupHeader.click()
    await homePage.showBoundsSwitch.click()
    await page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-bounds-hidden.png`
    )
    await homePage.showBoundsSwitch.click()
    await page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })
})

test.describe(`Corner points`, () => {
  // eslint-disable-next-line playwright/expect-expect
  test(`Hides/shows`, async ({ homePage }) => {
    await verifyCornerNodesAreVisible(homePage)
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    await groupHeader.click()
    // Hide the corner points
    await homePage.showCornerPointsSwitch.click()
    await verifyCornerNodesAreHidden(homePage)
    // Show the corner points
    await homePage.showCornerPointsSwitch.click()
    await verifyCornerNodesAreVisible(homePage)
  })

  // eslint-disable-next-line playwright/expect-expect
  test(`Saves state when page is reloaded`, async ({ homePage, page }) => {
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    await groupHeader.click()
    // Hide the corner points
    await homePage.showCornerPointsSwitch.click()
    page.reload()
    await verifyCornerNodesAreHidden(homePage)
    // Show the corner points
    await homePage.showCornerPointsSwitch.click()
    page.reload()
    await verifyCornerNodesAreVisible(homePage)
  })
})

test.describe(`Intersections`, () => {
  test(`Hides/shows`, async ({ homePage }) => {
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    await groupHeader.click()
    // Hide bounds
    await homePage.showIntersectionsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-intersections-hidden.png`
    )
    await homePage.showIntersectionsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`Saves state when page is reloaded`, async ({ homePage, page }) => {
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    // Hide bounds
    await groupHeader.click()
    await homePage.showIntersectionsSwitch.click()
    await page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-intersections-hidden.png`
    )
    await homePage.showIntersectionsSwitch.click()
    await page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })
})

test.describe(`Grid`, () => {
  test(`Hides/shows`, async ({ homePage }) => {
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    await groupHeader.click()
    // Hide bounds
    await homePage.showGridSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-grid-hidden.png`
    )
    await homePage.showGridSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`Saves state when page is reloaded`, async ({ homePage, page }) => {
    // Open the sidebar group
    const group = await homePage.getSidebarGroup(`visibility`)
    const groupHeader = group.getByTestId(`sidebar-group-header`)
    // Hide bounds
    await groupHeader.click()
    await homePage.showGridSwitch.click()
    await page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-grid-hidden.png`
    )
    await homePage.showGridSwitch.click()
    await page.reload()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })
})
