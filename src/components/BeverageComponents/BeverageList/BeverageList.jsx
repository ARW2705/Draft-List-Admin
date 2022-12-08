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
  const selector = (searchType && searchTerm)
    ? state => selectBeverageQueryId(state, searchType, searchTerm)
    : selectActiveBeverageIds
  const beverageIds = useSelector(selector, shallowCompare)
  const previousBeverageIds = useRef(beverageIds)
  const beverageIdsDiff = beverageIds.length - previousBeverageIds.current.length
  const newBeverage = useSelector(state => selectBeverage(state, findUniqueInArrays(beverageIds, previousBeverageIds.current)[0]))

  useEffect(() => {
    if (beverageIdsDiff > 0) {
      setToast(`Added ${newBeverage.title || newBeverage.name}`)
    } else if (beverageIdsDiff < 0) {
      setToast('Archived Beverage')
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
  }, [beverageIds, beverageIdsDiff, newBeverage])

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
