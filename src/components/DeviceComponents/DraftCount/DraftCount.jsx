import React, { useEffect, useState } from 'react'

import './DraftCount.css'


function DraftCount({ draftList }) {
  const [ activeDraftCount, setActiveDraftCount ] = useState(null)

  useEffect(() => {
    setActiveDraftCount(draftList.reduce((acc, curr) => acc + curr.isActive ? 1 : 0, 0))
  }, [draftList])

  return (
    <div className='draft-count'>
      Active drafts: <span>{ activeDraftCount }</span>
    </div>
  )
}


export default React.memo(DraftCount)
