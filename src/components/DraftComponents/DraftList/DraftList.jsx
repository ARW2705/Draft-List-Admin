import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Draft from '../Draft/Draft'
import DraftGroup from '../DraftGroup/DraftGroup'

import { getActiveDrafts } from '../../../services/Draft/Draft'

import './DraftList.css'


function DraftList() {
  const onInit = useRef(true)
  const [ components, setComponents ] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = useCallback(draft => {
    navigate(`${location.pathname}/form`, { state: { draft } })
  }, [navigate, location.pathname])

  const buildDraftComponents = useCallback(drafts => {
    if (!drafts.length) return <p className='empty-list'>Nothing here...</p>
  
    return drafts.map(draft => {
      return (
        <Draft
          key={ draft._id }
          draft={ draft }
          onClick={ handleOnClick }
        />
      )
    })
  }, [handleOnClick])

  const buildGroupContainers = useCallback(draftCollection => {
    let components = []
    for (const key in draftCollection) {
      const { drafts, deviceName } = draftCollection[key]
      components = [
        ...components,
        <DraftGroup
          key={ key }
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
