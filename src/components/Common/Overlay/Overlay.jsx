import React from 'react'

import './Overlay.css'


function Overlay(InnerComponent) {
  function wrapper(props) {
    const { isBlocking } = props

    return (
      <div className={ `overlay-container ${isBlocking ? 'blocking' : ''}`}>
        <InnerComponent { ...props } /> 
      </div>
    )
  }

  return wrapper
}


export default Overlay
