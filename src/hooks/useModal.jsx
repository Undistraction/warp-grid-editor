import { isNotNil } from 'ramda-adjunct'
import React from 'react'
import { createPortal } from 'react-dom'

import Modal from '../App/components/modals/Modal'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const useModal = () => {
  const [modal, setModal] = React.useState(null)

  const openModal = ({ Content, props, onClose = () => {} }) => {
    const closeModal = () => {
      setModal(null)
      onClose()
    }

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
    Modal: modal,
    isOpen: isNotNil(modal),
  }
}

export default useModal
