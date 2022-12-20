import React from 'react'
import { useSelector } from 'react-redux'

import { selectActiveDrafts } from '../../../services/draft/store/draft.selector'

import DraftGroup from '../DraftGroup/DraftGroup'

import './DraftList.css'


function DraftList() {
  const draftCollection = useSelector(selectActiveDrafts)

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
      { components }
    </div>
  )
}


export default React.memo(DraftList)
