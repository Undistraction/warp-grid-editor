import Button from '../../../../Button'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface YesNoDialogueProps {
  onNo: () => void
  onYes: () => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default function YesNoDialogue({ onNo, onYes }: YesNoDialogueProps) {
  return (
    <div
      className="flex flex-col space-y-4"
      data-tid="yes-no-dialogue"
    >
      <p>Do you want to save the changes to your current project?</p>
      <div className="flex gap-x-4">
        <Button
          label="Yes"
          testId="yes-no-dialogue-yes-button"
          onClick={onYes}
        />
        <Button
          label="No"
          testId="yes-no-dialogue-no-button"
          onClick={() => {
            onNo()
          }}
        />
      </div>
    </div>
  )
}
