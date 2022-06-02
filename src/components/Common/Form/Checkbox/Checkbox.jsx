import React from 'react'

import './Checkbox.css'

import toTitleCase from '../../../../shared/utilities/title-case'
import hyphenify from '../../../../shared/utilities/hyphenify'


function FormCheckbox({ config, handleOnChange }) {
  const { name, value, label } = config
  const labelText = toTitleCase(label || name)
  const id = hyphenify(`form-checkbox-${name}`)

  const handleChange = event => {
    handleOnChange(name, event.target.checked)
  }

  return (
    <div className='form-checkbox-container'>
      <input
        id={ id }
        name={ name }
        value={ value }
        onChange={ handleChange }
        type='checkbox'
      />
      <label htmlFor={ id }>
        { labelText }
      </label>
    </div>
  )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config)
}

export default React.memo(FormCheckbox, compare)
