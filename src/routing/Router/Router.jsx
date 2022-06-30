import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Beverages from '../routes/Beverages/Beverages'
import Manage    from '../routes/Manage/Manage'
import User      from '../routes/User/User'
import App       from '../../App'


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/manage' element={<Manage />} />
          <Route path='/beverages/*' element={<Beverages />} />
          <Route path='/user/*' element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default Router
