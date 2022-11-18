import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import Button  from '../Button/Button'
import Overlay from '../Overlay/Overlay'

import './Toast.css'


function Toast({ message, position = 'bottom', customClass = '' }) {
  const cancelButtonIcon = {
    icon: <IoCloseOutline />,
    label: 'cancel-button'
  }
  
  return (
    <div className={ `toast-container ${position} ${customClass}` }>
      <p>{ message }</p>
      <Button
        icon={ cancelButtonIcon }
        customClass='toast-button'
        name={ cancelButtonIcon.label }
        ariaLabel={ cancelButtonIcon.label }
      />
    </div>
  )
}


export default Overlay(Toast)
