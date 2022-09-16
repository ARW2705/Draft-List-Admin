import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '../../Common/Button/Button'

import './DraftGroup.css'


function DraftGroup({ deviceName, deviceId, draftComponents }) {
  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(`${location.pathname}/form`, { state: { deviceId }})
  }
  
  return (
    <div className='draft-group-container'>
      <h2 className='draft-device-name'>{ deviceName }</h2>
      <Button
        text='Add New Draft'
        name='add-draft'
        onClick={ handleOnClick }
        customClass='new-draft-button'
        isFlat={ true }
      />
      <div className='draft-group'>
        { draftComponents }
      </div>
    </div>
  )
}


export default React.memo(DraftGroup)
