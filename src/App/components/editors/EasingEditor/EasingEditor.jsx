import PropTypes from 'prop-types'
import { update } from 'ramda'
import React from 'react'

import ControlGroup from '../../controls/ControlGroup'
import Slider from '../../controls/Slider'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const EasingEditor = ({ title, easing, setEasing }) => {
  return (
    <ControlGroup
      label={title}
      direction="vertical"
    >
      <div className="flex flex-col space-y-3 [&>*]:basis-1/2">
        <Slider
          name="bezier-easing-1"
          value={easing[0]}
          onChange={(value) => {
            setEasing(update(0, value, easing))
          }}
        />
        <Slider
          name="bezier-easing-2"
          value={easing[1]}
          onChange={(value) => {
            setEasing(update(1, value, easing))
          }}
        />
        <Slider
          name="bezier-easing-3"
          value={easing[2]}
          onChange={(value) => {
            setEasing(update(2, value, easing))
          }}
        />
        <Slider
          name="bezier-easing-4"
          value={easing[3]}
          onChange={(value) => {
            setEasing(update(3, value, easing))
          }}
        />
      </div>
    </ControlGroup>
  )
}

EasingEditor.propTypes = {
  title: PropTypes.string.isRequired,
  easing: PropTypes.arrayOf(PropTypes.number).isRequired,
  setEasing: PropTypes.func.isRequired,
}

export default EasingEditor
