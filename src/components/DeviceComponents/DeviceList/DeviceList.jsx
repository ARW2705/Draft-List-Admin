import React, { useCallback, useEffect, useState } from 'react'

import Device from '../Device/Device'

import { getDevices } from '../../../services/Device/Device'

import './DeviceList.css'


function DeviceList() {
  const [ components, setComponents ] = useState([])

  const handleOnClick = useCallback(device => {
    console.log('device click', device)
  }, [])

  const buildComponents = useCallback(devices => {
    console.log('devices', devices)
    if (!devices.length) return <p className='empty-list'>Nothing here...</p>
  
    return devices.map(device => {
      return (
        <Device
          className='device-container'
          key={ device._id }
          device={ device }
          onClick={ handleOnClick }
        />
      )
    })
  }, [handleOnClick])

  useEffect(() => {
    async function getList() {
      const { devices, errors } = await getDevices()
      setComponents(buildComponents(devices))
    }
    getList()
  }, [buildComponents])

  return (
    <div className='device-list-container'>
      { components }
    </div>
  )
}


export default React.memo(DeviceList)
