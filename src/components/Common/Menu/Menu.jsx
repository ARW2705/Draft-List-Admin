import React from 'react'

import './Menu.css'


function Menu({ isOpen, menuItems }) {
  return (
    <div className={ `menu ${ isOpen ? 'show' : '' }` }>
      { menuItems }
    </div>
  )
}


export default React.memo(Menu)
