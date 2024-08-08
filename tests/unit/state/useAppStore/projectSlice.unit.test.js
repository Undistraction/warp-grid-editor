import { act, renderHook } from '@testing-library/react'
import { assocPath } from 'ramda'
import { beforeEach, describe } from 'vitest'

import { BOUNDS_POINT_IDS } from '../../../../src/const'
import { PROJECT_DEFAULT } from '../../../../src/state/defaults'
import useAppStore from '../../../../src/state/useAppStore'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const BOUNDING_CURVES = {
  top: {
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 100, y: 0 },
    controlPoint1: { x: 10, y: -10 },
    controlPoint2: { x: 90, y: -10 },
  },
  bottom: {
    startPoint: { x: 0, y: 100 },
    endPoint: { x: 100, y: 100 },
    controlPoint1: { x: -10, y: 110 },
    controlPoint2: { x: 110, y: 110 },
  },
  left: {
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 100 },
    controlPoint1: { x: -10, y: -10 },
    controlPoint2: { x: -10, y: 110 },
  },
  right: {
    startPoint: { x: 100, y: 0 },
    endPoint: { x: 100, y: 100 },
    controlPoint1: { x: 110, y: -10 },
    controlPoint2: { x: 110, y: 110 },
  },
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`useAppStore projectSlide`, () => {
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

  describe(`api`, () => {
    // -------------------------------------------------------------------------
    // Project
    // -------------------------------------------------------------------------

    describe(`setProject`, () => {
      it(`replaces project with new project`, () => {
        const { result } = renderHook(() => useAppStore())
        const newProject = assocPath([`meta`, `name`], `Alpha`, PROJECT_DEFAULT)
        act(() => result.current.setProject(newProject))
        expect(result.current.project).toEqual(newProject)
      })
    })

    describe(`setProjectName`, () => {
      it(`replaces the project name`, () => {
        const { result } = renderHook(() => useAppStore())
        const NAME = `Alpha`
        act(() => result.current.setProjectName(NAME))
        expect(result.current.project.meta.name).toEqual(NAME)
      })
    })

    // -------------------------------------------------------------------------
    // Bounding curves
    // -------------------------------------------------------------------------

    describe(`setBoundingCurves`, () => {
      it(`should update the bounding curves in the project`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        expect(result.current.project.boundingCurves).toEqual(BOUNDING_CURVES)
      })
    })

    describe(`updateBoundingCurvesPosition`, () => {
      it(`throws if bounding curves haven't been set`, () => {
        const { result } = renderHook(() => useAppStore())
        const newPosition = { x: 50, y: 50 }
        expect(() => {
          act(() => result.current.updateBoundingCurvesPosition(newPosition))
        }).toThrow(`Project has no bounding curves`)
      })

      it(`updates the position of the bounding curves`, () => {
        const { result } = renderHook(() => useAppStore())
        const newPosition = { x: 50, y: 50 }
        // Bounding Curves are null by default so we need to set them first
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.updateBoundingCurvesPosition(newPosition))
        expect(result.current.project.boundingCurves.top.startPoint).toEqual(
          newPosition
        )
      })
    })

    describe(`updateBoundingCurvesNodePosition`, () => {
      it(`updates the position of a corner node`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))

        const newPosition = { x: 50, y: 50 }
        act(() =>
          result.current.updateBoundingCurvesNodePosition(
            BOUNDS_POINT_IDS.BOTTOM_LEFT,
            newPosition
          )
        )
        expect(result.current.project.boundingCurves.bottom.startPoint).toEqual(
          newPosition
        )
        expect(result.current.project.boundingCurves.left.endPoint).toEqual(
          newPosition
        )
      })

      it(`updates the position of a control point`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))

        const newPosition = { x: 50, y: 50 }
        act(() =>
          result.current.updateBoundingCurvesNodePosition(
            BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1,
            newPosition
          )
        )
        expect(
          result.current.project.boundingCurves.bottom.controlPoint1
        ).toEqual(newPosition)
      })
    })

    // -------------------------------------------------------------------------
    // Config global
    // -------------------------------------------------------------------------

    describe(`zeroControlPointsGlobal`, () => {
      it(`should zero out all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.zeroControlPointsGlobal())
        const { top, bottom, left, right } =
          result.current.project.boundingCurves
        expect(top.controlPoint1).toEqual(top.startPoint)
        expect(top.controlPoint2).toEqual(top.endPoint)
        expect(bottom.controlPoint1).toEqual(bottom.startPoint)
        expect(bottom.controlPoint2).toEqual(bottom.endPoint)
        expect(left.controlPoint1).toEqual(left.startPoint)
        expect(left.controlPoint2).toEqual(left.endPoint)
        expect(right.controlPoint1).toEqual(right.startPoint)
        expect(right.controlPoint2).toEqual(right.endPoint)
      })
    })

    describe(`linkControlPointsGlobal`, () => {
      it(`should link all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.linkControlPointsGlobal(false))
        act(() => result.current.linkControlPointsGlobal(true))
        const { topLeft, topRight, bottomLeft, bottomRight } =
          result.current.project.config.bounds.corners
        expect(result.current.project.config.bounds.isLinked).toBeTrue()
        expect(topLeft.isLinked).toBeTrue()
        expect(topRight.isLinked).toBeTrue()
        expect(bottomLeft.isLinked).toBeTrue()
        expect(bottomRight.isLinked).toBeTrue()
      })

      it(`should unlink all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.linkControlPointsGlobal(false))
        const { topLeft, topRight, bottomLeft, bottomRight } =
          result.current.project.config.bounds.corners
        expect(result.current.project.config.bounds.isLinked).toBeFalse()
        expect(topLeft.isLinked).toBeFalse()
        expect(topRight.isLinked).toBeFalse()
        expect(bottomLeft.isLinked).toBeFalse()
        expect(bottomRight.isLinked).toBeFalse()
      })
    })

    describe(`mirrorControlPointsGlobal`, () => {
      it(`should link all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.mirrorControlPointsGlobal(false))
        act(() => result.current.mirrorControlPointsGlobal(true))
        const { topLeft, topRight, bottomLeft, bottomRight } =
          result.current.project.config.bounds.corners
        expect(result.current.project.config.bounds.isMirrored).toBeTrue()
        expect(topLeft.isMirrored).toBeTrue()
        expect(topRight.isMirrored).toBeTrue()
        expect(bottomLeft.isMirrored).toBeTrue()
        expect(bottomRight.isMirrored).toBeTrue()
      })

      it(`should unlink all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.mirrorControlPointsGlobal(false))
        const { topLeft, topRight, bottomLeft, bottomRight } =
          result.current.project.config.bounds.corners
        expect(result.current.project.config.bounds.isMirrored).toBeFalse()
        expect(topLeft.isMirrored).toBeFalse()
        expect(topRight.isMirrored).toBeFalse()
        expect(bottomLeft.isMirrored).toBeFalse()
        expect(bottomRight.isMirrored).toBeFalse()
      })
    })

    // -------------------------------------------------------------------------
    // Config other
    // -------------------------------------------------------------------------

    describe(`zeroControlPoints`, () => {
      it(`should zero out control points for supplied corner`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.zeroControlPoints(BOUNDS_POINT_IDS.TOP_RIGHT))
        const { top, right } = result.current.project.boundingCurves
        expect(top.controlPoint2).toEqual(top.endPoint)
        expect(right.controlPoint1).toEqual(right.startPoint)
      })
    })

    describe(`linkControlPoints`, () => {
      it(`should link all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() =>
          result.current.linkControlPoints(BOUNDS_POINT_IDS.BOTTOM_LEFT, false)
        )
        act(() =>
          result.current.linkControlPoints(BOUNDS_POINT_IDS.BOTTOM_LEFT, `ccc`)
        )
        const { bottomRight } = result.current.project.config.bounds.corners
        expect(bottomRight.isLinked).toBeTrue()
      })

      it(`should unlink all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() =>
          result.current.linkControlPoints(BOUNDS_POINT_IDS.BOTTOM_LEFT, false)
        )
        const { bottomLeft } = result.current.project.config.bounds.corners
        expect(bottomLeft.isLinked).toBeFalse()
      })
    })

    describe(`mirrorControlPoints`, () => {
      it(`should link all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.mirrorControlPointsGlobal(false))
        act(() => result.current.mirrorControlPointsGlobal(true))
        const { topLeft, topRight, bottomLeft, bottomRight } =
          result.current.project.config.bounds.corners
        expect(result.current.project.config.bounds.isMirrored).toBeTrue()
        expect(topLeft.isMirrored).toBeTrue()
        expect(topRight.isMirrored).toBeTrue()
        expect(bottomLeft.isMirrored).toBeTrue()
        expect(bottomRight.isMirrored).toBeTrue()
      })

      it(`should unlink all control points`, () => {
        const { result } = renderHook(() => useAppStore())
        act(() => result.current.setBoundingCurves(BOUNDING_CURVES))
        act(() => result.current.mirrorControlPointsGlobal(false))
        const { topLeft, topRight, bottomLeft, bottomRight } =
          result.current.project.config.bounds.corners
        expect(result.current.project.config.bounds.isMirrored).toBeFalse()
        expect(topLeft.isMirrored).toBeFalse()
        expect(topRight.isMirrored).toBeFalse()
        expect(bottomLeft.isMirrored).toBeFalse()
        expect(bottomRight.isMirrored).toBeFalse()
      })
    })

    // -------------------------------------------------------------------------
    // Config Generic
    // -------------------------------------------------------------------------

    describe(`setConfig`, () => {
      it(`throws an error if the config parameter doesn't exist`, () => {
        const { result } = renderHook(() => useAppStore())
        const pathToParam = [`alpha`, `bravo`]
        expect(() => {
          act(() => result.current.setConfigValue(pathToParam, 1))
        }).toThrow(`Config item 'alpha.bravo' does not exist`)
      })

      it(`updates the config value at the supplied path`, () => {
        const { result } = renderHook(() => useAppStore())
        const pathToParam = [`bounds`, `shouldDrawBounds`]
        expect(result.current.project.config.bounds.shouldDrawBounds).toBeTrue()
        act(() => result.current.setConfigValue(pathToParam, false))
        expect(
          result.current.project.config.bounds.shouldDrawBounds
        ).toBeFalse()
      })
    })

    // -------------------------------------------------------------------------
    // Grid Definition
    // -------------------------------------------------------------------------

    describe(`setGridDefiniton`, () => {
      it(`throws an error if the grid definiton parameter doesn't exist`, () => {
        const { result } = renderHook(() => useAppStore())
        const pathToParam = [`alpha`, `bravo`]
        expect(() => {
          act(() => result.current.setGridDefinitionValue(pathToParam, 1))
        }).toThrow(`Grid definition item 'alpha.bravo' does not exist`)
      })

      it(`updates the grid definiton value at the supplied path`, () => {
        const { result } = renderHook(() => useAppStore())
        const pathToParam = [`columns`]
        expect(result.current.project.gridDefinition.columns).toBe(25)
        act(() => result.current.setGridDefinitionValue(pathToParam, 10))
        expect(result.current.project.gridDefinition.columns).toBe(10)
      })
    })
  })
})
