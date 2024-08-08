import React from 'react'

import useAppStore from '../../../state/useAppStore'
import ButtonLink from '../../components/ButtonLink'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const SidebarHeader = () => {
  const setAppConfigValue = useAppStore.use.setAppConfigValue()

  return (
    <header className="flex flex-row items-start justify-between">
      <div className="flex flex-col justify-between">
        <h1
          data-tid="sidebar-title"
          className="text-base font-bold"
        >
          WARP GRID EDITOR
        </h1>
        <a
          className="underline"
          data-tid="sidebar-repo-link"
          href="https://github.com/Undistraction/warp-grid"
        >
          Github
        </a>
      </div>
      <ButtonLink
        label="Close"
        className="pr-2 pt-1 text-sm"
        onClick={() => setAppConfigValue([`ui`, `sidebar`, `isHidden`], true)}
      />
    </header>
  )
}

export default SidebarHeader
