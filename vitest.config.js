// eslint-disable-next-line import/namespace
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    include: [`**/*.test.{js,ts}`],
    setupFiles: [`./tests/setup.js`],
    environment: `jsdom`,
    coverage: {
      provider: `v8`,
      reporter: [`text`],
      reportOnFailure: true,
      include: [`src/**`],
    },
  },
})
