import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Device from '../Device/Device'

import { getDevices } from '../../../services/Device/Device'

import './DeviceList.css'


function DeviceList() {
  const [ components, setComponents ] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = useCallback((action, device) => {
    if (action === 'edit') {
      navigate(`${location.pathname}/form`, { state: { device } })
    } else if (action === 'draft') {
      console.log('nav to draft', device)
    } else {
      console.log('invalid action', action)
    }
  }, [navigate, location.pathname])

  const buildComponents = useCallback(devices => {
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
