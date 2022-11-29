import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from './services/user/store/user.slice'

import ErrorButton from './exp/ErrorButton'
import ErrorBoundary from './components/Common/Error/ErrorBoundary/ErrorBoundary'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import './App.css'


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn)  
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

  const handleErrorDismiss = () => {
    // reset state except user

    // nav to home
    navigate('/')
  }

  return (
    <div className="App">
      <Header />
      <ErrorBoundary onErrorDismiss={ handleErrorDismiss }>
        <ErrorButton />
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App
