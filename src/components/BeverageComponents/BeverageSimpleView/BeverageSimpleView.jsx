import React from 'react'

import toTitleCase from '../../../shared/utilities/title-case'

import './BeverageSimpleView.css'


function BeverageSimpleView({ name, title, source, style, onClick: handleOnClick, _id }) {
  return (
    <div
      className='beverage-simple-view'
      onClick={ e => handleOnClick(e, _id) }
    >
      <span className='beverage-name'>{ toTitleCase(title || name) }</span>
      <span className='beverage-source'>{ source }</span>
      <span className='beverage-style'>{ style }</span>
    </div>
  )
}


export default React.memo(BeverageSimpleView)
