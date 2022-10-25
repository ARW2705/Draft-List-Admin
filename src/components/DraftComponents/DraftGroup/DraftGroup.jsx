import React, { useCallback, useEffect, useState } from 'react'

import { archiveDraft } from '../../../services/Device/Device'
import { getBeverageById } from '../../../services/Beverage/Beverage'
import { getDraftListByIds } from '../../../services/Draft/Draft'

import Draft from '../Draft/Draft'

import './DraftGroup.css'


function DraftGroup({ deviceId, deviceName, drafts: initialDrafts }) {
  const [ draftList, setDraftList ] = useState(initialDrafts)
  const [ draftComponents, setDraftComponents ] = useState([])

  const removeDraft = useCallback(async draftId => {
    const updatedDraftList = await archiveDraft(deviceId, draftId)
    const { drafts: populatedDrafts } = await getDraftListByIds(updatedDraftList)
    setDraftList(populatedDrafts)
  }, [deviceId, setDraftList])

  useEffect(() => {
    async function init() {
      if (!draftList.length) return setDraftComponents(<p className='empty-list'>Device has no active drafts</p>)

      const populatedBeverages = await Promise.all(draftList.map(draft => getBeverageById(draft.beverage)))
      setDraftComponents(draftList.map((draft, index) => (
        <Draft
          key={ draft._id }
          deviceId={ deviceId }
          draftId={ draft._id }
          container={ draft.container }
          beverage={ populatedBeverages[index] }
          removeDraft={ () => removeDraft(draft._id) }
        />
      )))
    }
    init()
  }, [draftList, deviceId, setDraftComponents, removeDraft])

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
