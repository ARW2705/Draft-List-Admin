import React, { useEffect, useState } from 'react'

import DropDown from '../../../Common/DropDown/DropDown'

import { getDevices } from '../../../../services/Device/Device'

import './DeviceSelect.css'


function DeviceSelect({ onSelect: handleOnSelect }) {
  const [ deviceOptions, setDeviceOptions ] = useState([])
  const [ devices, setDevices ] = useState([])

  const handleSelect = name => {
    for (const key in devices) {
      if (
        devices[key].name.toLowerCase() === name.toLowerCase()
        || devices[key].title.toLowerCase() === name.toLowerCase()
      ) {
        handleOnSelect(devices[key])
      }
    }
  }

  useEffect(() => {
    async function getAllDevices() {
      const { devices, errors } = await getDevices()
      let deviceNames = []
      for (const key in devices) {
        deviceNames = [...deviceNames, (devices[key].title || devices[key].name)]
      }
      setDevices(devices)
      setDeviceOptions(deviceNames)
    }
    getAllDevices()
  }, [])

  return (
    <div className='device-selection'>
      <DropDown
        title='Select a Device'
        items={ deviceOptions }
        customClass='device-dropdown'
        onSelect={ handleSelect }
      />
    </div>
  )
}


export default React.memo(DeviceSelect)
