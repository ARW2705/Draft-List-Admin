import React, { useCallback, useEffect, useState } from 'react'

import FormOption from '../Option/Option'
import FormError from '../FormError/FormError'

import { validate } from '../../../../shared/validators/validators'
import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'

import './Select.css'


function FormSelect(props) {
  const { config, validators, handleOnChange, customClass } = props
  const { name, value, label, formOptions } = config

  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    label: toTitleCase(label || name),
    id: hyphenify(`form-select-${name}`),
    customClass: customClass || ''
  })
  const [ formOptionComponents, setFormOptionComponents ] = useState(<></>)
  const [ touchStatus, setTouchStatus ] = useState({
    focus: false,
    touched: !!value,
    pristine: !value
  })
  const [ errorState, setErrorState ] = useState({
    errors: {},
    show: false
  })

  const buildOptionComponents = useCallback(() => {
    return formOptions.map((option, index) => (
      <FormOption key={ index } label={ option.label } value={ option.value } />
    ))
  }, [formOptions])

  useEffect(() => {
    setFormOptionComponents(buildOptionComponents())
  }, [buildOptionComponents])

  useEffect(() => {
    if (touchStatus.touched) {
      setErrorState(prevProps => ({ ...prevProps, show: true }))
    }
  }, [touchStatus])

  const checkValidity = (name, value) => {
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

  return (
    <div className={`form-select-container ${attrs.customClass}`}>
      <label
        className={`form-select`}
        htmlFor={ attrs.id }
      >
        { attrs.label }
      </label>
      <select
        id={ attrs.id }
        name={ attrs.name }
        value={ attrs.value }
        onChange={ handleChange }
        onFocus={ handleOnFocusOrBlur }
        onBlur={ handleOnFocusOrBlur}
      >
        { formOptionComponents }
      </select>
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

export default React.memo(FormSelect, compare)
