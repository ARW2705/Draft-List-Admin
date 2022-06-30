import React, { useEffect, useState } from 'react'

import './Button.css'


function Button({ text, customClass, isDisabled, name, onClick }) {
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(isDisabled)
  useEffect(() => {
    setIsButtonDisabled(() => isDisabled)
  }, [ isDisabled ])

  return (
    <button
      className={ `button ${customClass || ''}` }
      disabled={ isButtonDisabled }
      name={ name ?? text }
      onClick={ onClick }
    >
      { text }
    </button>
  )
}

export default React.memo(Button)
