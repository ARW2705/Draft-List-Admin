import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useMediaQuery } from '../../../shared/hooks/media-query-hook'

import store from '../../../app/store'

import { selectDraft } from '../../../services/draft/store/draft.selector'
import { remove as removeDraft } from '../../../services/draft/store/draft.slice'
import { updateDraft, getFromAPI } from '../../../services/draft/store/draft.thunk'
import { selectBeverage } from '../../../services/beverage/store/beverage.selector'
import { archiveDraft } from '../../../services/device/store/device.thunk'

import Spinner  from '../../Common/Loaders/Spinner/Spinner'
import Button   from '../../Common/Button/Button'
import Image    from '../../Common/Image/Image'
import Modal    from '../../Common/Modal/Modal'
import Quantity from '../../Common/Quantity/Quantity'

import './Draft.css'


function Draft({ draftId, deviceId }) {
  const [ showQuantityModal, setShowQuantityModal ] = useState(false)
  const [ draft, setDraft ] = useState(useSelector(state => selectDraft(state, draftId)))
  const [ beverage, setBeverage ] = useState(useSelector(state => selectBeverage(state, draft?.beverage)))
  const [ isLoading, setIsLoading ] = useState(!(draft && beverage))
  const [ content, setContent ] = useState(<></>)
  const isSmallScreen = useMediaQuery('sm')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleOnClick = useCallback(async name => {
    switch (name) {
      case 'change-quantity':
        setShowQuantityModal(true)
        break
      case 'edit-draft':
        navigate('form', { state: { draft }})
        break
      case 'finish-draft':
        const archiveDraftThunk = archiveDraft(deviceId, draftId)
        dispatch(archiveDraftThunk)
        dispatch(removeDraft(draftId))
        break
      default:
        throw new Error(`Invalid click event: ${name}`)
    }
  }, [dispatch, navigate, deviceId, draftId, draft])

  const handleQuantityModalDismiss = data => {
    if (data) {
      const updatedDraft = {
        ...draft,
        container: {
          ...draft.container,
          quantity: data.quantity
        }
      }

      dispatch(updateDraft(draftId, updatedDraft))
      const updateDraftThunk = updateDraft(draftId, updatedDraft)
      dispatch(updateDraftThunk)
    }
    setShowQuantityModal(false)
  }

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      const selectedDraft = selectDraft(state, draftId)
      if (!selectedDraft) return

      const selectedBeverage = selectBeverage(state, selectedDraft.beverage)
      if (!selectedBeverage) return
      // TODO: decide what to do if a draft is not found or a draft is found but not an associated beverage
      setDraft(selectedDraft)
      setBeverage(selectedBeverage)
      setIsLoading(false)
    })

    if (!draft) {
      console.log('missing draft, fetching from api')
      dispatch(getFromAPI(draftId))
    }

    return () => unsubscribe()
  }, [draftId, draft, dispatch])

  useEffect(() => {
    const displayElements = <>
      <Image
        imageURL={ beverage.imageURL }
        alt='beverage label'
        customClass='draft-beverage-label'
      />
      <div className='draft-content-a'>{ beverage.title || beverage.name }</div>
      <div className={`draft-content-b ${isSmallScreen ? 'bullet-icon' : ''}`}>•</div>
      <div className='draft-content-c'>{ draft.container.containerInfo.name }</div>
      <div className={`draft-content-d ${isSmallScreen ? 'bullet-icon' : ''}`}>•</div>
      <div className='draft-content-e'>{ Math.floor(draft.container.quantity * 100 / draft.container.containerInfo.capacity) }%</div>
    </>

    const buttonElements = <>
      <Button
        customClass='draft-button-a'
        name='edit-draft'
        text='Edit Draft'
        onClick={ () => handleOnClick('edit-draft') }
      />
      <Button
        customClass='draft-button-b'
        name='change-quantity'
        text='Change Quantity'
        onClick={ () => handleOnClick('change-quantity') }
      />
      <Button
        customClass='draft-button-c'
        name='finish-draft'
        text='Finish Draft'
        onClick={ () => handleOnClick('finish-draft') }
      />
    </>
    
    if (isSmallScreen) {
      setContent(
        <>
          <div className='draft-display-container'>
            { displayElements }
          </div>
          <div className='draft-buttons-container'>
            { buttonElements }
          </div>
        </>
      )
    } else {
      setContent(
        <>
          { displayElements }
          { buttonElements }
        </>
      )
    }
  }, [isSmallScreen, beverage, draft, handleOnClick])

  return (
    <>
      {
        isLoading
        ? <Spinner />
        : <>
          <Modal
            isOpen={ showQuantityModal }
            component={ Quantity }
            data={ { quantity: draft.container.quantity } }
            dismiss={ handleQuantityModalDismiss }
          />
          <div className='draft-container'>
            { content }
          </div>
        </>
      }
    </>
  )
}


export default React.memo(Draft)
