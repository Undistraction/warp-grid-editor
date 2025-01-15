import { append, remove, update } from 'ramda'
import { Step } from '../../../../types'
import StepEditor from './StepEditor'
import Button from '../../Button'

//-----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface StepsAdvancedEditorProps {
  value: Step[]
  testId?: string
  onChange: (value: Step[]) => void
  name: string
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const renderSteps = (
  onRemove: (idx: number) => void,
  onChange: (id: number) => (value: Step) => void,
  steps: Step[]
) =>
  steps.map((step, idx) => {
    return (
      <li key={idx}>
        <StepEditor
          value={step}
          onRemove={() => onRemove(idx)}
          onChange={onChange(idx)}
        />
      </li>
    )
  })

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function StepsAdvancedEditor({
  value,
  testId = undefined,
  onChange,
  name,
}: StepsAdvancedEditorProps) {
  const onRemove = (idx: number) => {
    onChange(remove(idx, 1, value))
  }

  const onAdd = () => {
    onChange(
      append(
        {
          value: 1,
          isGutter: false,
        },
        value
      )
    )
  }

  const onStepChange = (idx: number) => (newValue: Step) => {
    onChange(update(idx, newValue, value))
  }

  return (
    <div className="flex flex-col gap-1">
      <ul
        className="flex flex-col gap-1"
        data-tid={testId}
      >
        {renderSteps(onRemove, onStepChange, value)}
      </ul>
      <Button
        label={`Add ${name}`}
        onClick={onAdd}
      />
    </div>
  )
}
