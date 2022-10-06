import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '../../Common/Button/Button'
import Image from '../../Common/Image/Image'

import './Draft.css'


function Draft({ draftId, container, beverage }) {
  const { quantity, containerInfo } = container
  const { name: containerName, capacity } = containerInfo

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = ({ name }) => {
    switch (name) {
      case 'change-quantity':
        console.log('change')
        break
      case 'edit-draft':
        console.log('edit')
        navigate(`${location.pathname}/form`, { state: { draftId }})
        break
      case 'finish-draft':
        console.log('finish')
        break
      default:
        throw new Error(`Invalid click event: ${name}`)
    }
  }

  return (
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
  )
}


export default React.memo(Draft)
