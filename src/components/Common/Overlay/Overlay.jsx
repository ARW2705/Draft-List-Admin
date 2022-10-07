import React from 'react'
import ReactDOM from 'react-dom'

import './Overlay.css'


function Overlay(InnerComponent) {
  function wrapper(props) {
    return ReactDOM.createPortal(
      <div
        className='overlay-container'
        onClick={ () => props.dismiss({}) }
      >
        <InnerComponent { ...props } /> 
      </div>,
      document.querySelector('#overlay-root')
    )
  }

  return wrapper
}


export default Overlay
