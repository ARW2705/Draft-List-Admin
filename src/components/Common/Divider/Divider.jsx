import React from 'react'

import './Divider.css'


function Divider({ color = 'primary', direction = 'horizontal', customClass = '' }) {
  return (
    <div
      className={ `app-divider ${direction} ${customClass}` }
      style={{ backgroundColor: `var(--${color})` }}
    >
    </div>
  )
}


export default React.memo(Divider)
