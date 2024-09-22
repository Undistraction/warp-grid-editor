import { XMarkIcon } from '@heroicons/react/16/solid'
import { MouseEvent, ReactNode } from 'react'

import ButtonLink from '../../ButtonLink'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Modal = ({ children, onClose }: ModalProps) => {
  const handleBackgroundClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
  return (
    <div
      className="fixed inset-0"
      onClick={handleBackgroundClick}
      data-tid="modal"
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={handleBackgroundClick}
        data-tid="modal-overlay"
      >
        <div className="fixed inset-3 flex flex-shrink-0 flex-col overflow-hidden rounded-md border border-black bg-white shadow-md">
          <header className="flex justify-end border-b border-gray-300 p-3">
            <ButtonLink
              className="text-sm"
              testId="modal-close-button"
              onClick={onClose}
              icon={<XMarkIcon />}
            />
          </header>
          <div className="overflow-y-auto">{children}</div>
          <footer className="flex flex-shrink-0 justify-end border-t border-gray-300 p-3" />
        </div>
      </div>
    </div>
  )
}

export default Modal
