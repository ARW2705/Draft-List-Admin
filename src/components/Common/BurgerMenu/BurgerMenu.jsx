import React, { useEffect, useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'

import Button from '../Button/Button'
import Menu from '../Menu/Menu'

import './BurgerMenu.css'


function BurgerMenu({ menuItems, customClass, overrideOpen }) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ buttonConfig, setButtonConfig ] = useState({
    icon: <IoMenu />,
    label: 'menu-button'
  })

  useEffect(() => {
    if (overrideOpen?.hasOwnProperty('isOpen')) {
      setIsOpen(overrideOpen.isOpen)
    }
  }, [overrideOpen])

  useEffect(() => {
    setButtonConfig(prevProps => {
      return {
        icon: isOpen ? <IoClose /> : <IoMenu />,
        label: `${ isOpen ? 'close' : 'menu' }-button`
      }
    })
  }, [isOpen, setButtonConfig])

  const toggleMenu = () => {
    setIsOpen(prevProps => !prevProps)
  }

  return (
    <div className={ `burger-menu ${ customClass || '' }` }>
      <Button
        icon={ buttonConfig.icon }
        customClass={ `burger-button ${ isOpen ? 'circle-border' : '' }` }
        isDisabled={ false }
        name={ buttonConfig.label }
        ariaLabel={ buttonConfig.label }
        onClick={ toggleMenu }
      />
      <Menu
        isOpen={ isOpen }
        menuItems={ menuItems }
      />
    </div>
  )
}


export default React.memo(BurgerMenu)
