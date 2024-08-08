import { test } from '../fixtures'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

test(`Has header content`, async ({ homePage }) => {
  await homePage.goto(`/`)
  await expect(homePage.sidebarTitle).toHaveText(`Sidebar`)
})
