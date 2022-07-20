import React, { useEffect, useState } from 'react'

import './Button.css'


function Button({ text, icon, customClass, isDisabled, name, onClick, ariaLabel }) {
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(isDisabled)
  useEffect(() => {
    setIsButtonDisabled(() => isDisabled)
  }, [ isDisabled ])

  return (
    <button
      aria-label={ ariaLabel || text }
      className={ `button ${customClass || ''}` }
      disabled={ isButtonDisabled }
      name={ name ?? text }
      onClick={ onClick }
    >
      { icon && <span>{ icon }</span> }
      { text && <span>{ text }</span> }
    </button>
  )
}

export default React.memo(Button)
