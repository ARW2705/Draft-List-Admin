import React from 'react'

import './Button.css'


function Button(props) {
  const { button } = props
  const { text, disabled } = button
  return (
    <button disabled={ disabled }>
      { text }
    </button>
  )
}

export default Button
