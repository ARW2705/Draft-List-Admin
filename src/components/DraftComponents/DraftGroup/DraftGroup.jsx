import React from 'react'

import './DraftGroup.css'


function DraftGroup({ deviceName, draftComponents }) {
  return (
    <div className='draft-group-container'>
      <div className='device-name'>
        <span>{ deviceName }</span>
      </div>
      { draftComponents }
    </div>
  )
}


export default React.memo(DraftGroup)
