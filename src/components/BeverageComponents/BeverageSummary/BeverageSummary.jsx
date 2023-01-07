import React from 'react'

import ButtonGroup from '../../Common/ButtonGroup/ButtonGroup'

import './BeverageSummary.css'


function BeverageSummary({ abv, ibu, srm, description, customClass, onClick: handleOnClick }) {
  const buttons = [
    {
      ariaLabel: 'archive beverage',
      customClass: 'beverage-archive-button',
      isFlat: true,
      name: 'archive-beverage',
      text: 'Archive Beverage',
      onClick: () => handleOnClick('archive')
    },
    {
      ariaLabel: 'edit beverage',
      customClass: 'beverage-edit-button',
      isFlat: true,
      name: 'edit-beverage',
      text: 'Edit Beverage',
      onClick: () => handleOnClick('edit')
    }
  ]

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
      <ButtonGroup
        buttons={ buttons }
        customClass='beverage-button-container'
        dividerColor='primary-light'
      />
    </div>
  )
}


export default React.memo(BeverageSummary)
