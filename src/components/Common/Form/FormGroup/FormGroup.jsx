import React, { useEffect, useState } from 'react'

import buildFormElements from './build-form-elements'
import buildFormGroup    from './build-form-group'
import FormError         from '../FormError/FormError'
import Button            from '../../Button/Button'

import { validateForm } from '../../../../shared/validators/validators'

import './FormGroup.css'


function FormGroup(props) {
  const { form, submitHandler, customClass, title } = props
  const { fields, validators } = form

  const [ formFields, setFormFields ] = useState({ ...fields })
  const [ disableButton, setDisabledButton ] = useState(true)
  const [ onInit, setOnInit ] = useState(true)
  const [ formErrors, setFormErrors ] = useState({})

  useEffect(() => {
    if (!onInit) {
      const errors = validateForm(formFields, validators)
      setDisabledButton(() => {
        return Object.keys(errors).length > 1 || !!Object.keys(errors.formLevel).length
      })
      setFormErrors(() => errors.formLevel)
    } else {
      setOnInit(() => false)
    }
  }, [ formFields, onInit, validators ])

  const handleSubmit = event => {
    if (event) event.preventDefault()
    const values = {}
    for (const field in formFields) {
      Object.assign(values, { [field]: formFields[field].value })
    }
    submitHandler(values)
  }

  const handleOnChange = (name, value, errors = {}) => {
    setFormFields(prevProps => props.updateForm(name, value, errors, prevProps))
  }

  const handleClick = buttonName => {
    if (buttonName === 'submit') {
      handleSubmit()
    } else if (buttonName === 'cancel') {
      submitHandler(null)
    }
  }

  const formComponents = buildFormElements(formFields, handleOnChange)

  return (
    <>
      { title && <h2 className='form-title'>{ title }</h2> }
      <form
        className={ `form-group ${customClass || ''}` }
        onSubmit={ handleSubmit }
        autoComplete='off'
        noValidate
      >
        { formComponents }
        {
          <FormError
            name='form'
            errors={ formErrors }
          />
        }
        <div className='form-button-container'>
          <Button
            text='Cancel'
            customClass='form-button'
            isDisabled={ false }
            name='cancel-button'
            onClick={ () => handleClick('cancel') }
          />
          <Button
            text='Submit'
            customClass='form-button'
            isDisabled={ disableButton }
            name='submit-button'
            onClick={ () => handleClick('submit') }
          />
        </div>
      </form>
    </>
  )
}

export default buildFormGroup(FormGroup)
