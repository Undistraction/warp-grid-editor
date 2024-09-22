import { expect } from '@playwright/test'

import { test } from '../fixtures'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test(`Displays welcome modal until it is closed`, async ({
  homePage,
  page,
}) => {
  homePage.goto(`/`)
  await expect(homePage.welcomeModalContent).toBeVisible()
  await page.reload()
  await expect(homePage.welcomeModalContent).toBeVisible()
  await homePage.modalCloseButton.click()
  await expect(homePage.welcomeModalContent).toBeHidden()
  await page.reload()
  await expect(homePage.welcomeModalContent).toBeHidden()
})
