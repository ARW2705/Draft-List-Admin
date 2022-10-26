import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import FormButtons from '../../Common/Form/FormButtons/FormButtons'
import Spinner from '../../Common/Loaders/Spinner/Spinner'
import BeverageSelect from './BeverageSelect/BeverageSelect'
import ContainerSelect from './ContainerSelect/ContainerSelect'
import SelectionPreview from './SelectionPreview/SelectionPreview'
import DeviceSelect from './DeviceSelect/DeviceSelect'
import ColorSelect from './ColorSelect/ColorSelect'

import { addNewDraft } from '../../../services/Draft/Draft'

import './DraftForm.css'


function reducer(state, action) {
  switch(action.type) {
    case 'beverage':
      return { ...state, beverage: action.beverage }
    case 'container':
      return { ...state, container: action.container }
    case 'device':
      return { ...state, device: action.device }
    case 'color':
      return { ...state, color: action.color }
    default:
      throw new Error(`Invalid form category type: ${action.type}`)
  }
}

function DraftForm() {
  const [ disableSubmit, setDisableSubmit ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(false)

  const [ { beverage, container, device, color }, dispatch ] = useReducer(
    reducer,
    { beverage: null, container: null, device: null }
  )

  const location = useLocation()
  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    console.log('nb', location)
    navigate(`/${location.pathname.split('/')[1]}`, { state: { refresh: true } })
  }, [location, navigate])

  const submitForm = useCallback(() => {
    async function submitDraft() {
      const draftData = {
        beverage: beverage._id,
        container: {
          containerInfo: container._id,
          quantity: container.capacity,
          contentColor: color
        }
      }

      console.log('data build', draftData)
      await addNewDraft(device._id, draftData)
      navigateBack()
    }
    submitDraft()
  }, [beverage, container, device, color, navigateBack])

  useEffect(() => {
    if (isLoading) submitForm()
  }, [isLoading, submitForm])

  useEffect(() => {
    const draftId = location.state?.draftId
    setDisableSubmit(!(beverage && container && (device || draftId)))
  }, [beverage, container, device, location])

  const handleSubmit = buttonName => {
    if (buttonName === 'submit') {
      setIsLoading(true)
    } else if (buttonName === 'cancel') {
      navigateBack()
    }
  }
  
  return (
    <div className='draft-form-container'>
      {
        isLoading && <Spinner isBlocking={ true } text='Submitting' />
      }
      <DeviceSelect    onSelect={ data => dispatch({ type: 'device'   , device: data    }) } />
      <ContainerSelect onSelect={ data => dispatch({ type: 'container', container: data }) } />
      <BeverageSelect  onSelect={ data => dispatch({ type: 'beverage' , beverage: data  }) } />
      <ColorSelect     onSelect={ data => dispatch({ type: 'color'    , color: data     }) } />
      <SelectionPreview
        beverage={ beverage }
        container={ container }
        device={ device }
      />
      <FormButtons
        isDisabled={ disableSubmit }
        onClick={ handleSubmit }
      />
    </div>
  )
}


export default DraftForm
