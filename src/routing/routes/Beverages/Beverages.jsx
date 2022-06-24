import React, { useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import BeverageList     from '../../../components/BeverageComponents/BeverageList/BeverageList'
import BeverageQuery    from '../../../components/BeverageComponents/BeverageQuery/BeverageQuery'
import Button           from '../../../components/Common/Button/Button'
import BeverageForm     from '../../../components/Forms/Beverage/Beverage'

import './Beverages.css'


function Beverages() {
  const [ listConfig, setListConfig ] = useState({
    listType: 'authored',
    pageNum: 0,
    pageCount: 25,
    searchType: '',
    searchTerm: ''
  })

  const onConfigUpdate = config => {
    setListConfig(config)
  }

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = event => {
    event.stopPropagation()
    navigate(`${location.pathname}/form`)
    console.log('new bev click', event)
  }

  return (
    <main className="route Beverages">
      <Routes>
        <Route
          path='/'
          element={
            <div
              className='beverage-container'
              onClick={ handleOnClick }
            >
              <BeverageQuery onConfigUpdate={ onConfigUpdate } />
              <Button
                text='Add New Beverage'
                customClass='new-beverage'
                idDisabled={ false }
                name='new-beverage'
              />
              <BeverageList listConfig={ listConfig } />
            </div>
          }
        />
        <Route path='/form' element={ <BeverageForm /> } />
      </Routes>
    </main>
  )
}

export default Beverages
