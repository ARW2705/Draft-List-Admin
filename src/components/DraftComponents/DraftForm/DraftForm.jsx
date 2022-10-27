import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner from '../../Common/Loaders/Spinner/Spinner'

import {
  getDraft,
  addNewDraft,
  updateDraft
} from '../../../services/Draft/Draft'
import {
  getBeverageById,
  getBeverageList
} from '../../../services/Beverage/Beverage'
import { getDevices } from '../../../services/Device/Device'
import { getAllContainers } from '../../../services/Container/Container'
import createForm from '../../../shared/form/create-form'
import { required, pattern } from '../../../shared/validators/validators'

import './DraftForm.css'


async function buildForm({ containerPreselect, beveragePreselect, contentColorPreselect, isNewDraft }) {
  const containers = await getAllContainers()
  const containerOptions = containers.map(container => ({ label: container.name, value: container }))
  const { beverages } = await getBeverageList(0, 5)
  const beverageOptions = beverages.map(beverage => ({ label: beverage.name, value: beverage._id }))
  
  let fields = {}
  if (isNewDraft) {
    const { devices } = await getDevices()
    fields = {
      device: {
        value: '',
        validators: [required()],
        element: 'select',
        options: {
          selectOptions: devices.map(device => ({ label: device.name || device.title, value: device._id }))
        }
      }
    }
  }

  fields = {
    ...fields,
    container: {
      value: containerPreselect,
      validators: [required()],
      element: 'select',
      options: {
        selectOptions: containerOptions
      }
    },
    beverage: {
      value: beveragePreselect,
      validators: [required()],
      element: 'select',
      options: {
        selectOptions: beverageOptions
      }
    },
    contentColor: {
      value: contentColorPreselect,
      validators: [pattern(/^#([\da-fA-F]{3}){1,2}$/)]
    }
  }

  return createForm({fields})
}

function DraftForm() {
  const location = useLocation()
  const draftId = location.state?.draftId
  const [ isLoading, setIsLoading ] = useState(!!draftId)
  const [ form, setForm ] = useState(null)
  const [ formTitle, setFormTitle ] = useState('New Draft')
  const formData = useRef()

  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(`/${location.pathname.split('/')[1]}`, { state: { refresh: true } })
  }, [location, navigate])

  const submitForm = useCallback(() => {
    async function submitDraft() {
      console.log(formData.current)
      let draftData = {
        beverage: formData.current.beverage,
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
      if (draftId) await updateDraft(draftId, draftData)
      else await addNewDraft(draftData.device, draftData)
      navigateBack()
    }
    submitDraft()
  }, [navigateBack, draftId])

  useEffect(() => {
    if (isLoading && formData.current) submitForm()
  }, [isLoading, submitForm])

  useEffect(() => {
    async function initForm() {
      let config = {
        contentColorPreselect: '',
        beveragePreselect: '',
        containerPreselect: '',
        isNewDraft: true
      }

      if (draftId) {
        const draft = await getDraft(draftId)
        if (!draft) throw new Error('Draft not found')
        const beverage = await getBeverageById(draft.beverage)
        setFormTitle(`Edit ${beverage ? beverage.name : ''} Draft`)
        config = {
          contentColorPreselect: draft.container.contentColor,
          beveragePreselect: beverage?._id || '',
          containerPreselect: draft.container.containerInfo,
          isNewDraft: false
        }
      }

      setForm(await buildForm(config))
      setIsLoading(false)
    }
    initForm()
  }, [draftId])

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
            title={ formTitle }
          />
        )
      }
    </div>
  )
}


export default DraftForm
