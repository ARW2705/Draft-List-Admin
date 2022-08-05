import React from 'react'

import toTitleCase from '../../../shared/utilities/title-case'

import './BeverageSimpleView.css'


function BeverageSimpleView({ name, title, source, style }) {
  return (
    <div className='beverage-simple-view'>
      <span className='beverage-name'>{ toTitleCase(title || name) }</span>
      <span className='beverage-source'>{ source }</span>
      <span className='beverage-style'>{ style }</span>
    </div>
  )
}


export default React.memo(BeverageSimpleView)
