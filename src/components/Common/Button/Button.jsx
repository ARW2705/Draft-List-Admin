import React, { useEffect, useState } from 'react'

import './Button.css'


function Button({ text, customClass, isDisabled, name }) {
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(isDisabled)
  useEffect(() => {
    setIsButtonDisabled(() => isDisabled)
  }, [ isDisabled ])

  return (
    <button
      className={ `button ${customClass || ''}` }
      disabled={ isButtonDisabled }
      name={ name ?? text }
    >
      { text }
    </button>
  )
}

export default Button
