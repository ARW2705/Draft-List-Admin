import React, { useEffect, useState } from 'react'

import FormError from '../FormError/FormError'

import hasValue     from '../../../../shared/utilities/has-value'
import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'
import { validate } from '../../../../shared/validators/validators'

import './Input.css'


function FormInput(props) {
  const { config, validators, handleOnChange, customClass = '' } = props
  const { name, value, type, label, min, max } = config

  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    type: type || 'text',
    label: toTitleCase(label || name),
    id: hyphenify(`form-input-${name}`),
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
  const [ placeholderClass, setPlaceholderClass ] = useState('default')


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
    if (hasValue(props.config, 'value')) {
      setAttrs(prevProps => ({ ...prevProps, value: props.config.value }))
    }
  }, [props.config])

  useEffect(() => {
    setErrorState(prevProps => ({ ...prevProps, show: !!Object.keys(prevProps.errors).length }))
  }, [touchStatus.touched])

  useEffect(() => {
    const { touched, focus, pristine } = touchStatus
    const isEmpty = touched && !focus && (value === null || value === undefined || value === '')
    setPlaceholderClass(pristine || isEmpty ? 'default' : 'aside')
  }, [touchStatus, value])

  const checkValidity = (name, rawValue) => {
    const value = attrs.type === 'number' ? parseFloat(rawValue) : rawValue
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
    <div className={`form-input-container ${customClass}`}>
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
        onFocus={ handleFocus }
        onBlur={ handleBlur }
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


export default React.memo(FormInput)
