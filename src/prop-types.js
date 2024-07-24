import PropTypes from 'prop-types'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const typePoint = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

export const typeDimensions = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

export const typeCornerPoint = PropTypes.shape({
  point: typePoint.isRequired,
  id: PropTypes.string.isRequired,
})

export const typeGridAxis = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.arrayOf(PropTypes.number),
])

export const typeGrid = PropTypes.shape({
  interpolationStrategy: PropTypes.oneOf([`linear`, `even`]).isRequired,
  columns: typeGridAxis.isRequired,
  rows: typeGridAxis.isRequired,
})

export const typeSurface = PropTypes.shape({
  gridSquare: typePoint,
})

export const typeConfig = PropTypes.shape({
  grid: PropTypes.shape({
    shouldDrawIntersections: PropTypes.bool.isRequired,
  }).isRequired,
  bounds: PropTypes.shape({
    shouldDrawBounds: PropTypes.bool.isRequired,
    shouldDrawCornerPoints: PropTypes.bool.isRequired,
  }).isRequired,
  global: PropTypes.shape({
    isLinked: PropTypes.bool.isRequired,
    isMirrored: PropTypes.bool.isRequired,
  }).isRequired,
})

export const typeBoundingCurves = PropTypes.shape({
  top: PropTypes.shape({
    startPoint: typePoint.isRequired,
    endPoint: typePoint.isRequired,
    controlPoint1: typePoint.isRequired,
    controlPoint2: typePoint.isRequired,
  }).isRequired,
  bottom: PropTypes.shape({
    startPoint: typePoint.isRequired,
    endPoint: typePoint.isRequired,
    controlPoint1: typePoint.isRequired,
    controlPoint2: typePoint.isRequired,
  }).isRequired,
  left: PropTypes.shape({
    controlPoint1: typePoint.isRequired,
    controlPoint2: typePoint.isRequired,
  }).isRequired,
  right: PropTypes.shape({
    controlPoint1: typePoint.isRequired,
    controlPoint2: typePoint.isRequired,
  }).isRequired,
})