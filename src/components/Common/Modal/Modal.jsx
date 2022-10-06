import React from 'react'

import Overlay from '../Overlay/Overlay'

import './Modal.css'


function Modal({ component: Component, data = {}, customClass = '', dismiss = () => {} }) {
  return (
    <div className={ `modal-container ${customClass}` }>
      <Component data={ data } dismiss={ dismiss } />
    </div>
  )
}


export default Overlay(Modal)
