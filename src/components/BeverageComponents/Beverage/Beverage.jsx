import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectBeverage } from '../../../services/beverage/store/beverage.slice'

import BeverageHeader  from '../BeverageHeader/BeverageHeader'
import BeverageSummary from '../BeverageSummary/BeverageSummary'

import './Beverage.css'


function Beverage({ beverageId }) {
  const beverage = useSelector(state => selectBeverage(state, beverageId))
  const { name, style, source, abv, ibu, srm, description } = beverage
  
  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = clickType => {
    console.log('click type', clickType)
    if (clickType === 'edit') {
      navigate(`${location.pathname}/form`, { state: { beverage }})
    } else {
      // TODO add deletion modal
    }
  }
  
  return (
    <article className='beverage'>
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
        onClick={ handleOnClick }
      />
    </article>
  )
}


export default React.memo(Beverage)
