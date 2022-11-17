import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectBeverageIds, selectBeverageQuery } from '../../../services/beverage/store/beverage.slice'

import Beverage from '../../BeverageComponents/Beverage/Beverage'

import shallowCompare from '../../../shared/utilities/shallow-compare'

import './BeverageList.css'


function BeverageList({ listConfig }) {
  const [ components, setComponents ] = useState([])
  
  const { searchType, searchTerm } = listConfig
  const selector = (searchType && searchTerm)
    ? state => selectBeverageQuery(state, searchType, searchTerm)
    : selectBeverageIds
  const beverageIds = useSelector(selector, shallowCompare)

  useEffect(() => {
    if (!beverageIds?.length) {
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
  }, [beverageIds])

  return (
    <div className='beverage-list'>
      { components }
    </div>
  )
}


export default React.memo(BeverageList)
