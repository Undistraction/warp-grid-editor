import { act, renderHook } from '@testing-library/react'

import { APP_CONFIG_DEFAULT } from '../../../../src/state/defaults'
import useAppStore from '../../../../src/state/useAppStore'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`useAppStore projectSlice`, () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppStore())

    act(() => {
      result.current.reset()
    })
  })

  it(`should return the initial state`, () => {
    const { result } = renderHook(() => useAppStore())
    expect(result.current.config).toEqual(APP_CONFIG_DEFAULT)
  })

  describe(`api`, () => {
    // -------------------------------------------------------------------------
    // Config Generic
    // -------------------------------------------------------------------------

    describe(`setAppConfigValue`, () => {
      it(`throws an error if the config parameter doesn't exist`, () => {
        const { result } = renderHook(() => useAppStore())
        const pathToParam = [`alpha`, `bravo`]
        expect(() => {
          act(() => result.current.setAppConfigValue(pathToParam, 1))
        }).toThrow(`App config item 'alpha.bravo' does not exist`)
      })

      it(`updates the config value at the supplied path`, () => {
        const { result } = renderHook(() => useAppStore())
        const pathToParam = [`ui`, `sidebar`, `isHidden`]
        expect(result.current.config.ui.sidebar.isHidden).toBeFalse()
        act(() => result.current.setAppConfigValue(pathToParam, true))
        expect(result.current.config.ui.sidebar.isHidden).toBeTrue()
      })
    })
  })
})
