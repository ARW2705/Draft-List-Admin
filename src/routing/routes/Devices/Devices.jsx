import React from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import Button     from '../../../components/Common/Button/Button'
import DeviceForm from '../../../components/DeviceComponents/DeviceForm/DeviceForm'
import DeviceList from '../../../components/DeviceComponents/DeviceList/DeviceList'

import './Devices.css'


function Devices() {
  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = event => {
    event.preventDefault()
    navigate(`${location.pathname}/form`)
  }

  return (
    <main className='route devices-router'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='device-container'>
              <Button
                text='Add New Device'
                customClass='new-device'
                name='new-device'
                onClick={ handleOnClick }
              />
              <DeviceList />
            </div>
          }
        />
        <Route path='/form' element={ <DeviceForm /> } />
      </Routes>
    </main>
  )
}

export default Devices
