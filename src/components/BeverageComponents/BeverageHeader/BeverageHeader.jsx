import React from 'react'

import Image from '../../Common/Image/Image'

import './BeverageHeader.css'


function BeverageHeader({ name, source, style, imageURL }) {
  return (
    <div className='beverage-header-container'>
      <div className='header-title'>
        <span>{ name }</span>
        <span>{ source }</span>
      </div>
      <Image
        imageURL={ imageURL }
        customClass='beverage-header-image'
      />
      <div className='header-style'>
        <span>{ style }</span>
      </div>
    </div>
  )
}


export default React.memo(BeverageHeader)
