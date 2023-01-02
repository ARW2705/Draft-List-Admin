import React from 'react'

import './DraftContent.css'


function DraftContent({ customClass = '', beverageDisplayName, containerDisplayName, percentRemaining }) {
  return (
    <div className={`draft-content-container ${customClass}`}>
      <span>{ beverageDisplayName }</span>
      <span>{ containerDisplayName }</span>
      <span>{ percentRemaining }% remaining</span>
    </div>
  )
}


export default React.memo(DraftContent)
