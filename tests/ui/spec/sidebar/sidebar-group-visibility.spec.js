// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../../fixtures'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const verifyCornerNodesAreVisible = async (homePage) => {
  await expect(homePage.cornerPointTopLeft).toBeVisible()
  await expect(homePage.cornerPointTopRight).toBeVisible()
  await expect(homePage.cornerPointBottomLeft).toBeVisible()
  await expect(homePage.cornerPointBottomRight).toBeVisible()
}

const verifyCornerNodesAreHidden = async (homePage) => {
  await expect(homePage.cornerPointTopLeft).toBeHidden()
  await expect(homePage.cornerPointTopRight).toBeHidden()
  await expect(homePage.cornerPointBottomLeft).toBeHidden()
  await expect(homePage.cornerPointBottomRight).toBeHidden()
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  // Open the sidebar group
  const group = await homePage.getSidebarGroup(`visibility`)
  const groupHeader = group.getByTestId(`sidebar-group-header`)
  await groupHeader.click()
})

test.describe(`Bounds`, () => {
  test(`Hides/shows`, async ({ homePage }) => {
    await homePage.showBoundsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-bounds-hidden.png`
    )
    await homePage.showBoundsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`State is saved on page reload`, async ({ homePage, page }) => {
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
    // Hide the corner points
    await homePage.showCornerPointsSwitch.click()
    await verifyCornerNodesAreHidden(homePage)
    // Show the corner points
    await homePage.showCornerPointsSwitch.click()
    await verifyCornerNodesAreVisible(homePage)
  })

  // eslint-disable-next-line playwright/expect-expect
  test(`State is saved on page reload`, async ({ homePage, page }) => {
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
    await homePage.showIntersectionsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-intersections-hidden.png`
    )
    await homePage.showIntersectionsSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`State is saved on page reload`, async ({ homePage, page }) => {
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
    await homePage.showGridSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(
      `grid-default-grid-hidden.png`
    )
    await homePage.showGridSwitch.click()
    await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
  })

  test(`State is saved on page reload`, async ({ homePage, page }) => {
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
