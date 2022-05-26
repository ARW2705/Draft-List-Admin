import React, { useEffect, useState } from 'react'

import './FormError.css'

import toTitleCase from '../../../../shared/utilities/title-case'
import errorMessages from '../../../../shared/constants/error-messages'


function buildMessage(name, key, errors) {
  let message
  if (errorMessages.hasOwnProperty(key)) {
    message = errorMessages[key](toTitleCase(name), errors[key])
  } else {
    message = `Error: ${key}`
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

function Error({ name, errors }) {
  const [ messages, setMessages ] = useState([])
  useEffect(() => {
    setMessages(() => {
      const newMessages = []
      for (const key in errors) {
        newMessages.push(buildMessage(name, key, errors))
      }
      return newMessages
    })
  }, [ name, errors ])

  return (
    <div className="form-error-container">
      { messages }
    </div>
  )
}

export default Error
