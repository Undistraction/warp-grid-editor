// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

import { ControlPointId, CornerPointId } from '../../../src/enums'
import {
  expandAllBoundingCurvesControlPoints,
  expandBoundingCurvesCornerControlPoints,
  getBoundingCurvesCorners,
  moveBoundingCurves,
  moveBoundingCurvesNodePosition,
  moveBoundingCurvesToOrigin,
  zeroAllBoundingCurvesControlPoints,
  zeroBoundingCurvesCornerControlPoints,
} from '../../../src/utils/boundingCurves'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const BOUNDING_CURVES = Object.freeze({
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
})

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

describe(`getBoundingCurvesCorners`, () => {
  it(`returns the corners of the bounding curves`, () => {
    const expected = {
      cornerTopLeft: {
        cornerPoint: { id: `cornerTopLeft`, point: { x: 0, y: 0 } },
        controlPoint1: { id: `controlTopLeft1`, point: { x: 10, y: -10 } },
        controlPoint2: { id: `controlTopLeft2`, point: { x: -10, y: -10 } },
      },
      cornerTopRight: {
        cornerPoint: { id: `cornerTopRight`, point: { x: 100, y: 0 } },
        controlPoint1: { id: `controlTopRight1`, point: { x: 90, y: -10 } },
        controlPoint2: { id: `controlTopRight2`, point: { x: 110, y: -10 } },
      },
      cornerBottomLeft: {
        cornerPoint: { id: `cornerBottomLeft`, point: { x: 0, y: 100 } },
        controlPoint1: { id: `controlBottomLeft1`, point: { x: -10, y: 110 } },
        controlPoint2: { id: `controlBottomLeft2`, point: { x: -10, y: 110 } },
      },
      cornerBottomRight: {
        cornerPoint: { id: `cornerBottomRight`, point: { x: 100, y: 100 } },
        controlPoint1: { id: `controlBottomRight1`, point: { x: 110, y: 110 } },
        controlPoint2: { id: `controlBottomRight2`, point: { x: 110, y: 110 } },
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

describe(`moveBoundingCurvesToOrigin`, () => {
  it(`moves the bounding curves to point 0,0`, () => {
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

    expect(moveBoundingCurvesToOrigin(BOUNDING_CURVES)).toEqual(expected)
  })
})

describe(`moveBoundingCurvesNodePosition`, () => {
  it(`updates the position of the corner point with the supplied ID along with its control zeroControlPoints`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [CornerPointId.BOTTOM_RIGHT]: {
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
      moveBoundingCurvesNodePosition(
        CONFIG,
        CornerPointId.BOTTOM_RIGHT,
        NEW_POINT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })

  it(`updates the position of control point with the supplied ID only when it is not linked`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [CornerPointId.TOP_RIGHT]: {
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
      moveBoundingCurvesNodePosition(
        CONFIG,
        ControlPointId.TOP_RIGHT_CONTROL_1,
        NEW_POINT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })

  it(`updates the position of control point with the supplied ID and also it's partner when it is linked`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [CornerPointId.BOTTOM_LEFT]: {
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
      moveBoundingCurvesNodePosition(
        CONFIG,
        ControlPointId.BOTTOM_LEFT_CONTROL_1,
        NEW_POINT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })

  it(`updates the position of control point with the supplied ID and also it's partner by the same distance when it is linked and mirrored`, () => {
    const CONFIG = {
      bounds: {
        corners: {
          [CornerPointId.BOTTOM_LEFT]: {
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
      moveBoundingCurvesNodePosition(
        CONFIG,
        ControlPointId.BOTTOM_LEFT_CONTROL_1,
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
        ...BOUNDING_CURVES.top,
        controlPoint1: { x: 10, y: -10 },
        controlPoint2: { x: 90, y: -10 },
      },
      bottom: {
        ...BOUNDING_CURVES.bottom,
        controlPoint1: { x: 30, y: 130 },
        controlPoint2: { x: 110, y: 110 },
      },
      left: {
        ...BOUNDING_CURVES.left,
        controlPoint1: { x: -10, y: -10 },
        controlPoint2: { x: -30, y: 70 },
      },
      right: {
        ...BOUNDING_CURVES.right,
        controlPoint1: { x: 110, y: -10 },
        controlPoint2: { x: 110, y: 110 },
      },
    }

    expect(
      expandBoundingCurvesCornerControlPoints(
        CornerPointId.BOTTOM_LEFT,
        BOUNDING_CURVES
      )
    ).toEqual(expected)
  })
})

describe(`zeroBoundingCurvesCornerControlPoints`, () => {
  it(`zeros the control points of the top left corner`, () => {
    const expected = {
      ...BOUNDING_CURVES,
      top: {
        ...BOUNDING_CURVES.top,
        controlPoint1: { x: 0, y: 0 },
      },
      left: {
        ...BOUNDING_CURVES.left,
        controlPoint1: { x: 0, y: 0 },
      },
    }

    const result = zeroBoundingCurvesCornerControlPoints(
      CornerPointId.TOP_LEFT,
      BOUNDING_CURVES
    )

    expect(result).toEqual(expected)
  })

  it(`zeros the control points of the bottom left corner`, () => {
    const expected = {
      ...BOUNDING_CURVES,
      bottom: {
        ...BOUNDING_CURVES.bottom,
        controlPoint1: { x: 0, y: 100 },
      },
      left: {
        ...BOUNDING_CURVES.left,
        controlPoint2: { x: 0, y: 100 },
      },
    }

    const result = zeroBoundingCurvesCornerControlPoints(
      CornerPointId.BOTTOM_LEFT,
      BOUNDING_CURVES
    )

    expect(result).toEqual(expected)
  })

  it(`zeros the control points of the top right corner`, () => {
    const expected = {
      ...BOUNDING_CURVES,
      top: {
        ...BOUNDING_CURVES.top,
        controlPoint2: { x: 100, y: 0 },
      },
      right: {
        ...BOUNDING_CURVES.right,
        controlPoint1: { x: 100, y: 0 },
      },
    }

    const result = zeroBoundingCurvesCornerControlPoints(
      CornerPointId.TOP_RIGHT,
      BOUNDING_CURVES
    )

    expect(result).toEqual(expected)
  })

  it(`zeros the control points of the bottom right corner`, () => {
    const expected = {
      ...BOUNDING_CURVES,
      bottom: {
        ...BOUNDING_CURVES.bottom,
        controlPoint2: { x: 100, y: 100 },
      },
      right: {
        ...BOUNDING_CURVES.right,
        controlPoint2: { x: 100, y: 100 },
      },
    }

    const result = zeroBoundingCurvesCornerControlPoints(
      CornerPointId.BOTTOM_RIGHT,
      BOUNDING_CURVES
    )

    expect(result).toEqual(expected)
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
