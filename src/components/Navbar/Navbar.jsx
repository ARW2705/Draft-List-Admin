import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import UserService from '../../services/User/User'

import Nav from '../Common/Nav/Nav'
import BurgerMenu from '../Common/BurgerMenu/BurgerMenu'

import './Navbar.css'


function Navbar() {
  const [ overrideOpen, setOverrideOpen ] = useState(false)
  const [ homeRoute, setHomeRoute ] = useState('/')
  const links = ['Draft', 'Device', 'Beverage', 'User'].map(pageName => {
    return <Nav name={ pageName } key={ pageName } />
  })
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' })
  const location = useLocation()
  
  useEffect(() => {
    setOverrideOpen({ isOpen: false })
  }, [location.pathname])

  useEffect(() => {
    const subscription = UserService.getUser()
    .subscribe({
      next: user => setHomeRoute(user._id !== null ? '/draft' : '/user'),
      error: error => console.error('user error', error)
    })

  return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className='navbar'>
      <Nav
        name='Draft List'
        route={ homeRoute }
        customClass='home-link'
      />
      {
        isSmallScreen
        ? (
          <BurgerMenu
            menuItems={ links }
            customClass='other-links'
            overrideOpen={ overrideOpen }
          />
        )
        : (
          <div className='other-links'>
            { links }
          </div>
        )
      }
    </nav>
  )
}

export default Navbar
