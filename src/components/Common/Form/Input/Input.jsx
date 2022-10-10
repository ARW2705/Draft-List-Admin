import React, { useEffect, useState } from 'react'

import FormError from '../FormError/FormError'

import { validate } from '../../../../shared/validators/validators'
import hasValue     from '../../../../shared/utilities/has-value'
import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'

import './Input.css'


function FormInput(props) {
  const { config, validators, handleOnChange, customClass } = props
  const { name, value, type, label, min, max } = config

  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    type: type || 'text',
    label: toTitleCase(label || name),
    id: hyphenify(`form-input-${name}`),
    customClass: customClass || '',
    min,
    max
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

  useEffect(() => {
    if (hasValue(props.config, 'type')) {
      setAttrs(prevProps => {
        const { type, label, name, value } = props.config
        return {
          ...prevProps,
          type,
          value,
          label: toTitleCase(label || name)
        }
      })
    }
  }, [props.config])

  useEffect(() => {
    if (touchStatus.touched) {
      setErrorState(prevProps => ({ ...prevProps, show: true }))
    }
  }, [touchStatus])

  const checkValidity = (name, rawValue) => {
    const value = attrs.type === 'number' ? parseFloat(rawValue) : rawValue
    const errors = validate(value, validators)
    setErrorState(() => ({ errors, show: touchStatus.touched }))
    attrs.handleOnChange(name, value, errors)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
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
  const isEmpty = touched && !focus && (value === null || value === undefined || value === '')
  const placeholderClass = pristine || isEmpty ? 'default' : 'aside'

  return (
    <div className={`form-input-container ${attrs.customClass}`}>
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
        min={ attrs.min }
        max={ attrs.max }
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
