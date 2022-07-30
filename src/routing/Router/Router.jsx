import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Device    from '../routes/Devices/Devices'
import Draft     from '../routes/Drafts/Drafts'
import Beverages from '../routes/Beverages/Beverages'
import User      from '../routes/User/User'
import App       from '../../App'


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/draft/*' element={<Draft />} />
          <Route path='/device/*' element={<Device />} />
          <Route path='/beverage/*' element={<Beverages />} />
          <Route path='/user/*' element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default Router
