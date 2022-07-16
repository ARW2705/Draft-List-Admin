import React from 'react'

import './Device.css'


function Device({ device }) {
  const { name, title, imageURL, locale, draftList } = device
  const { city, region, country } = locale

  return (
    <article className='device'>
      
    </article>
  )
}


export default React.memo(Device)
