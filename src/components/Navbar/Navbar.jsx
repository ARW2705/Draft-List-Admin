import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'

import { selectIsLoggedIn } from '../../services/user/store/user.selector'

import BurgerMenu from '../Common/BurgerMenu/BurgerMenu'
import Nav        from '../Common/Nav/Nav'

import './Navbar.css'


function Navbar() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [ overrideOpen, setOverrideOpen ] = useState(false)
  const links = ['Drafts', 'Devices', 'Beverages', 'User'].map(pageName => {
    return <Nav name={ pageName } key={ pageName } />
  })
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' })
  const location = useLocation()
  
  useEffect(() => {
    setOverrideOpen({ isOpen: false })
  }, [location.pathname])

  return (
    <nav className='navbar'>
      <Nav
        name='Draft List'
        route={ isLoggedIn ? '/drafts' : '/user'}
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

export default React.memo(Navbar)
