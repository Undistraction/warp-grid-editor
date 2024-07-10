const getCanvasApi = (context) => {
  function drawDot({ x, y }, { color = 'red', size = 2 } = {}) {
    context.fillStyle = color
    context.beginPath()
    context.arc(x, y, size, 0, Math.PI * 2)
    context.fill()
  }

  const drawCurve = (
    { controlPoint1, controlPoint2, startPoint, endPoint },
    color = 'red'
  ) => {
    context.beginPath()
    context.moveTo(startPoint.x, startPoint.y)

    // Draw curve from point 0 to point 1
    context.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      endPoint.x,
      endPoint.y
    )

    context.strokeStyle = color
    context.stroke()
  }

  const drawQuad = (lines, color = 'red') => {
    context.beginPath()
    context.moveTo(lines.top.startPoint.x, lines.top.startPoint.y)

    // Draw Top (left to right)
    context.bezierCurveTo(
      lines.top.controlPoint1.x,
      lines.top.controlPoint1.y,
      lines.top.controlPoint2.x,
      lines.top.controlPoint2.y,
      lines.top.endPoint.x,
      lines.top.endPoint.y
    )

    // Draw Right (top to bottom)
    context.bezierCurveTo(
      lines.right.controlPoint1.x,
      lines.right.controlPoint1.y,
      lines.right.controlPoint2.x,
      lines.right.controlPoint2.y,
      lines.right.endPoint.x,
      lines.right.endPoint.y
    )

    // Draw Bottom (right to left) note the changed order as the line is
    // defined left to right and we are drawing right to left
    context.bezierCurveTo(
      lines.bottom.controlPoint2.x,
      lines.bottom.controlPoint2.y,
      lines.bottom.controlPoint1.x,
      lines.bottom.controlPoint1.y,
      lines.bottom.startPoint.x,
      lines.bottom.startPoint.y
    )

    // Draw Left (bottom to top) note the changed order as the line is
    // defined top to bottom and we are drawing bottom to top
    context.bezierCurveTo(
      lines.left.controlPoint2.x,
      lines.left.controlPoint2.y,
      lines.left.controlPoint1.x,
      lines.left.controlPoint1.y,
      lines.left.startPoint.x,
      lines.left.startPoint.y
    )

    context.closePath()
    context.strokeStyle = color
    context.stroke()
  }

  const drawBounds = (lines, { color = 'puple', size = 8 } = {}) => {
    drawQuad(lines)
    drawDot(lines.top.startPoint, { color, size })
    drawDot(lines.right.startPoint, { color, size })
    drawDot(lines.left.endPoint, { color, size })
    drawDot(lines.bottom.endPoint, { color, size })
  }

  const drawLine = (startPoint, endPoint, { color = 'grey' } = {}) => {
    context.beginPath()
    context.moveTo(startPoint.x, startPoint.y)
    context.lineTo(endPoint.x, endPoint.y)
    context.strokeStyle = color
    context.stroke()
  }

  const clearCanvas = (canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const drawGridCurve = (
    curve,
    { pointColor = 'red', lineColor = 'blue', controlPointColor = 'green' }
  ) => {
    drawDot(curve.startPoint, { color: pointColor })
    drawDot(curve.endPoint, { color: pointColor })
    drawDot(curve.controlPoint1, { color: controlPointColor })
    drawDot(curve.controlPoint2, { color: controlPointColor })
    drawCurve(curve, { color: lineColor })
    drawLine(curve.startPoint, curve.controlPoint1)
    drawLine(curve.endPoint, curve.controlPoint2)
  }

  const drawCoonsPatch = (coonsPatch) => {
    // Draw bounds
    drawBounds(coonsPatch.boundingCurves)
    // Draw lines
    coonsPatch.curvesFromLeftToRight.map(drawGridCurve)
    coonsPatch.curvesFromTopToBottom.map(drawGridCurve)

    // Draw intersections between grid lines
    coonsPatch.intersections.map((point) => {
      drawDot(point)
    })
  }

  return {
    drawDot,
    drawCurve,
    drawQuad,
    drawBounds,
    clearCanvas,
    drawCoonsPatch,
  }
}

export default getCanvasApi
