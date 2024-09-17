import PropTypes from 'prop-types'
import React from 'react'

import useObserveClientSize from '../../../../hooks/useObserveClientSize'
import BezierCurve from './BezierCurve'
import ControlPointNode from './ControlPointNode'
import ControlPointStems from './ControlPointStems'
// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const CONTROL_POINT_NODE_SIZE = 12
const CONTROL_POINT_NODE_SIZE_HALF = CONTROL_POINT_NODE_SIZE * 0.5

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const getPositionFromValue = (v1, v2, width, height) => ({
  x: v1 * (width - CONTROL_POINT_NODE_SIZE) + CONTROL_POINT_NODE_SIZE_HALF,
  y:
    (1 - v2) * (height - CONTROL_POINT_NODE_SIZE) +
    CONTROL_POINT_NODE_SIZE_HALF,
})

const getValuesFromPosition = ({ x, y }, { width, height }) => {
  return [
    (x - CONTROL_POINT_NODE_SIZE_HALF) / (width - CONTROL_POINT_NODE_SIZE),
    1 - (y - CONTROL_POINT_NODE_SIZE_HALF) / (height - CONTROL_POINT_NODE_SIZE),
  ]
}

const getPositionsFromValues = ([v1, v2, v3, v4], { width, height }) => ({
  controlPointStart: getPositionFromValue(v1, v2, width, height),
  controlPointEnd: getPositionFromValue(v3, v4, width, height),
})

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const BezierCurveEditor = ({ onChange, values }) => {
  const [bounds, setBounds] = React.useState(null)
  const [{ width, height }, setDimensions] = React.useState({
    width: 0,
    height: 0,
  })

  const ref = React.useRef(null)
  useObserveClientSize(ref, setDimensions)

  React.useEffect(() => {
    const newBounds = ref?.current.getBoundingClientRect()
    if (width > 0) {
      setBounds(newBounds)
    }
  }, [width, height, ref])

  const positions = React.useMemo(() => {
    return bounds && getPositionsFromValues(values, bounds)
  }, [values, bounds])

  const boundsInset = React.useMemo(
    () => ({
      width: bounds?.width - CONTROL_POINT_NODE_SIZE,
      height: bounds?.height - CONTROL_POINT_NODE_SIZE,
      x: CONTROL_POINT_NODE_SIZE_HALF,
      y: CONTROL_POINT_NODE_SIZE_HALF,
    }),
    [bounds]
  )

  const handleNodeDrag = (id) => (event, dragElement) => {
    const newValues = getValuesFromPosition(dragElement, bounds)

    const valuesNew =
      id === `controlPointStart`
        ? [newValues[0], newValues[1], values[2], values[3]]
        : [values[0], values[1], newValues[0], newValues[1]]

    onChange(valuesNew)
  }

  const stemPoints = React.useMemo(
    () => [
      [
        { x: 0, y: boundsInset?.height },
        {
          x: positions?.controlPointStart?.x - CONTROL_POINT_NODE_SIZE_HALF,
          y: positions?.controlPointStart?.y - CONTROL_POINT_NODE_SIZE_HALF,
        },
      ],
      [
        { x: boundsInset?.width, y: 0 },
        {
          x: positions?.controlPointEnd?.x - CONTROL_POINT_NODE_SIZE_HALF,
          y: positions?.controlPointEnd?.y - CONTROL_POINT_NODE_SIZE_HALF,
        },
      ],
    ],
    [boundsInset, positions]
  )

  return (
    <div
      className="relative w-[100%] pb-[100%]"
      ref={ref}
      data-tid="bezier-easing-bounds"
    >
      <div className="absolute inset-0 border border-black" />
      {bounds && (
        <React.Fragment>
          <div className="absolute inset-[6px]">
            <BezierCurve
              bounds={boundsInset}
              values={values}
            />
          </div>
          <ControlPointStems
            bounds={boundsInset}
            points={stemPoints}
          />
          <ControlPointNode
            id="controlPointStart"
            onDrag={handleNodeDrag}
            position={positions.controlPointStart}
          />
          <ControlPointNode
            id="controlPointEnd"
            onDrag={handleNodeDrag}
            position={positions.controlPointEnd}
          />
        </React.Fragment>
      )}
    </div>
  )
}

BezierCurveEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default BezierCurveEditor
