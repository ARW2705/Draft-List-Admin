import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SignupForm from '../../../components/Forms/Signup/Signup'
import LoginForm from '../../../components/Forms/Login/Login'
import Profile from '../../../components/Profile/Profile'
import LoginSignupButtons from '../../../components/LoginSignupButtons/LoginSignupButtons'


function User() {
  return (
    <main className="route user">
      <Routes>
        <Route path='/signup' element={ <SignupForm /> } />
        <Route path='/login' element={ <LoginForm /> } />
        <Route
          path='/'
          element={
            <>
              <Profile />
              <LoginSignupButtons />
            </>
          }
        />
      </Routes>
    </main>
  )
}


export default React.memo(User)
