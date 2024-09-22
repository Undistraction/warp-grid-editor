import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
// eslint-disable-next-line import/namespace
import { defineConfig } from 'vite'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  }
})
