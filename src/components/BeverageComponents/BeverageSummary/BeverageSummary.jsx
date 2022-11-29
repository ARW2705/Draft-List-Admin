import React from 'react'

import Button from '../../Common/Button/Button'
import Divider from '../../Common/Divider/Divider'

import './BeverageSummary.css'


function BeverageSummary({ abv, ibu, srm, description, customClass, onClick: handleOnClick }) {
  return (
    <div className={ `beverage-summary ${ customClass ?? '' }` }>
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
      <p>{ description }</p>
      <div className='beverage-button-container'>
        <Button
          text='Delete Beverage'
          customClass='beverage-delete-button'
          ariaLabel='delete beverage'
          onClick={ () => handleOnClick('delete') }
          isFlat={ true }
        />
        <Divider
          color='secondary'
          direction='vertical'
        />
        <Button
          text='Edit Beverage'
          customClass='beverage-edit-button'
          ariaLabel='edit beverage'
          onClick={ () => handleOnClick('edit') }
          isFlat={ true }
        />
      </div>
    </div>
  )
}


export default React.memo(BeverageSummary)
