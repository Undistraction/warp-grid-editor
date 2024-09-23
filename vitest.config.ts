/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
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
