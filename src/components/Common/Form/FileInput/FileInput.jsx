import React from 'react'
import { FaUpload } from 'react-icons/fa'

import hyphenify   from '../../../../shared/utilities/hyphenify'
import toTitleCase from '../../../../shared/utilities/title-case'

import './FileInput.css'


function FormFileInput({ config, handleOnChange, customClass = '' }) {
  const { name, value, label } = config
  const displayLabel = `${toTitleCase(label || name)} Upload`
  const id = hyphenify(`form-input-${name}`)
  const handleChange = event => {
    event.stopPropagation()
    try {
      handleOnChange(name, event.target.files[0])
    } catch(error) {
      console.log('file missing', error)
    }
  }

  return (
    <div className={`form-file-input-container ${customClass}`}>
      <label
        className='form-file-input-label'
        htmlFor={ id }
      >
        <span>{ displayLabel }</span>
        <FaUpload />
      </label>
      <input
        id={ id }
        name={ name }
        type='file'
        onChange={ handleChange }
      />
    </div>
  )
}


export default React.memo(FormFileInput)
