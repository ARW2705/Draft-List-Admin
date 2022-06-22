import React from 'react'

import BeverageHeader from '../BeverageHeader/BeverageHeader'
import BeverageSummary from '../BeverageSummary/BeverageSummary'

import './Beverage.css'


function Beverage({ beverage }) {
  const { name, style, source, abv, ibu, srm, description } = beverage
  return (
    <article className='Beverage'>
      <BeverageHeader
        name={ name }
        style={ style }
      />
      <BeverageSummary
        source={ source }
        abv={ abv }
        ibu={ ibu }
        srm={ srm }
        description={ description }
      />
    </article>
  )
}


export default React.memo(Beverage)
