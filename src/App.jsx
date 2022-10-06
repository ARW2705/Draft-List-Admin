import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'

import Token from './services/Token/Token'
import User from './services/User/User'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import './App.css'


function App() {
  Token.init()
  User.init()

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/') {
      navigate(isLoggedIn ? '/draft' : '/user')
    }
  }, [isLoggedIn, location, navigate])

  useEffect(() => {
    const subscription = User.getUser()
      .subscribe({
        next: user => setIsLoggedIn(user._id !== null),
        error: error => console.error('user error', error)
      })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App
