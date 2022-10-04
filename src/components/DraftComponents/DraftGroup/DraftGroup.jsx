import React from 'react'

import './DraftGroup.css'


function DraftGroup({ deviceName, draftComponents }) {
  return (
    <div className='draft-group-container'>
      <h2 className='draft-device-name'>{ deviceName }</h2>
      <div className='draft-group'>
        { draftComponents }
      </div>
    </div>
  )
}


export default React.memo(DraftGroup)
