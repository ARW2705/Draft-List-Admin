import React, { useEffect, useState } from 'react'

import toTitleCase from '../../../../shared/utilities/title-case'
import errorMessages from '../../../../shared/constants/error-messages'

import './FormError.css'


function FormError({ customClass, name, errors }) {
  const [ messages, setMessages ] = useState([])

  const buildMessage = (name, key, errors) => {
    let message
    if (errorMessages.hasOwnProperty(key)) {
      message = errorMessages[key](toTitleCase(name), errors[key])
    } else {
      message = `Error: ${errors[key]}`
    }
  
    return (
      <span
        key={ key }
        className='form-error'
      >
        { message }
      </span>
    )
  }

  useEffect(() => {
    setMessages(() => {
      const newMessages = []
      for (const key in errors) {
        newMessages.push(buildMessage(name, key, errors))
      }
      return newMessages
    })
  }, [name, errors])

  return (
    <div className={ `form-error-container ${customClass || ''}` }>
      { messages }
    </div>
  )
}

export default FormError
