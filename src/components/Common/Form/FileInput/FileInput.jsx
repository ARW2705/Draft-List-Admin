import React, { useState } from 'react'

import toTitleCase from '../../../../shared/utilities/title-case'
import hyphenify from '../../../../shared/utilities/hyphenify'

import './FileInput.css'


function FormFileInput({ config, handleOnChange, customClass }) {
  const { name, value, label } = config
  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    label: toTitleCase(label || name),
    id: hyphenify(`form-input-${name}`),
    customClass: customClass || ''
  })

  const handleChange = event => {
    event.preventDefault()
    console.log('file event', event)
    try {
      const file = event.target.files[0]
      handleOnChange(name, file)
    } catch(error) {
      console.log('file missing', error)
    }
  }

  return (
    <div className={`form-input-container ${attrs.customClass}`}>
    <label
      className='form-input'
      htmlFor={ attrs.id }
    >
      { attrs.label }
    </label>
    <input
      id={ attrs.id }
      name={ attrs.name }
      type='file'
      onChange={ handleChange }
    />
  </div>
  )
}


export default React.memo(FormFileInput)
