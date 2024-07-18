import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
// eslint-disable-next-line
import { defineConfig, loadEnv } from 'vite'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd())
  console.log('>>>>', mode, env)

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    base: env.VITE_BASE || '/<REPO>/',
  }
})
