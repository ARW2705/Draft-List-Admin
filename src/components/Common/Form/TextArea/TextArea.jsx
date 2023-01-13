import React, { useEffect, useState } from 'react'

import FormError from '../FormError/FormError'

import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'
import { validate } from '../../../../shared/validators/validators'

import './TextArea.css'


function FormTextArea(props) {
  const { config, validators, handleOnChange } = props
  const { name, value, label, rows } = config

  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    label: toTitleCase(label || name),
    id: hyphenify(`form-textarea-${name}`),
    rows: rows || 3
  })
  const [ touchStatus, setTouchStatus ] = useState({
    focus: false,
    touched: !!value,
    pristine: !value
  })
  const [ errorState, setErrorState ] = useState({
    errors: {},
    show: false
  })
  const [ placeholderClass, setPlaceholderClass ] = useState('default')

  useEffect(() => {
    setErrorState(prevProps => ({ ...prevProps, show: !!Object.keys(prevProps.errors).length }))
  }, [touchStatus.touched])

  useEffect(() => {
    const { touched, focus, pristine } = touchStatus
    const isEmpty = touched && !focus && (value === null || value === undefined || value === '')
    setPlaceholderClass(pristine || isEmpty ? 'default' : 'aside')
  }, [touchStatus, value])

  const checkValidity = (name, value) => {
    const errors = validate(value, validators)
    setErrorState({ errors, show: touchStatus.touched && !!Object.keys(errors).length })
    attrs.handleOnChange(name, value, errors)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    checkValidity(name, value)
    setAttrs({ ...attrs, value })
  }

  const handleBlur = ({ target }) => {
    const { name, value } = target
    checkValidity(name, value)
    setTouchStatus({ ...touchStatus, touched: true, focus: false })
  }

  const handleFocus = () => {
    setTouchStatus({ ...touchStatus, pristine: false, focus: true })
  }

  return (
    <div className='form-textarea-container'>
      <label
        className={ `form-textarea placeholder-${placeholderClass}` }
        htmlFor={ attrs.id }
      >
        { attrs.label }
      </label>
      <textarea
        id={ attrs.id }
        name={ attrs.name }
        onChange={ handleChange }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        rows={ attrs.rows }
        spellCheck={ false }
        autoComplete='off'
      />
      {
        errorState.show
        && (
          <FormError
            name={ attrs.name }
            errors={ errorState.errors }
          />
        )
      }
    </div>
  )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config)
}


export default React.memo(FormTextArea, compare)
