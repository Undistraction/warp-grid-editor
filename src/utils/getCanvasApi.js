import { isNil } from 'ramda'
import { isArray } from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const isCurve = (line) => {
  return !isNil(line.controlPoint1) && !isNil(line.controlPoint2)
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const getCanvasApi = (context) => {
  const drawDot = ({ x, y }, { color = `black`, size = 2, text } = {}) => {
    context.beginPath()
    context.moveTo(x, y)
    context.arc(x, y, size, 0, Math.PI * 2)
    context.fillStyle = color
    context.fill()
    if (text) {
      context.fillStyle = `black`
      context.fillText(text, x, y)
    }
  }

  const drawCurve = (
    { controlPoint1, controlPoint2, startPoint, endPoint },
    { color = `red`, lineWidth = 1 } = {}
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
    context.lineWidth = lineWidth
    context.stroke()
  }

  const drawQuad = (
    boundingCurves,
    { color = `green`, lineWidth = 1 } = {}
  ) => {
    context.beginPath()
    context.moveTo(
      boundingCurves.top.startPoint.x,
      boundingCurves.top.startPoint.y
    )

    // Draw Top (left to right)
    context.bezierCurveTo(
      boundingCurves.top.controlPoint1.x,
      boundingCurves.top.controlPoint1.y,
      boundingCurves.top.controlPoint2.x,
      boundingCurves.top.controlPoint2.y,
      boundingCurves.top.endPoint.x,
      boundingCurves.top.endPoint.y
    )

    // Draw Right (top to bottom)
    context.bezierCurveTo(
      boundingCurves.right.controlPoint1.x,
      boundingCurves.right.controlPoint1.y,
      boundingCurves.right.controlPoint2.x,
      boundingCurves.right.controlPoint2.y,
      boundingCurves.right.endPoint.x,
      boundingCurves.right.endPoint.y
    )

    // Draw Bottom (right to left) note the changed order as the line is
    // defined left to right and we are drawing right to left
    context.bezierCurveTo(
      boundingCurves.bottom.controlPoint2.x,
      boundingCurves.bottom.controlPoint2.y,
      boundingCurves.bottom.controlPoint1.x,
      boundingCurves.bottom.controlPoint1.y,
      boundingCurves.bottom.startPoint.x,
      boundingCurves.bottom.startPoint.y
    )

    // Draw Left (bottom to top) note the changed order as the line is
    // defined top to bottom and we are drawing bottom to top
    context.bezierCurveTo(
      boundingCurves.left.controlPoint2.x,
      boundingCurves.left.controlPoint2.y,
      boundingCurves.left.controlPoint1.x,
      boundingCurves.left.controlPoint1.y,
      boundingCurves.left.startPoint.x,
      boundingCurves.left.startPoint.y
    )

    context.closePath()
    context.strokeStyle = color
    context.lineWidth = lineWidth
    context.stroke()
  }

  const drawPatchBounds = (
    boundingCurves,
    { lineColor = `green`, lineWidth = 3 } = {}
  ) => {
    drawQuad(boundingCurves, { color: lineColor, lineWidth })
  }

  const drawBounds = (
    boundingCurves,
    { lineColor = `black`, lineWidth = 2 } = {}
  ) => {
    drawQuad(boundingCurves, { color: lineColor, lineWidth })
  }

  const clearCanvas = (canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const drawGridCurve = (line, { lineColor = `black` }) => {
    if (isCurve(line)) {
      drawCurve(line, { color: lineColor })
    } else {
      drawStraightLine(line)
    }
  }

  const drawCoonsPatch = (
    coonsPatch,
    { shouldDrawIntersections, shouldDrawBounds }
  ) => {
    if (shouldDrawBounds) {
      drawBounds(coonsPatch.model.boundingCurves)
    }

    const lines = coonsPatch.getLines()
    // Draw lines along x axis
    lines.xAxis.map((curveSectionsOrCurve) => {
      if (isArray(curveSectionsOrCurve)) {
        curveSectionsOrCurve.map(drawGridCurve)
      } else {
        drawGridCurve(curveSectionsOrCurve)
      }
    })

    //Draw lines along y axis
    lines.yAxis.map((curveSectionsOrCurve) => {
      if (isArray(curveSectionsOrCurve)) {
        curveSectionsOrCurve.map(drawGridCurve)
      } else {
        drawGridCurve(curveSectionsOrCurve)
      }
    })

    if (shouldDrawIntersections) {
      // Draw intersections between grid boundingCurves
      coonsPatch.getIntersections().map((point) => {
        drawDot(point, {
          size: 3,
        })
      })
    }
  }

  const drawGridSquareBounds = (boundingCurves) => {
    drawPatchBounds(boundingCurves, { lineColor: `green`, lineWidth: 3 })
  }

  const drawStraightLine = (line, { color = `black`, lineWidth = 1 } = {}) => {
    context.beginPath()
    context.moveTo(line.startPoint.x, line.startPoint.y)
    context.lineTo(line.endPoint.x, line.endPoint.y)
    context.strokeStyle = color
    context.lineWidth = lineWidth
    context.stroke()
  }

  return {
    clearCanvas,
    drawCoonsPatch,
    drawGridSquareBounds,
  }
}

export default getCanvasApi
