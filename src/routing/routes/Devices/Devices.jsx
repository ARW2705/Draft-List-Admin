import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Button     from '../../../components/Common/Button/Button'
import DeviceForm from '../../../components/DeviceComponents/DeviceForm/DeviceForm'
import DeviceList from '../../../components/DeviceComponents/DeviceList/DeviceList'

import './Devices.css'


function Devices() {
  const navigate = useNavigate()

  return (
    <div className='route devices-router'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='devices-container'>
              <Button
                customClass='new-device-button'
                name='new-device'
                text='Add New Device'
                onClick={ () => navigate('form') }
              />
              <DeviceList />
            </div>
          }
        />
        <Route path='/form' element={ <DeviceForm /> } />
      </Routes>
    </div>
  )
}

export default Devices
