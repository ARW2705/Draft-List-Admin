import React from 'react'

import Draft from '../Draft/Draft'

import './DraftGroup.css'


function DraftGroup({ deviceId, deviceName, draftIds }) {
  let components
  if (!draftIds.length) {
    components = <p className='empty-list'>Device has no active drafts</p>
  } else {
    components = draftIds.map(draftId => (
      <Draft
        key={ draftId }
        deviceId={ deviceId }
        draftId={ draftId }
      />
    ))
  }

  return (
    <div className='draft-group-container'>
      <h2 className='draft-device-name'>{ deviceName }</h2>
      <div className='draft-group'>
        { components }
      </div>
    </div>
  )
}


export default React.memo(DraftGroup)
