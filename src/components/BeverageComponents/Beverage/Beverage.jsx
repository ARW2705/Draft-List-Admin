import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectBeverage } from '../../../services/beverage/store/beverage.selector'
import { updateBeverage } from '../../../services/beverage/store/beverage.thunk'

import BeverageHeader  from '../BeverageHeader/BeverageHeader'
import BeverageSummary from '../BeverageSummary/BeverageSummary'
import Modal from '../../Common/Modal/Modal'
import Confirmation from '../../Common/Confirmation/Confirmation'

import './Beverage.css'


function Beverage({ beverageId }) {
  const beverage = useSelector(state => selectBeverage(state, beverageId))
  const { name, style, source, abv, ibu, srm, description } = beverage
  const [ showConfirmationModal, setShowConfirmationModal ] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = clickType => {
    console.log('click type', clickType)
    if (clickType === 'edit') {
      navigate(`${location.pathname}/form`, { state: { beverage }})
    } else {
      setShowConfirmationModal(true)
    }
  }

  const dispatch = useDispatch()
  const handleConfirmationModalDismiss = data => {
    if (data) {
      const updateBeverageThunk = updateBeverage(beverageId, { data: { isArchived: true } })
      dispatch(updateBeverageThunk)
    }

    setShowConfirmationModal(false)
  }
  
  return (
    <div className='beverage'>
      {
        showConfirmationModal
        && <Modal
          component={ Confirmation }
          data={ { actionMessage: <>Archive "<span>{ name }</span>" ?</> } }
          dismiss={ handleConfirmationModalDismiss }
        />
      }
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
    </div>
  )
}


export default React.memo(Beverage)
