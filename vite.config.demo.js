import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
// eslint-disable-next-line
import { defineConfig, loadEnv } from 'vite'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    base: env.VITE_BASE || '/<REPO>/',
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/getCoonsPatch.js'),
        name: 'coons-patch',
        // the proper extensions will be added
        fileName: 'coons-patch',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['bezier-easing'],
        output: {},
      },
    },
  }
})
