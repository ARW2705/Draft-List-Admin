import React from 'react'
import ReactDOM from 'react-dom'

import './Overlay.css'


function Overlay(InnerComponent) {
  function wrapper(props) {
    const handleClick = ({ target }) => {
      if (target.dataset.overlay) props.dismiss(null)
    }
    
    return ReactDOM.createPortal(
      <div
        className='overlay-container'
        data-overlay
        onClick={ handleClick }
      >
        <InnerComponent { ...props } /> 
      </div>,
      document.querySelector('#overlay-root')
    )
  }

  return wrapper
}


export default Overlay
