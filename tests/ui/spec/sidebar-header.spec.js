// eslint-disable-next-line import/named
import { expect } from '@playwright/test'

import { test } from '../fixtures'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test(`Has header content`, async ({ homePage }) => {
  await homePage.goto(`/`)
  await expect(homePage.sidebarTitle).toHaveText(`WARP GRID EDITOR`)
  await expect(homePage.sidebarRepoLink).toHaveText(`Github`)
})
