import React, { useEffect, useState } from 'react'

import SearchBar  from '../../SearchBar/SearchBar'
import SimpleView from '../../SimpleView/SimpleView'
import FormError  from '../FormError/FormError'

import { validate } from '../../../../shared/validators/validators'
import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'

import './Query.css'


function FormQuery(props) {
  const { config, validators, handleOnChange, customClass } = props
  const { name, value, label, queryFn, queryKeys, queryValue } = config
  
  const [ searchResult, setSearchResult ] = useState(null)
  const [ attrs, setAttrs ] = useState({
    value,
    label: toTitleCase(label || name),
    id: hyphenify(`form-query-${name}`),
    customClass: customClass || ''
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
    setAttrs(prevProps => ({ ...prevProps, value }))
  }, [value])

  useEffect(() => {
    if (touchStatus.touched) {
      setErrorState(prevProps => ({ ...prevProps, show: true }))
    }
  }, [touchStatus])

  const checkValidity = (name, value) => {
    const errors = validate(value, validators)
    setErrorState(() => ({ errors, show: touchStatus.touched }))
    handleOnChange(name, value, errors)
  }

  const handleSearchOnSubmit = async searchTerm => {
    let result = <></>
    if (searchTerm !== null) {
      const queryResult = await queryFn(searchTerm)
      if (queryResult) {
        result = (
          <SimpleView
            keysToDisplay={ queryKeys }
            data={ queryResult }
            customClass='beverage-view'
          />
        )
        checkValidity(name, queryResult[queryValue])
        setAttrs(prevProps => ({...prevProps, value: queryResult[queryValue] }))
      } else {
        result = <div>{ `'${searchTerm}' not found` }</div>
      }
    } else {
      checkValidity(name, '')
    }

    setSearchResult(result)
  }

  const handleOnFocusOrBlur = event => {
    const { type } = event
    let touchStatusUpdate
    if (type.toLowerCase() === 'focus') {
      touchStatusUpdate = { touched: true, pristine: false, focus: true }
    } else {
      touchStatusUpdate = { touched: true, pristine: false, focus: false }
      checkValidity(name, attrs.value)
    }

    setTouchStatus(touchStatusUpdate)
  }

  return (
    <div
      className='form-query-container'
      onFocus={ handleOnFocusOrBlur }
      onBlur={ handleOnFocusOrBlur }
    >
      <h2>Select a Beverage</h2>
      <SearchBar
        handleOnSubmit={ handleSearchOnSubmit }
        label={ attrs.label }
      />
      { searchResult ?? <></> }
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

export default React.memo(FormQuery, compare)
