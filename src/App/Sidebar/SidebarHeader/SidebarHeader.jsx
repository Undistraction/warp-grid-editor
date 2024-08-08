import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarHeader = () => (
  <header className="flex flex-row items-center justify-between">
    <h1 data-tid="sidebar-title">Warp Grid Editor</h1>
    <a
      className="underline"
      data-tid="sidebar-repo-link"
      href="https://github.com/Undistraction/warp-grid"
    >
      Github
    </a>
  </header>
)

export default SidebarHeader
