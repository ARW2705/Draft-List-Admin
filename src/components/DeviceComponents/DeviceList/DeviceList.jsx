import React from 'react'
import { useSelector } from 'react-redux'

import { selectDeviceIds } from '../../../services/device/store/device.slice'

import Device from '../Device/Device'

import './DeviceList.css'


function DeviceList() {
  const deviceIds = useSelector(selectDeviceIds)

  let components
  if (!deviceIds.length) {
    components = <p className='empty-list'>Nothing here...</p>
  } else {
    components = deviceIds.map(deviceId => {
      return (
        <Device
          className='device-container'
          key={ deviceId }
          deviceId={ deviceId }
        />
      )
    })
  }

  return (
    <div className='device-list-container'>
      { components }
    </div>
  )
}


export default React.memo(DeviceList)
