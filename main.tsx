import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './src/App'

// -----------------------------------------------------------------------
// React Entrypoint
// -----------------------------------------------------------------------

const container = document.getElementById(`root`)
if (container) {
  const root = createRoot(container)
  root.render(<App />)
} else {
  throw new Error(`Root container not found`)
}
