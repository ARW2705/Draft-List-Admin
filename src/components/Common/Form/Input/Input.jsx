import React, { useEffect, useState } from 'react'

import FormError from '../FormError/FormError'

import './Input.css'

import { validate } from '../../../../shared/validators/validators'
import toTitleCase from '../../../../shared/utilities/title-case'
import hyphenify from '../../../../shared/utilities/hyphenify'
import hasValue from '../../../../shared/utilities/has-value'


function FormInput(props) {
  const { config, validators, handleOnChange } = props
  const { name, value, type, label } = config

  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    type: type || 'text',
    label: toTitleCase(label || name),
    id: hyphenify(`form-input-${name}`)
  })
  const [ touchStatus, setTouchStatus ] = useState({
    focus: false,
    touched: false,
    pristine: true
  })
  const [ errorState, setErrorState ] = useState({
    errors: {},
    show: false
  })

  useEffect(() => {
    if (hasValue(props.config, 'type')) {
      setAttrs(prevProps => {
        return {
          ...prevProps,
          type: props.config.type
        }
      })
    }
  }, [ props.config ])

  useEffect(() => {
    if (touchStatus.touched) {
      setErrorState(prevProps => ({ ...prevProps, show: true }))
    }
  }, [ touchStatus ])

  const checkValidity = (name, value) => {
    const errors = validate(value, validators)
    setErrorState(() => ({ errors, show: touchStatus.touched }))
    attrs.handleOnChange(name, value, errors)
  }

  const handleChange = event => {
    const { name, value } = event.target
    checkValidity(name, value)
    setAttrs(prevProps => {
      return {
        ...prevProps,
        value
      }
    })
  }

  const handleOnFocusOrBlur = event => {
    const { type, target } = event
    let update
    if (type.toLowerCase() === 'focus') {
      update = { ...update, pristine: false, focus: true }
    } else if (type.toLowerCase() === 'blur') {
      update = { ...update, touched: true, focus: false }
      const { name, value } = target
      checkValidity(name, value)
    }

    if (update) {
      setTouchStatus(prevProps => {
        return {
          ...prevProps,
          ...update
        }
      })
    }
  }

  const { touched, focus, pristine } = touchStatus
  const isEmpty = touched && !focus && !value.length
  const placeholderClass = pristine || isEmpty ? 'default' : 'aside'

  return (
    <div className="form-input-container">
      <label
        className={ `form-input placeholder-${placeholderClass}` }
        htmlFor={ attrs.id }
      >
        { attrs.label }
      </label>
      <input
        id={ attrs.id }
        name={ attrs.name }
        type={ attrs.type }
        value={ attrs.value }
        onChange={ handleChange }
        onFocus={ handleOnFocusOrBlur }
        onBlur={ handleOnFocusOrBlur }
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

export default React.memo(FormInput, compare)
