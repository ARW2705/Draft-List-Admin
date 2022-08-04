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
        customClass='draft'
        title='Draft Form'
      />
    </>
  )
}


export default DraftForm
