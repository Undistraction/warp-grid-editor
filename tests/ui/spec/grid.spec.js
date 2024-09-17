// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../fixtures'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  // Close the welcome modal
  await homePage.modalCloseButton.click()
  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
})

test(`Dragging corner points to new positions updates the grid`, async ({
  homePage,
}) => {
  await homePage.dragNode(homePage.cornerPointTopLeft, 300, 200)
  await homePage.dragNode(homePage.cornerPointTopRight, 500, 100)
  await homePage.dragNode(homePage.cornerPointBottomLeft, 200, 500)
  await homePage.dragNode(homePage.cornerPointBottomRight, 600, 600)

  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-corner-dragged.png`)
})

test(`Dragging control points updates the bounding curves`, async ({
  homePage,
  page,
}) => {
  await homePage.dragNode(homePage.controlPointTopLeft1, 20, 20)
  await homePage.dragNode(homePage.controlPointTopRight1, 500, 200)
  await homePage.dragNode(homePage.controlPointBottomLeft1, 100, 400)
  await homePage.dragNode(homePage.controlPointBottomRight1, 400, 300)

  // Move the mouse to avoid hover styles on corner node that will fail
  // screenshot comparison.
  page.mouse.move(0, 0)

  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-control-dragged.png`)
})

test(`Double-clicking toggles its control points contracted/expanded`, async ({
  homePage,
  page,
}) => {
  await homePage.cornerPointTopLeft.dblclick()
  await homePage.cornerPointTopRight.dblclick()
  await homePage.cornerPointBottomLeft.dblclick()
  await homePage.cornerPointBottomRight.dblclick()

  await expect(homePage.gridCanvas).toHaveScreenshot(
    `grid-control-points-reset.png`
  )

  await homePage.cornerPointTopLeft.dblclick()
  await homePage.cornerPointTopRight.dblclick()
  await homePage.cornerPointBottomLeft.dblclick()
  await homePage.cornerPointBottomRight.dblclick()

  // Move the mouse to avoid hover styles on corner node that will fail
  // screenshot comparison.
  page.mouse.move(0, 0)

  await expect(homePage.gridCanvas).toHaveScreenshot(`grid-default.png`)
})
