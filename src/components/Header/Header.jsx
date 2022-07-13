import React, { useEffect, useState, useCallback } from 'react'

import Navbar from '../Navbar/Navbar'

import throttle from '../../shared/utilities/throttle'

import './Header.css'


function Header() {
  const [ scrollClass, setScrollClass ] = useState({ className: '' })

  let previousScrollPosition = 0
  const handleScrollEvent = useCallback(
    event => {
      if (event.detail.scrollTop === undefined) return

      const currentScrollPosition = event.detail.scrollTop
      if (currentScrollPosition > previousScrollPosition) {
        setScrollClass({ className: 'scroll-down' })
      } else if (currentScrollPosition < previousScrollPosition) {
        setScrollClass({ className: 'scroll-up' })
      }
      previousScrollPosition = currentScrollPosition
    }, []
  )

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleScrollEvent, 250))
    return () => window.removeEventListener('scroll', throttle)
  }, [handleScrollEvent])

  return (
    <header className={`app-header ${scrollClass.className}`}>
      <h1>Draft List</h1>
      <Navbar />
    </header>
  )
}

export default Header
