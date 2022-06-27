import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'

import { addNewBeverage } from '../../../services/Beverage/Beverage'
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
      image: {
        element: 'file'
      },
      contentColor: {} 
    }
  })

  const location = useLocation()
  const navigate = useNavigate()
  const handleSubmit = async data => {
    console.log(data)
    if (!data) {
      navigate(`/${location.pathname.split('/')[1]}`)
    } else {
      // TODO: submit new beverage
      const beverageData = {
        data: {
          name: data.name,
          source: data.source,
          description: data.description,
          style: data.style,
          abv: data.abv,
          ibu: data.ibu,
          srm: data.srm,
          contentColor: data.contentColor
        },
        image: data.image
      }
      const response = await addNewBeverage(beverageData)
      console.log(response)
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
