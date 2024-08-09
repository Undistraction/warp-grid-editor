// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

import { BOUNDS_POINT_IDS } from '../../../src/const'
import {
  expandAllBoundingCurvesControlPoints,
  expandBoundingCurvesCornerControlPoints,
  getBoundingCurvesCorners,
  moveBoundingCurves,
  updateBoundingCurvesNodePosition,
  zeroAllBoundingCurvesControlPoints,
  zeroBoundingCurvesCornerControlPoints,
} from '../../../src/utils/boundingCurves'

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

describe(`getBoundingCurvesCorners`, () => {
  it(`returns the corners of the bounding curves`, () => {
    const expected = {
      topLeft: {
        cornerPoint: { id: `topLeft`, point: { x: 0, y: 0 } },
        controlPoint1: { id: `topLeftControl1`, point: { x: 10, y: -10 } },
        controlPoint2: { id: `topLeftControl2`, point: { x: -10, y: -10 } },
      },
      topRight: {
        cornerPoint: { id: `topRight`, point: { x: 100, y: 0 } },
        controlPoint1: { id: `topRightControl1`, point: { x: 90, y: -10 } },
        controlPoint2: { id: `topRightControl2`, point: { x: 110, y: -10 } },
      },
      bottomLeft: {
        cornerPoint: { id: `bottomLeft`, point: { x: 0, y: 100 } },
        controlPoint1: { id: `bottomLeftControl1`, point: { x: -10, y: 110 } },
        controlPoint2: { id: `bottomLeftControl2`, point: { x: -10, y: 110 } },
      },
      bottomRight: {
        cornerPoint: { id: `bottomRight`, point: { x: 100, y: 100 } },
        controlPoint1: { id: `bottomRightControl1`, point: { x: 110, y: 110 } },
        controlPoint2: { id: `bottomRightControl2`, point: { x: 110, y: 110 } },
      },
    }
    expect(getBoundingCurvesCorners(BOUNDING_CURVES)).toEqual(expected)
  })
})

describe(`moveBoundingCurves`, () => {
  it(`move the bounding curves (and all control points) to the new position`, () => {
    const expected = {
      top: {
        startPoint: { x: 150, y: 80 },
        endPoint: { x: 250, y: 80 },
        controlPoint1: { x: 160, y: 70 },
        controlPoint2: { x: 240, y: 70 },
      },
      bottom: {
        startPoint: { x: 150, y: 180 },
        endPoint: { x: 250, y: 180 },
        controlPoint1: { x: 140, y: 190 },
        controlPoint2: { x: 260, y: 190 },
      },
      left: {
        startPoint: { x: 150, y: 80 },
        endPoint: { x: 150, y: 180 },
        controlPoint1: { x: 140, y: 70 },
        controlPoint2: { x: 140, y: 190 },
      },
      right: {
        startPoint: { x: 250, y: 80 },
        endPoint: { x: 250, y: 180 },
        controlPoint1: { x: 260, y: 70 },
        controlPoint2: { x: 260, y: 190 },
      },
    }
    expect(moveBoundingCurves({ x: 150, y: 80 }, BOUNDING_CURVES)).toEqual(
      expected
    )
  })

  it(`handles negative coordianates correctly`, () => {
    const expected = {
      top: {
        startPoint: { x: -150, y: -80 },
        endPoint: { x: -50, y: -80 },
        controlPoint1: { x: -140, y: -90 },
        controlPoint2: { x: -60, y: -90 },
      },
      bottom: {
        startPoint: { x: -150, y: 20 },
        endPoint: { x: -50, y: 20 },
        controlPoint1: { x: -160, y: 30 },
        controlPoint2: { x: -40, y: 30 },
      },
      left: {
        startPoint: { x: -150, y: -80 },
        endPoint: { x: -150, y: 20 },
        controlPoint1: { x: -160, y: -90 },
        controlPoint2: { x: -160, y: 30 },
      },
      right: {
        startPoint: { x: -50, y: -80 },
        endPoint: { x: -50, y: 20 },
        controlPoint1: { x: -40, y: -90 },
        controlPoint2: { x: -40, y: 30 },
      },
    }
    expect(moveBoundingCurves({ x: -150, y: -80 }, BOUNDING_CURVES)).toEqual(
      expected
    )
  })
})

