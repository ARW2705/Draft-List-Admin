import React, { useEffect, useState } from 'react'
import { useNavigate }                from 'react-router-dom'
import { useSelector, useDispatch }   from 'react-redux'

import store from '../../../app/store'

import { selectBeverage }          from '../../../services/beverage/store/beverage.selector'
import { archiveDraft }            from '../../../services/device/store/device.thunk'
import { selectDraft }             from '../../../services/draft/store/draft.selector'
import { remove as removeDraft }   from '../../../services/draft/store/draft.slice'
import { updateDraft, getFromAPI } from '../../../services/draft/store/draft.thunk'

import DraftContent from '../DraftContent/DraftContent'
import ButtonGroup  from '../../Common/ButtonGroup/ButtonGroup'
import Image        from '../../Common/Image/Image'
import Modal        from '../../Common/Modal/Modal'
import Quantity     from '../../Common/Quantity/Quantity'
import Spinner      from '../../Common/Loaders/Spinner/Spinner'

import './Draft.css'


function Draft({ draftId, deviceId }) {
  const [ showQuantityModal, setShowQuantityModal ] = useState(false)
  const [ draft, setDraft ] = useState(useSelector(state => selectDraft(state, draftId)))
  const [ beverage, setBeverage ] = useState(useSelector(state => selectBeverage(state, draft?.beverage)))
  const [ isLoading, setIsLoading ] = useState(!(draft && beverage))

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleOnClick = async name => {
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

  const draftButtons = [
    {
      customClass: 'draft-edit-button',
      isFlat: true,
      name: 'edit-draft',
      text: 'Edit',
      onClick: () => handleOnClick('edit-draft')
    },
    {
      customClass: 'draft-change-quantity-button',
      isFlat: true,
      name: 'change-quantity',
      text: 'Change Quantity',
      onClick: () => handleOnClick('change-quantity')
    },
    {
      customClass: 'draft-finish-button',
      isFlat: true,
      name: 'finish-draft',
      text: 'Finish',
      onClick: () => handleOnClick('finish-draft')
    }
  ]

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
          <div className='draft-container grid'>
            <Image
              imageURL={ beverage.imageURL }
              alt='beverage label'
              customClass='draft-grid-image'
            />
            <DraftContent
              customClass='draft-grid-content'
              beverageDisplayName={ beverage.title || beverage.name }
              containerDisplayName={ draft.container.containerInfo.name }
              percentRemaining={ Math.floor(draft.container.quantity * 100 / draft.container.containerInfo.capacity) }
            />
            <ButtonGroup
              buttons={ draftButtons }
              customClass='draft-grid-buttons'
              dividerColor='primary-light'
            />
          </div>
        </>
      }
    </>
  )
}


export default React.memo(Draft)
