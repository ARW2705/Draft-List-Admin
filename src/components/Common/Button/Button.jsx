import React, { useEffect, useState } from 'react'

import './Button.css'


function Button({ text, customClass, isDisabled }) {
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(isDisabled)
  useEffect(() => {
    setIsButtonDisabled(() => isDisabled)
  }, [ isDisabled ])

  return (
    <button
      className={ `button ${customClass || ''}` }
      disabled={ isButtonDisabled }
    >
      { text }
    </button>
  )
}

export default Button
