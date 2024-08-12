import React from 'react'
import { createPortal } from 'react-dom'

import Modal from '../App/components/modals/Modal'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const useModal = () => {
  const [modal, setModal] = React.useState(null)

  const closeModal = () => {
    setModal(null)
  }

  const openModal = ({ Content, props }) => {
    const modal = createPortal(
      <Modal onClose={closeModal}>
        <Content
          {...props}
          onClose={closeModal}
        />
      </Modal>,
      document.getElementById(`modal-root`)
    )
    setModal(modal)
  }

  return {
    openModal,
    closeModal,
    Modal: modal,
  }
}

export default useModal
