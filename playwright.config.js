import { defineConfig, devices } from '@playwright/test'
import process from 'process'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const ROOT = `http://localhost:5173`

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: `tests/ui/`,
  /* Reduce timeout so we fail fast */
  timeout: 30000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: `html`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${ROOT}`,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: `on-first-retry`,
    testIdAttribute: `data-tid`,
    permissions: [`clipboard-read`, `clipboard-write`],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: `chromium`,
      use: { ...devices[`Desktop Chrome`] },
    },
  ],
  webServer: {
    command: `pnpm run dev`,
    url: `${ROOT}`,
    reuseExistingServer: true,
    // Pipe console from process
    stdout: `pipe`,
    stderr: `pipe`,
  },
})
