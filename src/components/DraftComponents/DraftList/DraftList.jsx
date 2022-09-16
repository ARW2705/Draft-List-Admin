import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Draft from '../Draft/Draft'
import DraftGroup from '../DraftGroup/DraftGroup'

import { getActiveDrafts } from '../../../services/Draft/Draft'

import './DraftList.css'


function DraftList() {
  const onInit = useRef(true)
  const [ components, setComponents ] = useState([])

  const buildDraftComponents = useCallback(drafts => {
    if (!drafts.length) return <p className='empty-list'>Device has no active drafts</p>
  
    return drafts.map(draft => (<Draft key={ draft._id } draft={ draft } />))
  }, [])

  const buildGroupContainers = useCallback(draftCollection => {
    let components = []
    for (const key in draftCollection) {
      const { drafts, deviceName } = draftCollection[key]
      components = [
        ...components,
        <DraftGroup
          key={ key }
          deviceId={ key }
          deviceName={ deviceName }
          draftComponents={ buildDraftComponents(drafts) }
        />
      ]
    }

    return components
  }, [buildDraftComponents])

  const buildDraftList = useCallback(() => {
    async function getList() {
      const draftCollection = await getActiveDrafts()
      setComponents(buildGroupContainers(draftCollection))
    }
    getList()
  }, [buildGroupContainers])

  const location = useLocation()
  useEffect(() => {
    if (onInit.current || location.pathname === '/draft') {
      console.log('build draft list')
      buildDraftList()
      onInit.current = false
    }
  }, [location, buildDraftList])

  return (
    <div className='draft-list-container'>
      { components }
    </div>
  )
}


export default React.memo(DraftList)
