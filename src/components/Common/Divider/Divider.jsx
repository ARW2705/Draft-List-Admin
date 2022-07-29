import React from 'react'

import './Divider.css'


function Divider({ color = 'primary', customClass = '' }) {
  return (
    <div
      className={ `app-divider ${customClass}` }
      style={{ backgroundColor: `var(--${color})` }}
    >
    </div>
  )
}


export default React.memo(Divider)
