import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { getAuthoredBeverages, getPreviousBeverages, getBeveragesByQuery } from '../../../services/Beverage/Beverage'

import Beverage from '../../BeverageComponents/Beverage/Beverage'

import { LIST_TYPE_ENUM } from '../../../shared/constants/list-type-enum'

import './BeverageList.css'


function BeverageList({ listConfig }) {
  const { listType, pageNum, pageCount, searchType, searchTerm } = listConfig
  const [ components, setComponents ] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = useCallback(beverage => {
    navigate(`${location.pathname}/form`, { state: { beverage }})
  }, [navigate, location.pathname])

  const buildComponents = useCallback(beverages => {
    if (!beverages.length) return <p className='empty-list'>Nothing here...</p>

    return beverages.map(beverage => {
      return (
        <Beverage
          className='beverage-container'
          key={ beverage._id }
          beverage={ beverage }
          onClick={ handleOnClick }
        />
      )
    })
  }, [handleOnClick])

  useEffect(() => {
    async function getQuery() {
      const { beverages, errors } = await getBeveragesByQuery(searchType, searchTerm, pageNum, pageCount)
      setComponents(buildComponents(beverages))
    }

    if (listType === LIST_TYPE_ENUM.Search && searchType && searchTerm) {
      getQuery()
    }
  }, [listType, searchType, searchTerm, pageNum, pageCount, buildComponents])

  useEffect(() => {
    async function getList() {
      if (listType === LIST_TYPE_ENUM.Search) return
      
      let getter = { beverages: [], errors: [] }
      if (listType === LIST_TYPE_ENUM.Authored) {
        getter = await getAuthoredBeverages(pageNum, pageCount)
      } else if (listType === LIST_TYPE_ENUM.Previous) {
        getter = await getPreviousBeverages(pageNum, pageCount)
      } else {
        throw new Error (`Unknown Beverage list type: ${listType}`)
      }

      const { beverages, errors } = getter
      console.log('beverage list error', errors)
      setComponents(buildComponents(beverages))
    }
    getList()
  }, [listType, pageNum, pageCount, buildComponents])

  return (
    <div className='beverage-list'>
      { components }
    </div>
  )
}


export default React.memo(BeverageList)
