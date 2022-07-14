import React from 'react'

import BeverageHeader  from '../BeverageHeader/BeverageHeader'
import BeverageSummary from '../BeverageSummary/BeverageSummary'

import './Beverage.css'


function Beverage({ beverage, onClick: handleOnClick }) {
  const { name, style, source, abv, ibu, srm, description } = beverage
  
  return (
    <article
      className='beverage'
      data-id={ beverage._id }
      onClick={ () => handleOnClick(beverage) }
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
      />
    </article>
  )
}


export default React.memo(Beverage)
