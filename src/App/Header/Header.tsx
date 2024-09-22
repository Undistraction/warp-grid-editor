import HeaderMenu from './HeaderMenu'

// -----------------------------------------------------------------------------
// URL
// -----------------------------------------------------------------------------

const LOGO_URL = `/logo/Logo-v2_Logo.svg`
const LOGO_W_ONLY_URL = `/logo/Logo-v2_Logo-w-only.svg`

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function Header() {
  return (
    <header className="flex flex-row items-start space-x-2 pb-3 sm:space-x-3">
      <h1
        data-tid="header-title"
        className="text-base font-bold"
      >
        <img
          src={LOGO_URL}
          className="relative hidden w-[80px] sm:block"
          alt="Warp Grid logo"
        />
        <img
          src={LOGO_W_ONLY_URL}
          className="w-[20px] sm:hidden"
          alt="Warp Grid logo"
        />
      </h1>
      <HeaderMenu />
    </header>
  )
}
