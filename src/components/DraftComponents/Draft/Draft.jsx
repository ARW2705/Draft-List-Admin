import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleOnClick = async name => {
    switch (name) {
      case 'change-quantity':
        setShowQuantityModal(true)
        break
      case 'edit-draft':
        navigate(`${location.pathname}/form`, { state: { draft }})
        break
      case 'finish-draft':
        const archiveDraftThunk = archiveDraft(deviceId, draftId)
        dispatch(archiveDraftThunk)
        dispatch(removeDraft(draftId))
        break
      default:
        throw new Error(`Invalid click event: ${name}`)
    }
  }

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
            <Image
              imageURL={ beverage.imageURL }
              alt='beverage label'
              customClass='draft-beverage-label'
            />
            <div className='draft-content-a'>{ beverage.title || beverage.name }</div>
            <div className='draft-content-b'>•</div>
            <div className='draft-content-c'>{ draft.container.containerInfo.name }</div>
            <div className='draft-content-d'>•</div>
            <div className='draft-content-e'>{ Math.floor(draft.container.quantity * 100 / draft.container.containerInfo.capacity) }%</div>
            <Button
              text='Change Quantity'
              name='change-quantity'
              customClass='draft-button-a'
              onClick={ () => handleOnClick('change-quantity') }
            />
            <Button
              text='Edit Draft'
              name='edit-draft'
              customClass='draft-button-b'
              onClick={ () => handleOnClick('edit-draft') }
            />
            <Button
              text='Finish Draft'
              name='finish-draft'
              customClass='draft-button-c'
              onClick={ () => handleOnClick('finish-draft') }
            />
          </div>
        </>
      }
    </>
  )
}


export default React.memo(Draft)
