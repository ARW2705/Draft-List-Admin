import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import user from '../../../services/User/User'

import SignupForm from '../../../components/Forms/Signup/Signup'
import Login from '../../../components/Forms/Login/Login'
import LoginSignupButtons from '../../../components/LoginSignupButtons/LoginSignupButtons'


function User() {
  const [ showButtons, setShowButtons ] = useState(false)
  const [ displayUser, setDisplayUser ] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const navToComponent = name => {
    switch (name.toLowerCase()) {
      case 'login':
        setShowButtons(false)
        navigate(`${location.pathname}/login`)
        break
      case 'signup':
        console.log('naving to signup')
        setShowButtons(false)
        navigate(`${location.pathname}/signup`)
        break
      case 'profile':
        setShowButtons(true)
        break
      default:
        break
    }
  }

  const handleClick = event => {
    event.preventDefault()
    navToComponent(event.target.name)
  }

  useEffect(() => {
    const subscription = user.getUser()
      .subscribe({
        next: user => {
          console.log('user update', user)
          if (user) {
            setDisplayUser(user)
            navToComponent('profile')
          } else {
            setShowButtons(true)
          }
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
        <Route path='/login' element={ <Login /> } />
      </Routes>
      {
        showButtons &&
        <LoginSignupButtons
          handleClick={ handleClick }
          isLoggedIn={ !!displayUser }
        />
      }
    </main>
  )
}

export default User
