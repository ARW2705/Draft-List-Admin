import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addDraft, updateDraft } from '../../../services/draft/store/draft.thunk'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner   from '../../Common/Loaders/Spinner/Spinner'

import { configDraftForm } from './config-draft-form'

import './DraftForm.css'


function DraftForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const formData = useRef()
  const location = useLocation()
  const draft = location.state?.draft
  const form = configDraftForm(draft)

  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(`/${location.pathname.split('/')[1]}`, { state: { refresh: true } })
  }, [location, navigate])

  const dispatch = useDispatch()
  const submitForm = useCallback(() => {
    async function submitDraft() {
      let draftData = {
        beverage: formData.current.beverage || formData.current.previousBeverage,
        container: {
          containerInfo: formData.current.container._id,
          quantity: formData.current.container.capacity,
          contentColor: formData.current.contentColor
        }
      }
      if (formData.current.device) {
        draftData = { ...draftData, device: formData.current.device }
      }

      console.log('data build', draftData)
      if (draft) {
        const updateDraftThunk = updateDraft(draft._id, draftData)
        dispatch(updateDraftThunk)
      } else {
        const addDraftThunk = addDraft(draftData.device, draftData)
        dispatch(addDraftThunk)
      }

      setIsLoading(false)
      navigateBack()
    }
    submitDraft()
  }, [draft, dispatch, navigateBack])

  useEffect(() => {
    if (isLoading && formData.current) submitForm()
  }, [isLoading, submitForm])

  const handleSubmit = async data => {
    if (data) {
      formData.current = data
      setIsLoading(true)
    } else {
      navigateBack()
    }
  }

  return (
    <div className='draft-form-container'>
      { isLoading && <Spinner isBlocking={ true } text='Submitting' /> }
      {
        form && (
          <FormGroup
            form={ form }
            submitHandler={ handleSubmit }
            customClass='draft-form'
            title={ `${draft ? 'Edit' : 'New'} Draft` }
          />
        )
      }
    </div>
  )
}


export default DraftForm
