import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'

import TokenService from './services/Token/Token'
import UserService from './services/User/User'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import './App.css'


function App() {
  TokenService.init()
  UserService.init()
  
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  
  const location = useLocation()
  const navigate = useNavigate()
  const onInit = useRef(true)
  useEffect(() => {
    if (!onInit.current && location.pathname === '/') {
      navigate(isLoggedIn ? '/draft' : '/user')
    } else {
      onInit.current = false
    }
  }, [isLoggedIn, location, navigate])

  useEffect(() => {
    const subscription = UserService.getUser()
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
