import { XMarkIcon } from '@heroicons/react/16/solid'
import PropTypes from 'prop-types'
import React from 'react'

import ButtonLink from '../../ButtonLink'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-3 flex flex-shrink-0 flex-col overflow-hidden rounded-md border border-black bg-white shadow-md">
    <header className="flex justify-end border-b border-gray-300 p-3">
      <ButtonLink
        className="text-sm"
        onClick={onClose}
        icon={<XMarkIcon />}
      />
    </header>
    <div className="overflow-y-auto">{children}</div>
    <footer className="flex flex-shrink-0 justify-end border-t border-gray-300 p-3"></footer>
  </div>
)

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal
