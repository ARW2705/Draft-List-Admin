import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import BeverageList     from '../../../components/BeverageComponents/BeverageList/BeverageList'
import BeverageQuery    from '../../../components/BeverageComponents/BeverageQuery/BeverageQuery'
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

  return (
    <main className="route Beverages">
      <Routes>
        <Route
          path='/'
          element={
            <>
              <BeverageQuery onConfigUpdate={ onConfigUpdate } />
              <BeverageList listConfig={ listConfig } />
            </>
          }
        />
        <Route path='/form' element={ <BeverageForm /> } />
      </Routes>
    </main>
  )
}

export default Beverages
