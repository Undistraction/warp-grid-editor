import { ChevronDoubleRightIcon } from '@heroicons/react/16/solid'
import React from 'react'

import Logo from '../../../images/Logo.svg'
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
          <img
            src={Logo}
            className="w-1/2"
            alt="Warp Grid logo"
          />
        </h1>
      </div>
      <ButtonLink
        icon={<ChevronDoubleRightIcon />}
        className="relative top-2 text-sm"
        onClick={() => setAppConfigValue([`ui`, `sidebar`, `isHidden`], true)}
        testId="sidebar-close-button"
      />
    </header>
  )
}

export default SidebarHeader
