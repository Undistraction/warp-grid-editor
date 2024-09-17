// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../../fixtures'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const BUTTONS = [
  { name: `Save project button`, element: `saveProjectButton` },
  { name: `Load project button`, element: `loadProjectButton` },
  { name: `Export project button`, element: `exportProjectButton` },
]

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(`/`)
  // Close the welcome modal
  await homePage.modalCloseButton.click()
})

test.describe(`modals`, () => {
  for (const { name, element } of BUTTONS) {
    test.describe(`Modal triggered by '${name}' button`, () => {
      test(`Save modal can be closed using close button`, async ({
        homePage,
      }) => {
        await homePage[element].click()
        await expect(homePage.modal).toBeVisible()
        await homePage.modalCloseButton.click()
        await expect(homePage.modal).toBeHidden()
      })

      test(`Save modal can be closed using modal overlay`, async ({
        homePage,
      }) => {
        await homePage[element].click()
        await expect(homePage.modal).toBeVisible()
        await homePage.modalOverlay.click({ position: { x: 5, y: 5 } })
        await expect(homePage.modal).toBeHidden()
      })
    })
  }
})
