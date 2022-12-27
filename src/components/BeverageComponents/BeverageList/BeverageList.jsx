import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { selectBeverage, selectActiveBeverageIds, selectBeverageQueryId } from '../../../services/beverage/store/beverage.selector'

import Beverage from '../../BeverageComponents/Beverage/Beverage'
import Toast    from '../../Common/Toast/Toast'

import findUniqueInArrays from '../../../shared/utilities/find-unique'
import shallowCompare     from '../../../shared/utilities/shallow-compare'

import './BeverageList.css'


function BeverageList({ listConfig }) {
  const [ components, setComponents ] = useState([])
  const [ toast, setToast ] = useState(null)
  const toastDuration = 2 * 1000 // 2 seconds

  const { searchType, searchTerm } = listConfig
  const activeIds = useSelector(selectActiveBeverageIds, shallowCompare)
  const previousActiveIds = useRef(activeIds)
  const queryIds = useSelector(
    state => {
      if (!searchType && !searchTerm) return []
      return selectBeverageQueryId(state, searchType, searchTerm)
    },
    shallowCompare
  )
  const beverageIds = (searchType && searchTerm) ? queryIds : activeIds
  const activeIdsDiff = activeIds.length - previousActiveIds.current.length
  const newBeverage = useSelector(state => {
    const ids = findUniqueInArrays(beverageIds, previousActiveIds.current)
    return selectBeverage(state, ids.length ? ids[0] : '')
  })

  useEffect(() => {
    if (activeIdsDiff > 0) {
      setToast(`Added ${newBeverage.title || newBeverage.name}`)
    } else if (activeIdsDiff < 0) {
      setToast('Archived Beverage')
    }
  }, [activeIdsDiff, newBeverage])

  useEffect(() => {
    if (!beverageIds.length) {
      setComponents(<p className='empty-list'>Nothing here...</p>)
    } else {
      setComponents(beverageIds.map(id => (
        <Beverage
          className='beverage-container'
          key={ id }
          beverageId={ id }
          showArchived={ false }
        />
      )))
    }

    previousActiveIds.current = activeIds
  }, [beverageIds, activeIds])

  return (
    <div className='beverage-list'>
      <Toast
        isOpen={ !!toast }
        message={ toast }
        dismiss={ () => setToast(null) }
        duration={ toastDuration }
      />
      { components }
    </div>
  )
}


export default React.memo(BeverageList)
