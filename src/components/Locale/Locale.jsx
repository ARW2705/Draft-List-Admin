import React from 'react'

import './Locale.css'


function Locale({ city, region, country }) {
  let addressText = ''
  if (city) {
    addressText += city
  }

  if (region) {
    addressText += `${ addressText.length ? ', ' : '' }${ region }`
  }

  if (country) {
    addressText += ` ${ country }`
  }

  return (
    <address className='locale'>
      { addressText }
    </address>
  )
}


export default React.memo(Locale)
