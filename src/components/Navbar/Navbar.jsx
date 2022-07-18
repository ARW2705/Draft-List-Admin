import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navbar.css'


function Navbar() {
  const pageNames = [ 'Devices', 'Beverages', 'User' ]
  const links = pageNames.map(pageName => {
    const name = pageName.toLowerCase()
    return (
      <NavLink
        key={ name }
        to={ `/${name}` }
        aria-labelledby={ `nav-${name}` }
      >
        <span id={ `nav-${name}` }>{ pageName }</span>
      </NavLink>
    )
  })

  

  return (
    <nav className='navbar'>
      <NavLink
        to='/'
        aria-labelledby='nav-home'
      >
        <span id='nav-home'>Draft List</span>
      </NavLink>
      
      <div className='other-links'>
        { links }
      </div>
    </nav>
  )
}

export default Navbar
