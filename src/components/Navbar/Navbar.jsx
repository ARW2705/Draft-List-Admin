import React from 'react'
import { useMediaQuery } from 'react-responsive'

import Nav from '../Common/Nav/Nav'
import BurgerMenu from '../Common/BurgerMenu/BurgerMenu'

import './Navbar.css'


function Navbar() {
  const links = ['Devices', 'Beverages', 'User'].map(pageName => {
    return <Nav name={ pageName } key={ pageName } />
  })
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' })
  const handleOnClick = e => {
    console.log('e', e)
  }

  return (
    <nav className='navbar'>
      <Nav
        name='Draft List'
        route='/'
        customClass='home-link'
      />
      {
        isSmallScreen
        ? (
          <BurgerMenu
            menuItems={ links }
            customClass='other-links'
          />
        )
        : (
          <div className='other-links' onClick={ handleOnClick }>
            { links }
          </div>
        )
      }
    </nav>
  )
}

export default Navbar
