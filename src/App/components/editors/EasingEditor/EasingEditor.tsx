import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

// eslint-disable-next-line import/named
import { BezierEasingParams } from '../../../../types'
import ControlGroup from '../../controls/ControlGroup'
import BezierCurveEditor from '../BezierCurveEditor'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface EasingEditorProps {
  title: string
  easing: BezierEasingParams
  setEasing: (easing: BezierEasingParams) => void
  testId?: string
  tooltipText?: string
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const EasingEditor = ({
  title,
  easing,
  setEasing,
  testId = undefined,
  tooltipText,
}: EasingEditorProps) => {
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

export default EasingEditor
