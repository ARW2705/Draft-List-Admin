import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addBeverage, updateBeverage } from '../../../services/beverage/store/beverage.slice'
import { blobifyBase64Image } from '../../../services/Image/Image'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner   from '../../Common/Loaders/Spinner/Spinner'

import { configBeverageForm } from './config-beverage-form'


function BeverageForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const formData = useRef()
  const location = useLocation()
  const beverage = location.state?.beverage
  const form = configBeverageForm(beverage)

  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const dispatch = useDispatch()
  const submitForm = useCallback(() => {
    async function prepareDevice() {
      const image = await blobifyBase64Image(formData.current.image)
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

      console.log('submit beverage data', beverageData)
      if (beverage) {
        const updateBeverageThunk = updateBeverage(beverage._id, beverageData)
        dispatch(updateBeverageThunk)
      } else {
        const addBeverageThunk = addBeverage(beverageData)
        dispatch(addBeverageThunk)
      }

      setIsLoading(false)
      navigateBack()
    }

    prepareDevice()
  }, [beverage, dispatch, navigateBack])

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
        customClass='beverage-form'
        title='New Beverage'
      />
    </>
  )
}


export default BeverageForm
