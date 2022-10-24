import React from 'react'

import './SelectionPreview.css'


function SelectionPreview({ beverage, container, device }) {
  return (
    <div className='selections'>
      <h3>Draft Preview</h3>
      <div className={ `preview-selection ${ device ? '' : 'missing'}` }>
        <span>Device</span>
        <span>{ device ? (device.title || device.name) : 'None' }</span>
      </div>
      <div className={ `preview-selection ${ container ? '' : 'missing'}` }>
        <span>Container</span>
        <span>{ container ? container.name : 'None' }</span>
      </div>
      <div className={ `preview-selection ${ beverage ? '' : 'missing'}` }>
        <span>Beverage</span>
        <span>{ beverage ? (beverage.title || beverage.name) : 'None' }</span>
      </div>
    </div>
  )
}


export default React.memo(SelectionPreview)
