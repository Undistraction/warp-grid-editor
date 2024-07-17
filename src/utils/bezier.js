export const getBezierCurveFromPoints = (
  startPoint,
  midPoint1,
  midPoint2,
  endPoint
) => {
  const controlPoint1X =
    (1 / 6) *
    (-5 * startPoint.x + 18 * midPoint1.x - 9 * midPoint2.x + 2 * endPoint.x)
  const controlPoint1Y =
    (1 / 6) *
    (-5 * startPoint.y + 18 * midPoint1.y - 9 * midPoint2.y + 2 * endPoint.y)

  const controlPoint2X =
    (1 / 6) *
    (2 * startPoint.x - 9 * midPoint1.x + 18 * midPoint2.x - 5 * endPoint.x)
  const controlPoint2Y =
    (1 / 6) *
    (2 * startPoint.y - 9 * midPoint1.y + 18 * midPoint2.y - 5 * endPoint.y)

  return {
    startPoint,
    controlPoint1: {
      x: controlPoint1X,
      y: controlPoint1Y,
    },
    controlPoint2: {
      x: controlPoint2X,
      y: controlPoint2Y,
    },
    endPoint,
  }
}
