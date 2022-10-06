import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import UserService from '../../../services/User/User'

import SignupForm from '../../../components/Forms/Signup/Signup'
import LoginForm from '../../../components/Forms/Login/Login'
import Profile from '../../../components/Profile/Profile'
import LoginSignupButtons from '../../../components/LoginSignupButtons/LoginSignupButtons'


function User() {
  const [ showButtons, setShowButtons ] = useState(false)
  const [ displayUser, setDisplayUser ] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const handleClick = ({ name }) => {
    const lowerName = name.toLowerCase()
    if (lowerName === 'login') {
      setShowButtons(false)
      navigate(`${location.pathname}/login`)
    } else if (lowerName === 'signup') {
      setShowButtons(false)
      navigate(`${location.pathname}/signup`)
    } else if (lowerName === 'logout') {
      UserService.logout()
    }
  }

  useEffect(() => {
    const subscription = UserService.getUser()
      .subscribe({
        next: user => {
          let route = '/user'
          if (user._id) {
            route += '/profile'
            setDisplayUser(user)
          } else {
            setDisplayUser(null)
          }
          setShowButtons(true)
          navigate(route)
        },
        error: error => console.error('user error', error)
      })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setShowButtons(!RegExp(/login|signup/).test(location.pathname))
  }, [location])

  return (
    <main className="route user">
      <Routes>
        <Route path='/signup' element={ <SignupForm /> } />
        <Route path='/login' element={ <LoginForm /> } />
        <Route path='/profile' element={ <Profile user={ displayUser } /> } />
      </Routes>
      {
        showButtons
        && (
          <LoginSignupButtons
            handleOnClick={ handleClick }
            isLoggedIn={ !!displayUser }
          />
        )
      }
    </main>
  )
}

export default User
