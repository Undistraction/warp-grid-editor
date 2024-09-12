import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarFooter = () => (
  <div className="flex flex-col space-y-1 pt-2 align-middle">
    <div className="flex justify-center align-middle text-sm text-gray-500">
      Built by{` `}
      <a
        className="text-black"
        href="https://undistraction.com"
      >
        Undistraction
      </a>
    </div>
    <a
      className="center self-center underline"
      data-tid="sidebar-repo-link"
      href="https://github.com/Undistraction/warp-grid"
    >
      Github
    </a>
  </div>
)

export default SidebarFooter
