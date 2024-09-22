/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    include: [`**/*.unit.test.{js,ts}`],
    setupFiles: [`./tests/unit/setup.js`],
    environment: `jsdom`,
    coverage: {
      provider: `v8`,
      reporter: [`text`],
      reportOnFailure: true,
      include: [`src/**`],
    },
  },
})
