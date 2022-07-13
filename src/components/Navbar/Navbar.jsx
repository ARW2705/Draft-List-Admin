import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'


function Navbar() {
  const pageNames = [ 'Manage', 'Beverages', 'User' ]
  const links = pageNames.map(pageName => {
    const name = pageName.toLowerCase()
    return (
      <Link
        key={ name }
        to={ `/${name}` }
        aria-labelledby={ `nav-${name}` }
      >
        <span id={ `nav-${name}` }>{ pageName }</span>
      </Link>
    )
  })

  return (
    <nav className="navbar">
      { links }
    </nav>
  )
}

export default Navbar
