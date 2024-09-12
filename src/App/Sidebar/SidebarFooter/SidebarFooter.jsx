import React from 'react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarFooter = () => (
  <div className="flex flex-col space-y-1 pt-2 align-middle">
    <p
      className="self-center text-sm text-gray-500"
      data-tid="sidebar-credit"
    >
      Built by{` `}
      <a
        className="text-black"
        data-tid="sidebar-credit-link"
        href="https://undistraction.com"
      >
        Undistraction
      </a>
    </p>
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
