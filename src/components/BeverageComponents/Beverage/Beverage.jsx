import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectBeverage } from '../../../services/beverage/store/beverage.selector'
import { updateBeverage } from '../../../services/beverage/store/beverage.thunk'

import BeverageHeader  from '../BeverageHeader/BeverageHeader'
import BeverageSummary from '../BeverageSummary/BeverageSummary'
import Modal           from '../../Common/Modal/Modal'
import Confirmation    from '../../Common/Confirmation/Confirmation'

import './Beverage.css'


function Beverage({ beverageId, showArchived }) {
  const beverage = useSelector(state => selectBeverage(state, beverageId))
  const { name, style, source, abv, ibu, srm, description, isArchived } = beverage
  const [ showConfirmationModal, setShowConfirmationModal ] = useState(false)
  const [ showBeverage, setShowBeverage ] = useState()

  useEffect(() => {
    setShowBeverage(!isArchived || showArchived)
  }, [showArchived, isArchived])

  const navigate = useNavigate()
  const handleOnClick = clickType => {
    if (clickType === 'edit') {
      navigate('form', { state: { beverage }})
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
    <>
      {
        showBeverage &&
        <div className='beverage'>
          <Modal
            isOpen={ showConfirmationModal }
            component={ Confirmation }
            data={ { actionMessage: <>Archive "<span>{ name }</span>" ?</> } }
            dismiss={ handleConfirmationModalDismiss }
          />
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
      }
    </>
  )
}


export default React.memo(Beverage)
