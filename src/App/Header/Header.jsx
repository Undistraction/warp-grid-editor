import React from 'react'

import Logo from '../../images/Logo.svg'
import LogoWOnly from '../../images/Logo-w-only.svg'
import HeaderMenu from './HeaderMenu'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Header = () => {
  return (
    <header className="flex flex-row items-start space-x-2 pb-3 sm:space-x-5">
      <h1
        data-tid="header-title"
        className="text-base font-bold"
      >
        <img
          src={Logo}
          className="hidden w-[100px] sm:block"
          alt="Warp Grid logo"
        />
        <img
          src={LogoWOnly}
          className="w-[20px] sm:hidden"
          alt="Warp Grid logo"
        />
      </h1>
      <HeaderMenu />
    </header>
  )
}

export default Header
