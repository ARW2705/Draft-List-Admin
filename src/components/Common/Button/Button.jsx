import React, { useEffect, useState } from 'react'

import './Button.css'


function Button({ text, icon, customClass, isDisabled, name, onClick, ariaLabel, isFlat }) {
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(isDisabled)
  useEffect(() => {
    setIsButtonDisabled(() => isDisabled)
  }, [ isDisabled ])

  const handleClick = event => {
    event.preventDefault()
    const { target } = event
    const correctedTarget = target.tagName.toLowerCase() === 'button' ? target : target.parentElement
    onClick(correctedTarget)
  }

  return (
    <button
      aria-label={ ariaLabel || text }
      className={ `button ${isFlat ? 'flat-button' : ''} ${customClass || ''}` }
      disabled={ isButtonDisabled }
      name={ name ?? text }
      onClick={ onClick ? handleClick : undefined }
    >
      { icon && <span>{ icon }</span> }
      { text && <span>{ text }</span> }
    </button>
  )
}

export default React.memo(Button)
