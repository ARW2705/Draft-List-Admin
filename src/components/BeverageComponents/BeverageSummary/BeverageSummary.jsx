import React from 'react'

import Button from '../../Common/Button/Button'

import './BeverageSummary.css'


function BeverageSummary({ abv, ibu, srm, description, isEditable, onClick: handleOnClick }) {
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
      {
        isEditable
        && <Button
          text='Edit Beverage'
          customClass='beverage-edit-button'
          ariaLabel='edit beverage'
          onClick={ handleOnClick }
          isFlat={ true }
        />
      }
    </div>
  )
}


export default React.memo(BeverageSummary)
