import React, { useCallback, useEffect, useState, useRef } from 'react'
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

  const { searchType, searchTerm } = listConfig
  const selector = (searchType && searchTerm)
    ? state => selectBeverageQueryId(state, searchType, searchTerm)
    : selectActiveBeverageIds
  const beverageIds = useSelector(selector, shallowCompare)
  const previousBeverageIds = useRef(beverageIds)
  const beverageIdsDiff = beverageIds.length - previousBeverageIds.current.length
  const newBeverage = useSelector(state => selectBeverage(state, findUniqueInArrays(beverageIds, previousBeverageIds.current)[0]))

  const setToastFeedback = useCallback(message => {
    const toastTimeoutDuration = 2 * 1000 // 2 seconds
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, toastTimeoutDuration)
  }, [])

  useEffect(() => {
    if (beverageIdsDiff > 0) {
      setToastFeedback(`Added ${newBeverage.title || newBeverage.name}`)
    } else if (beverageIdsDiff < 0) {
      setToastFeedback('Archived Beverage')
    }

    if (!beverageIds.length) {
      setComponents(<p className='empty-list'>Nothing here...</p>)
    } else {
      setComponents(beverageIds.map(id => (
        <Beverage
          className='beverage-container'
          key={ id }
          beverageId={ id }
        />
      )))
    }

    previousBeverageIds.current = beverageIds
  }, [beverageIds, beverageIdsDiff, newBeverage, setToastFeedback])

  return (
    <div className='beverage-list'>
      { toast && <Toast message={ toast } /> }
      { components }
    </div>
  )
}


export default React.memo(BeverageList)
