import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormButtons from '../../Common/Form/FormButtons/FormButtons'
import Spinner from '../../Common/Loaders/Spinner/Spinner'
import BeverageSelect from './BeverageSelect/BeverageSelect'
import ContainerSelect from './ContainerSelect/ContainerSelect'
import SelectionPreview from './SelectionPreview/SelectionPreview'
import DeviceSelect from './DeviceSelect/DeviceSelect'

import { addNewDraft, updateDraft } from '../../../services/Draft/Draft'


function DraftForm() {
  const reducer = (state, action) => {
    switch(action.type) {
      case 'beverage':
        return { ...state, beverage: action.beverage }
      case 'container':
        return { ...state, container: action.container }
      case 'device':
        return { ...state, device: action.device }
      default:
        throw new Error(`Invalid form category type: ${action.type}`)
    }
  }

  const [ { beverage, container, device }, dispatch ] = useReducer(
    reducer,
    { beverage: null, container: null, device: null }
  )

  const [ disableSubmit, setDisableSubmit ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setDisableSubmit(!(beverage && container && device))
  }, [beverage, container, device])
  
  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const submitDraft = async () => {
    const draftData = {
      beverage: beverage._id,
      container: {
        containerInfo: container._id,
        quantity: container.capacity,
        contentColor: container.contentColor
      }
    }

    console.log(draftData)
  }

  const handleSubmit = buttonName => {
    if (buttonName === 'submit') {
      submitDraft()
    } else if (buttonName === 'cancel') {
      navigateBack()
    }
  }
  
  const handleOnSelect = (type, data) => dispatch({ type, [type]: data })

  return (
    <div className='draft-form-container'>
      {
        isLoading
        && (
          <Spinner
            isBlocking={ true }
            text='Submitting'
          />
        )
      }
      <DeviceSelect onSelect={ data => handleOnSelect('device', data) } />
      <BeverageSelect onSelect={ data => handleOnSelect('beverage', data) } />
      <ContainerSelect onSelect={ data => handleOnSelect('container', data) } />
      <SelectionPreview
        beverage={ beverage }
        container={ container }
      />
      <FormButtons
        isDisabled={ disableSubmit }
        onClick={ handleSubmit }
      />
    </div>
  )
}


export default DraftForm
