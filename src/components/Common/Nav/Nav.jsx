import React from 'react'
import { NavLink } from 'react-router-dom'

import './Nav.css'


function Nav({ name, route, customClass, icon: Icon }) {
  const lowerName = name.toLowerCase()

  return (
    <NavLink
      key={ lowerName }
      to={ route || `/${lowerName}` }
      className={ `nav-link ${ customClass || '' }` }
      aria-labelledby={ `nav-${lowerName}` }
    >
      { Icon && <Icon /> }
      <span id={ `nav-${lowerName}` }>{ name }</span>
    </NavLink>
  )
}


export default React.memo(Nav)
