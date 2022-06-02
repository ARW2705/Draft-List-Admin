import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import userService from '../../../services/User/User.service'

import SignupForm from '../../../components/Forms/Signup/Signup'
import LoginSignupButtons from '../../../components/LoginSignupButtons/LoginSignupButtons'


function User() {
  const [ showButtons, setShowButtons ] = useState(false)
  const [ user, setUser ] = useState(null)

  const navigate = useNavigate()
  const navToComponent = name => {
    console.log(name)
    switch (name.toLowerCase()) {
      case 'login':
        setShowButtons(false)

        break
      case 'signup':
        console.log('naving to signup')
        setShowButtons(false)
        navigate('/user/signup')
        break
      case 'profile':
        setShowButtons(true)
        break
      default:
        break
    }
  }

  const handleClick = event => {
    console.log(event.target.name)
    event.preventDefault()
    navToComponent(event.target.name)
  }

  useEffect(() => {
    const subscription = userService.getUser()
      .subscribe(
        user => {
          console.log('user update', user)
          if (user) {
            setUser(user)
            navToComponent('profile')
          } else {
            setShowButtons(true)
          }
        },
        error => console.log('user error', error)
      )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <main className="route user">
      <Routes>
        <Route path='/signup' element={ <SignupForm />} />
      </Routes>
      {
        showButtons &&
        <LoginSignupButtons
          handleClick={ handleClick }
          isLoggedIn={ !!user }
        />
      }
    </main>
  )
}

export default User
