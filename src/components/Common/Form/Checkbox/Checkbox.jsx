import React, { useEffect, useState } from 'react'

import './Checkbox.css'

import toTitleCase from '../../../../shared/utilities/title-case'
import hyphenify from '../../../../shared/utilities/hyphenify'


function FormCheckbox(props) {
  const { config, validators, handleOnChange } = props
  const { name, value, label } = config

  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    label: toTitleCase(label || name),
    id: hyphenify(`form-checkbox-${name}`)
  })

  const handleChange = event => {
    attrs.handleOnChange(name, event.target.checked)
  }

  return (
    <div className='form-checkbox-container'>
      <input
        id={ attrs.id }
        name={ attrs.name }
        value={ attrs.value }
        onChange={ handleChange }
        type='checkbox'
      />
      <label htmlFor={ attrs.id }>
        { attrs.label }
      </label>
    </div>
  )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config)
}

export default React.memo(FormCheckbox, compare)
