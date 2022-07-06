import React from 'react'

import './Overlay.css'


function Overlay(InnerComponent) {
  function wrapper(props) {
    return (
      <div className='overlay-container'>
        < InnerComponent { ...props } /> 
      </div>
    )
  }

  return wrapper
}


export default Overlay
