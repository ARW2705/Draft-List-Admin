import React, { useEffect, useState } from 'react'

import SearchBar  from '../../SearchBar/SearchBar'
import SimpleView from '../../SimpleView/SimpleView'
import FormError  from '../FormError/FormError'

import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'
import { validate } from '../../../../shared/validators/validators'

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
    setErrorState(prevProps => ({ ...prevProps, show: !!Object.keys(prevProps.errors).length }))
  }, [touchStatus.touched])

  const checkValidity = (name, value) => {
    const errors = validate(value, validators)
    setErrorState(() => ({ errors, show: touchStatus.touched && !!Object.keys(errors).length }))
    handleOnChange(name, value, errors)
  }

  const handleQueryOnSubmit = async searchTerm => {
    let result = <></>
    if (searchTerm !== null) {
      const queryResults = await queryFn(searchTerm)
      if (!queryResults) {
        result = <div>{ `Beverage '${searchTerm}' not found` }</div>
      } else {
        result = (
          <SimpleView
            keysToDisplay={ queryKeys }
            data={ queryResults }
          />
        )
        checkValidity(name, queryResults[queryValue])
        setAttrs(prevProps => ({...prevProps, value: queryResults[queryValue] }))
      }
    } else {
      checkValidity(name, '')
    }

    setSearchResult(result)
  }

  const handleBlur = () => {
    checkValidity(name, attrs.value)
    setTouchStatus({ touched: true, pristine: false, focus: false })
  }

  const handleFocus = () => {
    setTouchStatus({ touched: true, pristine: false, focus: true })
  }

  return (
    <div
      className='form-query-container'
      onFocus={ handleFocus }
      onBlur={ handleBlur }
    >
      <h3>{ attrs.label || 'Search' }</h3>
      <SearchBar
        handleOnSubmit={ handleQueryOnSubmit }
        label={ attrs.label || 'Search' }
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


export default React.memo(FormQuery)
