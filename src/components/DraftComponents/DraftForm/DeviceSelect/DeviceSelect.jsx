import React, { useCallback, useEffect, useState } from 'react'

import SimpleView from '../../../Common/SimpleView/SimpleView'
import Spinner from '../../../Common/Loaders/Spinner/Spinner'

import { getDeviceById, getDevices } from '../../../../services/Device/Device'

import './DeviceSelect.css'


function DeviceSelect({ onSelect: handleOnSelect }) {
  const [ devices, setDevices ] = useState([])

  const handleClick = useCallback(async (_, deviceId) => {
    handleOnSelect(await getDeviceById(deviceId))
  }, [handleOnSelect])

  const buildDeviceList = useCallback(deviceList => {
    if (!deviceList.length) return <div>No devices found: add a new device before adding a draft</div>
  
    return (
      <div className='device-list-container'>
        {
          deviceList.map(device => (
            <SimpleView
              key={ device._id }
              onClick={ handleClick }
              keysToDisplay={ [device.title ? 'title' : 'name'] }
              data={ device }
              customClass='device-view'
            />
          ))
        }
      </div>
    )
  })

  useEffect(() => {
    async function getAllDevices() {
      const { devices, errors } = await getDevices()
      console.log('got devices', devices)
      setDevices(devices)
    }
    getAllDevices()
  }, [buildDeviceList])

  return (
    <div className='device-selection-container'>
      { devices ?? <Spinner /> }
    </div>
  )
}


export default React.memo(DeviceSelect)
