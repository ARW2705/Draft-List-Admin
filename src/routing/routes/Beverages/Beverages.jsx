import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import BeverageForm  from '../../../components/BeverageComponents/BeverageForm/BeverageForm'
import BeverageList  from '../../../components/BeverageComponents/BeverageList/BeverageList'
import BeverageQuery from '../../../components/BeverageComponents/BeverageQuery/BeverageQuery'
import Button        from '../../../components/Common/Button/Button'

import './Beverages.css'


function Beverages() {
  const defaultConfig = {
    pageNum: 0,
    pageCount: 25,
    searchType: '',
    searchTerm: ''
  }

  const [ listConfig, setListConfig ] = useState(defaultConfig)

  const onConfigUpdate = config => setListConfig(config ?? defaultConfig)
  const navigate = useNavigate()

  return (
    <div className='route beverages-router'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='beverage-container'>
              <BeverageQuery onConfigUpdate={ onConfigUpdate } />
              <Button
                customClass='new-beverage-button'
                isDisabled={ false }
                name='new-beverage'
                text='Add New Beverage'
                onClick={ () => navigate('form') }
              />
              <BeverageList listConfig={ listConfig } />
            </div>
          }
        />
        <Route path='/form' element={ <BeverageForm /> } />
      </Routes>
    </div>
  )
}

export default Beverages
