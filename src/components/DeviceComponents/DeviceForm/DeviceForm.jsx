import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addDevice, updateDevice } from '../../../services/device/store/device.thunk'
import { blobifyBase64Image } from '../../../services/Image/Image'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner   from '../../Common/Loaders/Spinner/Spinner'

import { configDeviceForm } from './config-device-form'

import './DeviceForm.css'


function DeviceForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const formData = useRef()
  const location = useLocation()
  const device = location.state?.device
  const form = configDeviceForm(device)

  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const dispatch = useDispatch()
  const submitForm = useCallback(() => {
    async function prepareDevice() {
      const image = await blobifyBase64Image(formData.current.image)
      let deviceData = {
        data: {
          name      : formData.current.name || device.name,
          hardwareId: formData.current.hardwareId || device.hardwareId,
          title     : formData.current.title,
          locale: {
            city   : formData.current.city,
            region : formData.current.region,
            country: formData.current.country
          }
        },
        image
      }

      if (device) {
        const updateDeviceThunk = updateDevice(device._id, deviceData)
        dispatch(updateDeviceThunk)
      } else {
        const addDeviceThunk = addDevice(deviceData)
        dispatch(addDeviceThunk)
      }

      setIsLoading(false)
      navigateBack()
    }

    prepareDevice()
  }, [device, dispatch, navigateBack])

  useEffect(() => {
    if (isLoading && formData.current) {
      submitForm()
    }
  }, [isLoading, submitForm])

  const handleSubmit = data => {
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
        customClass='device-form'
        title='Device Form'
      />
    </>
  )
}


export default DeviceForm
