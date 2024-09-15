import React from 'react'

import Logo from '../../images/Logo.svg'
import HeaderMenu from './HeaderMenu'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Header = () => {
  return (
    <header className="flex flex-row items-start space-x-5 pb-3">
      <h1
        data-tid="header-title"
        className="text-base font-bold"
      >
        <img
          src={Logo}
          className="w-[100px]"
          alt="Warp Grid logo"
        />
      </h1>
      <HeaderMenu />
    </header>
  )
}

export default Header
