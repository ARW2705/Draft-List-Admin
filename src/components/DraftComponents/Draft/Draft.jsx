import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getBeverageById } from '../../../services/Beverage/Beverage'

import Button from '../../Common/Button/Button'
import Image from '../../Common/Image/Image'
import Modal from '../../Common/Modal/Modal'
import Quantity from '../../Common/Quantity/Quantity'

import './Draft.css'


function Draft({ draftId, container, beverage }) {
  const [ showQuantityModal, setShowQuantityModal ] = useState(false)

  const { quantity, containerInfo } = container
  console.log('q', quantity)
  const { name: containerName, capacity } = containerInfo
  const [ beverage, setBeverage ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    async function getBeverage() {
      setBeverage(await getBeverageById(draft.beverage))
      setIsLoading(false)
    }
    getBeverage()
  }, [draft.beverage])

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = ({ name }) => {
    switch (name) {
      case 'change-quantity':
        setShowQuantityModal(true)
        break
      case 'edit-draft':
        console.log('edit')
        navigate(`${location.pathname}/form`, { state: { draft }})
        break
      case 'finish-draft':
        console.log('finish')
        break
      default:
        throw new Error(`Invalid click event: ${name}`)
    }
  }

  const handleQuantityModalDismiss = data => {
    console.log('new quantity', data.quantity)
    setShowQuantityModal(false)
  }

  return (
    <>
      {
        showQuantityModal
        && <Modal
          component={ Quantity }
          data={ { quantity } }
          dismiss={ handleQuantityModalDismiss }
        />
      }
      <div className='draft-container'>
        <Image
          imageURL={ beverage.imageURL }
          alt='beverage label'
          customClass='draft-beverage-label'
        />
        <div className='draft-content-a'>{ beverage.title || beverage.name }</div>
        <div className='draft-content-b'>•</div>
        <div className='draft-content-c'>{ containerName }</div>
        <div className='draft-content-d'>•</div>
        <div className='draft-content-e'>{ Math.floor(quantity * 100 / capacity) }%</div>
        <Button
          text='Change Quantity'
          name='change-quantity'
          customClass='draft-button-a'
          onClick={ handleOnClick }
        />
        <Button
          text='Edit Draft'
          name='edit-draft'
          customClass='draft-button-b'
          onClick={ handleOnClick }
        />
        <Button
          text='Finish Draft'
          name='finish-draft'
          customClass='draft-button-c'
          onClick={ handleOnClick }
        />
      </div>
    </>
  )
}


export default React.memo(Draft)
