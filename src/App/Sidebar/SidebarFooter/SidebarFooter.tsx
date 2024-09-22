import { ReactNode } from 'react'

import packageJson from '../../../../package.json'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarFooter = (): ReactNode => (
  <div className="flex flex-col items-center space-y-1 pb-4 pt-4">
    <p
      className="text-sm text-gray-500"
      data-tid="sidebar-credit"
    >
      Built by{` `}
      <a
        className="text-sm text-black"
        data-tid="sidebar-credit-link"
        href="https://undistraction.com"
      >
        Undistraction
      </a>
    </p>
    <a
      className="block text-sm underline"
      data-tid="sidebar-repo-link"
      href="https://github.com/Undistraction/warp-grid"
    >
      Github
    </a>
    <p className="text-sm text-gray-400">Version {packageJson.version}</p>
  </div>
)

export default SidebarFooter
