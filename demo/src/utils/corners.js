import { BOUNDS_POINT_IDS } from '../const'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const EXPANSION_DISTANCE = 30

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const updateNodePosition = (boundingCurves, id, point) => {
  // Top Left
  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    return {
      ...boundingCurves,
      top: {
        ...boundingCurves.top,
        startPoint: point,
      },
      left: {
        ...boundingCurves.left,
        startPoint: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1) {
    return {
      ...boundingCurves,
      top: {
        ...boundingCurves.top,
        controlPoint1: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2) {
    return {
      ...boundingCurves,
      left: {
        ...boundingCurves.left,
        controlPoint1: point,
      },
    }
    // Top Right
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
    return {
      ...boundingCurves,
      top: {
        ...boundingCurves.top,
        endPoint: point,
      },
      right: {
        ...boundingCurves.right,
        startPoint: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1) {
    return {
      ...boundingCurves,
      top: {
        ...boundingCurves.top,
        controlPoint2: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2) {
    return {
      ...boundingCurves,
      right: {
        ...boundingCurves.right,
        controlPoint1: point,
      },
    }
    // BOTTOM LEFT
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
    return {
      ...boundingCurves,
      bottom: {
        ...boundingCurves.bottom,
        startPoint: point,
      },
      left: {
        ...boundingCurves.left,
        endPoint: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1) {
    return {
      ...boundingCurves,
      bottom: {
        ...boundingCurves.bottom,
        controlPoint1: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2) {
    return {
      ...boundingCurves,
      left: {
        ...boundingCurves.left,
        controlPoint2: point,
      },
    }
    // BOTTOM RIGHT
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
    return {
      ...boundingCurves,
      bottom: {
        ...boundingCurves.bottom,
        endPoint: point,
      },
      right: {
        ...boundingCurves.right,
        endPoint: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1) {
    return {
      ...boundingCurves,
      bottom: {
        ...boundingCurves.bottom,
        controlPoint2: point,
      },
    }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2) {
    return {
      ...boundingCurves,
      right: {
        ...boundingCurves.right,
        controlPoint2: point,
      },
    }
  }
}

export const expandControlPoints = (boundingCurves, id) => {
  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    const cornerPoint = boundingCurves.top.startPoint
    boundingCurves.top.controlPoint1.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.top.controlPoint1.y = cornerPoint.y - EXPANSION_DISTANCE
    boundingCurves.left.controlPoint1.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.left.controlPoint1.y = cornerPoint.y + EXPANSION_DISTANCE
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
    const cornerPoint = boundingCurves.top.endPoint
    boundingCurves.top.controlPoint2.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.top.controlPoint2.y = cornerPoint.y - EXPANSION_DISTANCE
    boundingCurves.right.controlPoint1.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.right.controlPoint1.y = cornerPoint.y + EXPANSION_DISTANCE
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
    const cornerPoint = boundingCurves.bottom.startPoint
    boundingCurves.bottom.controlPoint1.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.bottom.controlPoint1.y = cornerPoint.y + EXPANSION_DISTANCE
    boundingCurves.left.controlPoint2.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.left.controlPoint2.y = cornerPoint.y - EXPANSION_DISTANCE
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
    const cornerPoint = boundingCurves.bottom.endPoint
    boundingCurves.bottom.controlPoint2.x = cornerPoint.x - EXPANSION_DISTANCE
    boundingCurves.bottom.controlPoint2.y = cornerPoint.y + EXPANSION_DISTANCE
    boundingCurves.right.controlPoint2.x = cornerPoint.x + EXPANSION_DISTANCE
    boundingCurves.right.controlPoint2.y = cornerPoint.y - EXPANSION_DISTANCE
    return { ...boundingCurves }
  }
}

export const zeroControlPoints = (boundingCurves, id) => {
  if (id === BOUNDS_POINT_IDS.TOP_LEFT) {
    const cornerPoint = boundingCurves.top.startPoint
    boundingCurves.top.controlPoint1.x = cornerPoint.x
    boundingCurves.top.controlPoint1.y = cornerPoint.y
    boundingCurves.left.controlPoint1.x = cornerPoint.x
    boundingCurves.left.controlPoint1.y = cornerPoint.y
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.TOP_RIGHT) {
    const cornerPoint = boundingCurves.top.endPoint
    boundingCurves.top.controlPoint2.x = cornerPoint.x
    boundingCurves.top.controlPoint2.y = cornerPoint.y
    boundingCurves.right.controlPoint1.x = cornerPoint.x
    boundingCurves.right.controlPoint1.y = cornerPoint.y
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_LEFT) {
    const cornerPoint = boundingCurves.bottom.startPoint
    boundingCurves.bottom.controlPoint1.x = cornerPoint.x
    boundingCurves.bottom.controlPoint1.y = cornerPoint.y
    boundingCurves.left.controlPoint2.x = cornerPoint.x
    boundingCurves.left.controlPoint2.y = cornerPoint.y
    return { ...boundingCurves }
  } else if (id === BOUNDS_POINT_IDS.BOTTOM_RIGHT) {
    const cornerPoint = boundingCurves.bottom.endPoint
    boundingCurves.bottom.controlPoint2.x = cornerPoint.x
    boundingCurves.bottom.controlPoint2.y = cornerPoint.y
    boundingCurves.right.controlPoint2.x = cornerPoint.x
    boundingCurves.right.controlPoint2.y = cornerPoint.y
    return { ...boundingCurves }
  }
}

export const getCorners = (boundingCurves) => {
  return {
    [BOUNDS_POINT_IDS.TOP_LEFT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.TOP_LEFT,
        point: boundingCurves?.top?.startPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_1,
        point: boundingCurves?.top?.controlPoint1,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.TOP_LEFT_CONTROL_2,
        point: boundingCurves?.left?.controlPoint1,
      },
    },
    [BOUNDS_POINT_IDS.TOP_RIGHT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT,
        point: boundingCurves?.top?.endPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_1,
        point: boundingCurves?.top?.controlPoint2,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.TOP_RIGHT_CONTROL_2,
        point: boundingCurves?.right?.controlPoint1,
      },
    },
    [BOUNDS_POINT_IDS.BOTTOM_LEFT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT,
        point: boundingCurves?.bottom?.startPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_1,
        point: boundingCurves?.bottom?.controlPoint1,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.BOTTOM_LEFT_CONTROL_2,
        point: boundingCurves?.left?.controlPoint2,
      },
    },
    [BOUNDS_POINT_IDS.BOTTOM_RIGHT]: {
      cornerPoint: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT,
        point: boundingCurves?.bottom?.endPoint,
      },
      controlPoint1: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_1,
        point: boundingCurves?.bottom?.controlPoint2,
      },
      controlPoint2: {
        id: BOUNDS_POINT_IDS.BOTTOM_RIGHT_CONTROL_2,
        point: boundingCurves?.right?.controlPoint2,
      },
    },
  }
}
