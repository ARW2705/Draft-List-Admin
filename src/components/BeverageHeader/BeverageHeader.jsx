import React from 'react'

import './BeverageHeader.css'


function BeverageHeader({ name, style }) {
  return (
    <h2 className='BeverageHeader'>
      <p>{ name }</p>
      <p>{ style }</p>
    </h2>
  )
}


export default React.memo(BeverageHeader)
