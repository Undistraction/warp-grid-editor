import { isNotNil } from 'ramda-adjunct'
import React, { ReactNode, ReactPortal, useState } from 'react'
import { createPortal } from 'react-dom'

import Modal from '../App/components/modals/Modal'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface OpenModalProps {
  Content: ({ onClose }: { onClose: () => void }) => ReactNode
  props?: Record<string, unknown>
  onClose?: () => void
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const useModal = () => {
  const [modal, setModal] = useState<ReactPortal | null>(null)

  const openModal = ({
    Content,
    props = {},
    onClose = () => {},
  }: OpenModalProps) => {
    const closeModal = () => {
      setModal(null)
      if (onClose) {
        onClose()
      }
    }

    const modalRoot = document.getElementById(`modal-root`)

    if (modalRoot) {
      const modal = createPortal(
        <Modal onClose={closeModal}>
          <Content
            {...props}
            onClose={closeModal}
          />
        </Modal>,
        modalRoot
      )
      setModal(modal)
    }
  }

  return {
    openModal,
    Modal: modal,
    isOpen: isNotNil(modal),
  }
}

export default useModal
