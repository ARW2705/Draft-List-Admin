import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner from '../../Common/Loaders/Spinner/Spinner'

import { addNewDraft, updateDraft } from '../../../services/Draft/Draft'
import createForm from '../../../shared/form/create-form'


function DraftForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const formData = useRef()
  const location = useLocation()
  const draft = location.state?.draft

  let fields = {
    beverage: {
      value: draft?.beverage || '',
      element: 'select',
      options: {
        formOptions: [
          { label: 'test1', value: 1 },
          { label: 'test2', value: 2 },
          { label: 'test3', value: 3 }
        ]
      }
    }
  }

  const form = createForm({ fields })

  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const submitForm = useCallback(() => {
    console.log('submitting')

  }, [navigateBack])

  useEffect(() => {
    if (isLoading && formData.current) {
      submitForm()
    }
  }, [isLoading, submitForm])
  
  const handleSubmit = async data => {
    if (!data) {
      // navigateBack()
    } else {
      formData.current = data
      // setIsLoading(true)
    }
    console.log(formData.current)
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
        customClass='draft'
        title='Draft Form'
      />
    </>
  )
}


export default DraftForm
