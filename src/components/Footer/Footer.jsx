import React from 'react'

import './Footer.css'


function Footer() {
  return (
    <footer className="app-footer">
      <span>App Version v0.0.1</span>
      <span>API Version v0.0.1</span>
    </footer>
  )
}

export default React.memo(Footer)
