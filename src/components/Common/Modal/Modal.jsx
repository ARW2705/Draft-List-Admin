import React from 'react'

import Overlay from '../Overlay/Overlay'

import './Modal.css'


function Modal({ component: Component, data, customClass = '', onDismiss = () => {} }) {
  const dismiss = obj => onDismiss(obj)

  return Overlay(
    <div className={ `modal container ${customClass}` }>
      { { isBlocking: true } }
      <Component { ...data } dismiss={ dismiss } />
    </div>
  )
}


export default Modal
