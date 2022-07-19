import React from 'react'

import './BeverageSummary.css'


function BeverageSummary({ abv, ibu, srm, description, isEditable }) {
  return (
    <div className={ `beverage-summary ${ isEditable ? 'editable' : '' }` }>
      <div className='number-values'>
        <span>
          ABV <span className='value'>{ abv ? `${abv}%` : '--' }</span>
        </span>
        <span>
          IBU <span className='value'>{ ibu ? ibu : '--' }</span>
        </span>
        <span>
          SRM <span className='value'>{ srm ? srm : '--' }</span>
        </span>
      </div>
      { description && <p>{ description }</p> }
      { isEditable && <span className='edit-callout'>Click To Edit</span> }
    </div>
  )
}


export default React.memo(BeverageSummary)
