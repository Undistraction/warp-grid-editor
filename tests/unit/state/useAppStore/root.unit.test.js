import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'

import { PROJECT_DEFAULT } from '../../../../src/state/defaults'
import useAppStore from '../../../../src/state/useAppStore'

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`useAppStore`, () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppStore())

    act(() => {
      result.current.reset()
    })
  })

  it(`should return the initial state`, () => {
    const { result } = renderHook(() => useAppStore())
    expect(result.current.config).toBeNull()
    expect(result.current.project).toEqual(PROJECT_DEFAULT)
    expect(result.current.projects).toEqual([])
  })
})
