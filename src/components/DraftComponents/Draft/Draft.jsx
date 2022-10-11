import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getDraft, updateDraft } from '../../../services/Draft/Draft'

import Button from '../../Common/Button/Button'
import Image from '../../Common/Image/Image'
import Modal from '../../Common/Modal/Modal'
import Quantity from '../../Common/Quantity/Quantity'

import './Draft.css'


function Draft({ draftId, container: initialContainer, beverage, removeDraft }) {
  const [ showQuantityModal, setShowQuantityModal ] = useState(false)
  const [ container, setContainer ] = useState(initialContainer)

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = ({ name }) => {
    switch (name) {
      case 'change-quantity':
        setShowQuantityModal(true)
        break
      case 'edit-draft':
        console.log('edit')
        navigate(`${location.pathname}/form`, { state: { draftId }})
        break
      case 'finish-draft':
        removeDraft()
        break
      default:
        throw new Error(`Invalid click event: ${name}`)
    }
  }

  const updateQuantity = async newQuantity => {
    const draft = await getDraft(draftId)
    const draftBody = {
      ...draft,
      container: {
        ...draft.container,
        quantity: newQuantity
      }
    }
    const { container: updatedContainer } = await updateDraft(draftId, draftBody)
    setContainer(updatedContainer)
  }

  const handleQuantityModalDismiss = data => {
    if (data) updateQuantity(data.quantity)
    setShowQuantityModal(false)
  }

  return (
    <>
      {
        showQuantityModal
        && <Modal
          component={ Quantity }
          data={ { quantity: container.quantity } }
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
        <div className='draft-content-c'>{ container.containerInfo.name }</div>
        <div className='draft-content-d'>•</div>
        <div className='draft-content-e'>{ Math.floor(container.quantity * 100 / container.containerInfo.capacity) }%</div>
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
