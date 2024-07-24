import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './src/App'

// -----------------------------------------------------------------------
// React Entrypoint
// -----------------------------------------------------------------------

const root = createRoot(document.getElementById(`root`))

root.render(<App />)