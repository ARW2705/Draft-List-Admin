import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectActiveDrafts } from '../../../services/draft/store/draft.selector'

import Button     from '../../Common/Button/Button'
import DraftGroup from '../DraftGroup/DraftGroup'

import './DraftList.css'


function DraftList() {
  const draftCollection = useSelector(selectActiveDrafts)
  const location = useLocation()
  const navigate = useNavigate()

  let components = []
  for (const key in draftCollection) {
    const { draftIds, deviceName } = draftCollection[key]
    components = [
      ...components,
      <DraftGroup
        key={ key }
        deviceId={ key }
        deviceName={ deviceName }
        draftIds={ draftIds }
      />
    ]
  }

  return (
    <div className='draft-list-container'>
      <Button
        text='Add New Draft'
        name='add-draft'
        onClick={ () => navigate(`${location.pathname}/form`) }
        customClass='new-draft-button'
      />
      { components }
    </div>
  )
}


export default React.memo(DraftList)
