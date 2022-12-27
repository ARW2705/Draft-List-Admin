import React, { cloneElement, useEffect, useRef, useState } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'

import { selectIsLoggedIn } from '../../services/user/store/user.selector'

import { RESET_STATE } from '../../shared/constants/shared-event-names'

import AppRoutes     from '../routes/AppRoutes'
import ErrorBoundary from '../../components/Common/Error/ErrorBoundary/ErrorBoundary'
import Footer        from '../../components/Footer/Footer'
import Header        from '../../components/Header/Header'

import './AppRouter.css'


/**
 * Get the direction in which the components should move during transition
 * 
 * @param: from - the origin route, can also contain further nested routes
 *                e.g. '/device' or '/device/form' are valid routes
 * @param: to - the destination route, must match exactly (base route)
 *              e.g. '/device' is valid, but '/device/form' is not valid
 * @return: direction 'left' or 'right' if from and to params are valid
 *          and do not match each other, else 'none'
 */
function getMovementDirection(from, to) {
  // routes array matches order displayed in navbar
  const routes = ['/drafts', '/devices', '/beverages', '/user']
  let fromIndex, toIndex
  routes.forEach((route, index) => {
    if (from.includes(route)) fromIndex = index
    if (to === route) toIndex = index
  })

  if (fromIndex === undefined || toIndex === undefined) return 'none'
  if (fromIndex > toIndex) return 'right'
  if (toIndex > fromIndex) return 'left'
  return 'none'
}

function AppRouter() {
  const animationDuration = 150 // 150ms animation speed
  const isLoggedIn = useSelector(selectIsLoggedIn)  
  const location = useLocation()
  const navigate = useNavigate()
  const onInit = useRef(true)

  const [ animationName, setAnimationName ] = useState('')
  const [ animationTimeout, setAnimationTimeout ] = useState(0)
  const [ displayLocation, setDisplayLocation ] = useState(location)

  useEffect(() => {
    if (!onInit.current && location.pathname === '/') {
      navigate(isLoggedIn ? '/drafts' : '/user')
    } else {
      onInit.current = false
    }
  }, [isLoggedIn, location, navigate])

  useEffect(() => {
    if (displayLocation.pathname !== location.pathname) {
      if (location.pathname.includes('form') || displayLocation.pathname.includes('form')) {
        setAnimationTimeout(animationDuration)
        setAnimationName('expansion')
      } else {
        const direction = getMovementDirection(displayLocation.pathname, location.pathname)
        setAnimationTimeout(direction !== 'none' ? animationDuration : 0)
        setAnimationName(direction)
      }
      // Delay setting location to allow animation timeout to set first
      setTimeout(() => setDisplayLocation(location), 0)
    }
  }, [location, displayLocation])

  const dispatch = useDispatch()
  const handleErrorDismiss = () => {
    dispatch({ type: RESET_STATE })
    navigate('/')
  }

  return (
    <div className='app-router-container'>
      <ErrorBoundary onErrorDismiss={ handleErrorDismiss }>
        <Header />
        <main className='router'>
          <TransitionGroup
            childFactory={ child => cloneElement(child, { classNames: animationName })}
            component={ null }
          >
            <CSSTransition
              key={ displayLocation.key }
              classNames={ animationName }
              timeout={ animationTimeout }
              unmountOnExit
            >
              <AppRoutes displayLocation={ displayLocation } />
            </CSSTransition>
          </TransitionGroup>
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}


const BrowserfiedRouter = () => <BrowserRouter><AppRouter /></BrowserRouter>

export default BrowserfiedRouter
