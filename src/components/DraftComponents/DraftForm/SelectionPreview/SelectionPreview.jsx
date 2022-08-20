import React from 'react'

import './SelectionPreview.css'


function SelectionPreview({ beverage, container, device }) {
  return (
    <div className='selections'>
      <div>Beverage: { beverage && <span>{ beverage.title || beverage.name }</span> }</div>
      <div>Container: { container && <span>{ container.name }</span> }</div>
      <div>Device: { device && <span>{ device.title || device.name }</span> }</div>
    </div>
  )
}


export default React.memo(SelectionPreview)
