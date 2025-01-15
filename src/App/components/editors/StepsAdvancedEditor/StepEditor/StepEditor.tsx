//-----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

import { XMarkIcon } from '@heroicons/react/16/solid'
import { Step } from '../../../../../types'
import ControlGroup from '../../../controls/ControlGroup'
import Switch from '../../../controls/Switch'
import TextInput from '../../../controls/TextInput'
import ButtonLink from '../../../ButtonLink'
import { isNumericString, isPixelNumberString } from '../../../../../utils/is'
import { useState } from 'react'
import { isNil } from 'ramda'

interface StepEditor {
  value: Step
  onRemove: () => void
  onChange: (value: Step) => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function StepEditor({ value, onRemove, onChange }: StepEditor) {
  const [localValue, setLocalValue] = useState<string | null>(null)
  return (
    <div className="flex justify-between gap-1 rounded-md border border-black p-1">
      <TextInput
        value={isNil(localValue) ? value.value : localValue}
        inputClassName="w-20"
        onChange={(inputValue) => {
          if (
            !isNumericString(inputValue) &&
            !isPixelNumberString(inputValue)
          ) {
            setLocalValue(inputValue)
          } else {
            setLocalValue(null)
            const validValue = isNumericString(inputValue)
              ? Number(inputValue)
              : inputValue
            onChange({
              ...value,
              value: validValue,
            })
          }
        }}
      />
      <div className="flex gap-1">
        <ControlGroup label="Gutter">
          <Switch
            isSelected={value.isGutter || false}
            onChange={() =>
              onChange({
                ...value,
                isGutter: !value.isGutter,
              })
            }
          />
        </ControlGroup>
        <ButtonLink
          onClick={onRemove}
          icon={<XMarkIcon />}
        ></ButtonLink>
      </div>
    </div>
  )
}
