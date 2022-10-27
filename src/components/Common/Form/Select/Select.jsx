import React, { useEffect, useState } from 'react'

import FormError from '../FormError/FormError'
import DropDown from '../../DropDown/DropDown'

import { validate } from '../../../../shared/validators/validators'
import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'

import './Select.css'


function FormSelect(props) {
  const { config, validators, handleOnChange, customClass } = props
  const { name, value, label, selectOptions } = config
  
  let initLabel = toTitleCase(label || name)
  if (value) {
    const option = selectOptions.find(option => {
      if (typeof option === 'object') {
        return JSON.stringify(option.value) === JSON.stringify(value)
      }
      return option.value === value
    })
    if (option) initLabel = option.label
  }

  const [ attrs, setAttrs ] = useState({
    name,
    handleOnChange,
    value,
    label: initLabel,
    id: hyphenify(`form-select-${name}`),
    customClass: customClass || '',
    options: selectOptions.map(option => option.label)
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
    if (touchStatus.touched) {
      setErrorState(prevProps => ({ ...prevProps, show: true }))
    }
  }, [touchStatus])

  const checkValidity = (name, value) => {
    const errors = validate(value, validators)
    setErrorState(() => ({ errors, show: touchStatus.touched }))
    attrs.handleOnChange(name, value, errors)
  }

  const handleSelect = selectionLabel => {
    const { value } = selectOptions.find(option => option.label === selectionLabel)
    checkValidity(name, value)
    setAttrs(prevProps => ({ ...prevProps, value }))
  }

  return (
    <div className={`form-select-container ${attrs.customClass}`}>
      <DropDown
        title={ attrs.label }
        items={ attrs.options }
        customClass='form-select-dropdown'
        onSelect={ handleSelect }
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

export default React.memo(FormSelect, compare)
