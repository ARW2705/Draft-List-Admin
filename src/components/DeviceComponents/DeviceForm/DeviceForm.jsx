import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner from '../../Common/Loaders/Spinner/Spinner'

import { blobifyBase64Image } from '../../../services/Image/Image'

import { addNewDevice, updateDevice } from '../../../services/Device/Device'
import createForm from '../../../shared/form/create-form'
import { minLength, maxLength, required } from '../../../shared/validators/validators'

import './DeviceForm.css'


function DeviceForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const formData = useRef()
  const location = useLocation()
  const device = location.state?.device

  let fields = {
    title: {
      value: device?.title || '',
      validators: [minLength(2), maxLength(40)]
    },
    city: {
      value: device?.locale.city || '',
      validators: [minLength(2), maxLength(25)]
    },
    region: {
      value: device?.locale.region || '',
      validators: [minLength(2), maxLength(25)]
    },
    country: {
      value: device?.locale.country || '',
      validators: [minLength(2), maxLength(25)]
    }
  }

  if (!device) {
    fields = {
      name: {
        validators: [required(), minLength(2), maxLength(40)]
      },
      hardwareId: {
        validators: [required()],
        options: {
          label: 'Hardware ID'
        }
      },
      ...fields,
      image: {
        element: 'image'
      }
    }
  }

  const form = createForm({ fields })

  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const submitForm = useCallback(() => {
    console.log('submitting', formData.current)
    async function prepareDevice() {
      const image = await blobifyBase64Image(formData.current.image)
      console.log('?', image)
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

      console.log('data build', deviceData)
      const response = await (
        !device
        ? addNewDevice(deviceData)
        : updateDevice(device._id, deviceData)
      )
      console.log(response)
      setIsLoading(false)
      navigateBack()
    }
    prepareDevice()
  }, [device, navigateBack])

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
