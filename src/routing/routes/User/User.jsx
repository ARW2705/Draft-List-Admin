import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SignupForm from '../../../components/Forms/Signup/Signup'
import LoginForm from '../../../components/Forms/Login/Login'
import Profile from '../../../components/Profile/Profile'
import LoginSignupButtons from '../../../components/LoginSignupButtons/LoginSignupButtons'

import './User.css'


function User() {
  return (
    <div className='route user-router'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='user-container'>
              <Profile />
              <LoginSignupButtons />
            </div>
          }
        />
        <Route path='/signup' element={ <SignupForm /> } />
        <Route path='/login'  element={ <LoginForm />  } />
      </Routes>
    </div>
  )
}


export default React.memo(User)
