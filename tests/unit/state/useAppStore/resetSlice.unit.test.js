import { act, renderHook } from '@testing-library/react'
import { assocPath } from 'ramda'
import { beforeEach, describe } from 'vitest'

import {
  APP_CONFIG_DEFAULT,
  PROJECT_DEFAULT,
} from '../../../../src/state/defaults'
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

  describe(`api`, () => {
    describe(`reset`, () => {
      it(`should reset to the  initial state`, () => {
        const { result } = renderHook(() => useAppStore())

        // Set new project name
        const newName = `Alpha`
        const newProject = assocPath([`meta`, `name`], newName, PROJECT_DEFAULT)
        act(() => result.current.setProject(newProject))
        expect(result.current.project.meta.name).toEqual(newName)

        // Call reset
        act(() => result.current.reset())

        // Check it has reverted to default
        expect(result.current.config).toEqual(APP_CONFIG_DEFAULT)
        expect(result.current.project).toEqual(PROJECT_DEFAULT)
        expect(result.current.projects).toEqual([])
      })
    })
  })
})
