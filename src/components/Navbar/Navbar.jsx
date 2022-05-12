import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'


function Navbar() {
  return (
    <nav className="Navbar">
      <Link to='/manage'>Manage</Link>
      <Link to='/beverages'>Beverages</Link>
      <Link to='/user'>User</Link>
    </nav>
  )
}

export default Navbar
