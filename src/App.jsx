import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectIsLoggedIn } from './services/user/store/user.slice'

import { RESET_STATE } from './shared/constants/shared-event-names'

import ErrorBoundary from './components/Common/Error/ErrorBoundary/ErrorBoundary'
import Header        from './components/Header/Header'
import Footer        from './components/Footer/Footer'

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
  
  const dispatch = useDispatch()
  const handleErrorDismiss = () => {
    dispatch({ type: RESET_STATE })
    navigate('/')
  }

  return (
    <div className="App">
      <Header />
      <ErrorBoundary onErrorDismiss={ handleErrorDismiss }>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App
