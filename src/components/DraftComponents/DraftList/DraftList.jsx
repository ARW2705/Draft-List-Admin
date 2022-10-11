import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '../../Common/Button/Button'
import DraftGroup from '../DraftGroup/DraftGroup'
import SpinnerLoader from '../../Common/Loaders/Spinner/Spinner'

import { getActiveDrafts } from '../../../services/Draft/Draft'

import './DraftList.css'


function DraftList() {
  const onInit = useRef(true)
  const [ components, setComponents ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const buildGroupContainers = useCallback(async draftCollection => {
    let components = []
    for (const key in draftCollection) {
      const { drafts, deviceName } = draftCollection[key]
      components = [
        ...components,
        <DraftGroup
          key={ key }
          deviceId={ key }
          deviceName={ deviceName }
          drafts={ drafts }
        />
      ]
    }

    return components
  }, [])

  const buildDraftList = useCallback(async () => {
    setComponents(await buildGroupContainers(await getActiveDrafts()))
    setIsLoading(false)
  }, [buildGroupContainers])

  const location = useLocation()
  useEffect(() => {
    if (onInit.current || location.pathname === '/draft') {
      console.log('build draft list')
      buildDraftList()
      onInit.current = false
    }
  }, [location, buildDraftList])

  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(`${location.pathname}/form`)
  }

  return (
    <div className='draft-list-container'>
      {
        isLoading
        ? <SpinnerLoader />
        : (
          <>
            <Button
              text='Add New Draft'
              name='add-draft'
              onClick={ handleOnClick }
              customClass='new-draft-button'
            />
            { components }
          </>
        )
      }
    </div>
  )
}


export default React.memo(DraftList)
