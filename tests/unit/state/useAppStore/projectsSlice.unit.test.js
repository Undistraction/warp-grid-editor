import { act, renderHook } from '@testing-library/react'
import { assocPath } from 'ramda'
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
    expect(result.current.projects).toEqual([])
  })

  describe(`api`, () => {
    describe(`saveProject`, () => {
      it(`adds project to projects`, () => {
        const { result } = renderHook(() => useAppStore())
        const newProject = assocPath([`meta`, `name`], `Alpha`, PROJECT_DEFAULT)
        act(() => result.current.saveProject(newProject))
        expect(result.current.projects[0]).toEqual(newProject)
        expect(result.current.projects).toHaveLength(1)
      })
    })

    describe(`saveProjectAs`, () => {
      it(`adds project to projects as a new project`, () => {
        const { result } = renderHook(() => useAppStore())
        const newProject = assocPath([`meta`, `name`], `Alpha`, PROJECT_DEFAULT)
        act(() => result.current.saveProject(newProject))
        act(() => result.current.saveProjectAs(newProject))

        expect(result.current.projects).toHaveLength(2)

        // Check projects are different
        expect(result.current.projects[0]).toEqual(newProject)
        expect(result.current.projects[0]).not.toEqual(
          result.current.projects[1]
        )

        // Check uuid is different
        expect(result.current.projects[0].meta.uuid).not.toEqual(
          result.current.projects[1].meta.uuid
        )
      })
    })

    describe(`loadProject`, () => {
      it(`loads projects`, () => {
        const { result } = renderHook(() => useAppStore())
        const newProject1 = assocPath([`meta`, `uuid`], `1234`, PROJECT_DEFAULT)
        act(() => result.current.saveProject(newProject1))

        const newProject2 = assocPath([`meta`, `uuid`], `5676`, PROJECT_DEFAULT)

        act(() => result.current.saveProject(newProject2))

        act(() => result.current.loadProject(`1234`))

        expect(result.current.project).toEqual(newProject1)

        act(() => result.current.loadProject(`5676`))

        expect(result.current.project).toEqual(newProject2)

        expect(result.current.projects).toHaveLength(2)
      })
    })
  })
})
