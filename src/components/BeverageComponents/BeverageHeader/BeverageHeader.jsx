import React from 'react'

import './BeverageHeader.css'


function BeverageHeader({ name, source, style }) {
  return (
    <div className='beverage-header'>
      <div className='header-inner'>
        <div className='header-title'>
          <span>{ name }</span>
          <span>{ source }</span>
        </div>
        <span className='header-style'>{ style }</span>
      </div>
    </div>
  )
}


export default React.memo(BeverageHeader)
