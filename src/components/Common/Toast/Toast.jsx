import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import Button  from '../Button/Button'
import Overlay from '../Overlay/Overlay'

import './Toast.css'


function Toast({ message, position = 'middle', duration = 1000, customClass = '', dismiss = () => {} }) {
  setTimeout(() => {
    dismiss()
  }, duration)
  
  return (
    <div className={ `toast-container ${position} ${customClass}` }>
      <p className='toast-message'>{ message }</p>
      <Button
        icon={ <IoCloseOutline className='toast-button-icon' /> }
        customClass='toast-button'
        name={ 'cancel-button' }
        ariaLabel={ 'cancel-button' }
        onClick={ dismiss }
        isFlat={ true }
      />
    </div>
  )
}


export default Overlay(Toast)
