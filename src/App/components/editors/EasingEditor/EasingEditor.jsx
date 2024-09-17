import PropTypes from 'prop-types'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

import ControlGroup from '../../controls/ControlGroup'
import BezierCurveEditor from '../BezierCurveEditor'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const EasingEditor = ({
  title,
  easing,
  setEasing,
  testId = undefined,
  tooltipText,
}) => {
  const handleChange = useDebouncedCallback(setEasing, 15)

  return (
    <ControlGroup
      label={title}
      direction="vertical"
      testId={testId}
      tooltipText={tooltipText}
    >
      <div className="flex flex-col space-y-3 [&>*]:basis-1/2">
        <BezierCurveEditor
          onChange={handleChange}
          values={easing}
        />
      </div>
    </ControlGroup>
  )
}

EasingEditor.propTypes = {
  testId: PropTypes.string,
  title: PropTypes.string.isRequired,
  easing: PropTypes.arrayOf(PropTypes.number).isRequired,
  setEasing: PropTypes.func.isRequired,
  tooltipText: PropTypes.string,
}

export default EasingEditor
