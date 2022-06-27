import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'

import createForm from '../../../shared/form/create-form'
import { min, max, minLength, maxLength, required } from '../../../shared/validators/validators'


function BeverageForm() {
  const form = createForm({
    fields: {
      name: {
        validators: [required(), minLength(2), maxLength(50)]
      },
      source: {
        validators: [required(), minLength(2), maxLength(50)]
      },
      description: {
        validators: [minLength(2), maxLength(120)]
      },
      style: {
        validators: [required(), minLength(2), maxLength(50)]
      },
      abv: {
        options: {
          type: 'number'
        },
        validators: [min(0), max(100)]
      },
      ibu: {
        options: {
          type: 'number'
        },
        validators: [min(0), max(200)]
      },
      srm: {
        options: {
          type: 'number'
        },
        validators: [min(0), max(200)]
      },
      image: {},
      contentColor: {} 
    }
  })

  const location = useLocation()
  const navigate = useNavigate()
  const handleSubmit = data => {
    console.log(data)
    if (!data) {
      navigate(`/${location.pathname.split('/')[1]}`)
    } else {
      // TODO: submit new beverage
    }
  }

  return (
    <FormGroup
      form={ form }
      submitHandler={ handleSubmit }
      customClass='beverage'
      title='New Beverage'
    />
  )
}


export default BeverageForm
