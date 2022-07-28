import React from 'react'

import BeverageHeader  from '../BeverageHeader/BeverageHeader'
import BeverageSummary from '../BeverageSummary/BeverageSummary'

import { canEdit } from '../../../services/Beverage/Beverage'

import './Beverage.css'


function Beverage({ beverage, onClick: handleOnClick }) {
  const { name, style, source, abv, ibu, srm, description } = beverage
  const canEditBeverage = canEdit(beverage._id)
  const handleClick = event => {
    event.preventDefault()
    if (canEditBeverage) handleOnClick(beverage)
  }
  
  return (
    <article
      className='beverage'
      data-id={ beverage._id }
      onClick={ handleClick }
    >
      <BeverageHeader
        name={ name }
        style={ style }
        source={ source }
      />
      <BeverageSummary
        abv={ abv }
        ibu={ ibu }
        srm={ srm }
        description={ description }
        isEditable={ canEditBeverage }
      />
    </article>
  )
}


export default React.memo(Beverage)
