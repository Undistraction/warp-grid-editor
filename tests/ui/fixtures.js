import base from '@playwright/test'

import getHomePage from './fixtures/pages/getHomePage'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const test = base.test.extend({
  homePage: async ({ page }, use) => {
    const homePage = getHomePage({ page })
    await use(homePage)
  },
})