describe(`updateBoundingCurvesNodePosition`, () => {
  it(`updates the position of the corner point with the supplied ID along with its control zeroControlPoints`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
            isLinked: false,
            isMirrored: false,
          },
        },
      },
    }

    const NEW_POINT = {
      x: 50,
      y: 200,
    }

    const expected = {
      ...BOUNDING_CURVES,
      right: {
        ...BOUNDING_CURVES.right,
        endPoint: NEW_POINT,
        controlPoint2: {
          x: 60,
          y: 210,
        },
      },
      bottom: {
        ...BOUNDING_CURVES.bottom,
        endPoint: {
          x: 50,
          y: 200,
        },
        controlPoint2: {
          x: 60,
          y: 210,
        },
      },
    }

    expect(
      updateBoundingCurvesNodePosition(
        CONFIG,
        BOUNDS_POINT_IDS.BOTTOM_RIGHT,
        NEW_POINT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })

  it(`updates the position of control point with the supplied ID only when it is not linked`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [BOUNDS_POINT_IDS.TOP_RIGHT]: {
            isLinked: false,
            isMirrored: false,
          },
        },
      },
    }

    const NEW_POINT = {
      x: 50,
      y: 200,
    }

    const expected = {
      ...BOUNDING_CURVES,
      top: {
        ...BOUNDING_CURVES.top,
        controlPoint2: NEW_POINT,
      },
    }

    expect(
      updateBoundingCurvesNodePosition(
        CONFIG,
        BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1,
        NEW_POINT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })

  it(`updates the position of control point with the supplied ID and also it's partner when it is linked`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
            isLinked: true,
            isMirrored: false,
          },
        },
      },
    }

    const NEW_POINT = {
      x: 50,
      y: 200,
    }

    const expected = {
      ...BOUNDING_CURVES,
      left: {
        ...BOUNDING_CURVES.left,
        controlPoint2: { x: -6, y: 87 },
      },
      bottom: {
        ...BOUNDING_CURVES.bottom,
        controlPoint1: NEW_POINT,
      },
    }

    expect(
      updateBoundingCurvesNodePosition(
        CONFIG,
        BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1,
        NEW_POINT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })

  it(`updates the position of control point with the supplied ID and also it's partner by the same distance when it is linked and mirrored`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
            isLinked: true,
            isMirrored: true,
          },
        },
      },
    }

    const NEW_POINT = {
      x: 50,
      y: 200,
    }

    const expected = {
      ...BOUNDING_CURVES,
      left: {
        ...BOUNDING_CURVES.left,
        controlPoint2: { x: -50, y: 0 },
      },
      bottom: {
        ...BOUNDING_CURVES.bottom,
        controlPoint1: NEW_POINT,
      },
    }

    expect(
      updateBoundingCurvesNodePosition(
        CONFIG,
        BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1,
        NEW_POINT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })
})

describe(`expandBoundingCurvesCornerControlPoints`, () => {
  it(`offsets the control points of the corner with the supplied ID from the corner point`, () => {
    const expected = {
      top: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 100, y: 0 },
        controlPoint1: { x: 10, y: -10 },
        controlPoint2: { x: 90, y: -10 },
      },
      bottom: {
        startPoint: { x: 0, y: 100 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 30, y: 130 },
        controlPoint2: { x: 110, y: 110 },
      },
      left: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 0, y: 100 },
        controlPoint1: { x: -10, y: -10 },
        controlPoint2: { x: -30, y: 70 },
      },
      right: {
        startPoint: { x: 100, y: 0 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 110, y: -10 },
        controlPoint2: { x: 110, y: 110 },
      },
    }

    expect(
      expandBoundingCurvesCornerControlPoints(
        BOUNDS_POINT_IDS.BOTTOM_LEFT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })
})

describe(`zeroBoundingCurvesCornerControlPoints`, () => {
  it(`sets the control points of the corner with the supplied ID to the same point as the corner point`, () => {
    const expected = {
      top: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 100, y: 0 },
        controlPoint1: { x: 10, y: -10 },
        controlPoint2: { x: 90, y: -10 },
      },
      bottom: {
        startPoint: { x: 0, y: 100 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 0, y: 100 },
        controlPoint2: { x: 110, y: 110 },
      },
      left: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 0, y: 100 },
        controlPoint1: { x: -10, y: -10 },
        controlPoint2: { x: 0, y: 100 },
      },
      right: {
        startPoint: { x: 100, y: 0 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 110, y: -10 },
        controlPoint2: { x: 110, y: 110 },
      },
    }

    expect(
      zeroBoundingCurvesCornerControlPoints(
        BOUNDS_POINT_IDS.BOTTOM_LEFT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })
})

describe(`expandAllBoundingCurvesControlPoints`, () => {
  it(`offsets the control points for each corner from the corner point`, () => {
    const expected = {
      top: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 100, y: 0 },
        controlPoint1: { x: 30, y: -30 },
        controlPoint2: { x: 70, y: -30 },
      },
      bottom: {
        startPoint: { x: 0, y: 100 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 30, y: 130 },
        controlPoint2: { x: 70, y: 130 },
      },
      left: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 0, y: 100 },
        controlPoint1: { x: -30, y: 30 },
        controlPoint2: { x: -30, y: 70 },
      },
      right: {
        startPoint: { x: 100, y: 0 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 130, y: 30 },
        controlPoint2: { x: 130, y: 70 },
      },
    }
    expect(expandAllBoundingCurvesControlPoints(BOUNDING_CURVES)).toEqual(
      expected
    )
  })
})

describe(`zeroAllBoundingCurvesControlPoints`, () => {
  it(`sets the control points for each corner to the same point as that corner`, () => {
    const expected = {
      top: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 100, y: 0 },
        controlPoint1: { x: 0, y: 0 },
        controlPoint2: { x: 100, y: 0 },
      },
      bottom: {
        startPoint: { x: 0, y: 100 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 0, y: 100 },
        controlPoint2: { x: 100, y: 100 },
      },
      left: {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 0, y: 100 },
        controlPoint1: { x: 0, y: 0 },
        controlPoint2: { x: 0, y: 100 },
      },
      right: {
        startPoint: { x: 100, y: 0 },
        endPoint: { x: 100, y: 100 },
        controlPoint1: { x: 100, y: 0 },
        controlPoint2: { x: 100, y: 100 },
      },
    }

    expect(zeroAllBoundingCurvesControlPoints(BOUNDING_CURVES)).toEqual(
      expected
    )
  })
})
