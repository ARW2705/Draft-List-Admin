import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Beverages from '../routes/Beverages/Beverages'
import Devices   from '../routes/Devices/Devices'
import Drafts    from '../routes/Drafts/Drafts'
import User      from '../routes/User/User'


function AppRoutes({ displayLocation }) {
  return (
    <Routes location={ displayLocation }>
      <Route path='/draft/*'    element={ <Drafts />    } />
      <Route path='/device/*'   element={ <Devices />   } />
      <Route path='/beverage/*' element={ <Beverages /> } />
      <Route path='/user/*'     element={ <User />      } />
      <Route path='*'           element={ <User />      } />
    </Routes>
  )
}


export default React.memo(AppRoutes)
