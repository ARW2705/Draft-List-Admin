import React from 'react'

import './Locale.css'


function Locale({ city, region, country }) {
  return (
    <address className='locale'>
      { city && <span>{ city }</span> }
      { region && <span>{ region }</span> }
      { country && <span>{ city }</span> }
    </address>
  )
}


export default React.memo(Locale)
