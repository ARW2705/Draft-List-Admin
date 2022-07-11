import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner from '../../Common/Loaders/Spinner/Spinner'

import { addNewBeverage } from '../../../services/Beverage/Beverage'
import createForm from '../../../shared/form/create-form'
import { min, max, minLength, maxLength, required } from '../../../shared/validators/validators'
import base64ToBlobWorker from '../../../shared/workers/base64-to-blob.worker'


function BeverageForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const formData = useRef()
  
  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

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
        element: 'image'
      },
      contentColor: {} 
    }
  })

  const submitForm = useCallback(() => {
    console.log('submitting')
    base64ToBlobWorker.onmessage = async ({ data: image }) => {
      const beverageData = {
        data: {
          name        : formData.current.name,
          source      : formData.current.source,
          description : formData.current.description,
          style       : formData.current.style,
          abv         : formData.current.abv,
          ibu         : formData.current.ibu,
          srm         : formData.current.srm,
          contentColor: formData.current.contentColor
        },
        image
      }

      console.log('data build', beverageData)
      const response = await addNewBeverage(beverageData)
      console.log(response)
      setIsLoading(false)
      navigateBack()
    }

    base64ToBlobWorker.postMessage({
      image64: formData.current.image,
      contentType: 'image/webp'
    })
  }, [navigateBack])

  useEffect(() => {
    if (isLoading && formData.current) {
      submitForm()
    }
  }, [isLoading, submitForm])
  
  const handleSubmit = async data => {
    if (!data) {
      navigateBack()
    } else {
      formData.current = data
      setIsLoading(true)
    }
  }

  return (
    <>
      {
        isLoading
        && (
          <Spinner
            isBlocking={ true }
            text='Submitting'
          />
        )
      }
      <FormGroup
        form={ form }
        submitHandler={ handleSubmit }
        customClass='beverage'
        title='New Beverage'
      />
    </>
  )
}


export default BeverageForm
