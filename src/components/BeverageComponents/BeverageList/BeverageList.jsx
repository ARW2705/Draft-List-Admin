import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { getBeverageList, getBeveragesByQuery } from '../../../services/Beverage/Beverage'

import Beverage from '../../BeverageComponents/Beverage/Beverage'
import SpinnerLoader from '../../Common/Loaders/Spinner/Spinner'

import './BeverageList.css'


function BeverageList({ listConfig }) {
  const { pageNum, pageCount, searchType, searchTerm } = listConfig
  const [ components, setComponents ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = useCallback(beverage => {
    navigate(`${location.pathname}/form`, { state: { beverage }})
  }, [navigate, location.pathname])

  const buildComponents = useCallback((beverages, loadStartTime) => {
    const minLoaderTime = 250 // in ms
    setTimeout(() => {
      setIsLoading(false)
    }, Date.now() - loadStartTime + minLoaderTime)

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
    async function getList(loadStartTime, isQuery) {
      if (isQuery) {
        const { beverages, errors } = await getBeveragesByQuery(searchType, searchTerm, pageNum, pageCount)
        setComponents(buildComponents(beverages, loadStartTime))
      } else {
        const { beverages, errors } = await getBeverageList(pageNum, pageCount)
        setComponents(buildComponents(beverages, loadStartTime))
      }
    }

    if ((searchType && searchTerm) || (!searchType && !searchTerm)) {
      getList(Date.now(), searchTerm && searchType)
    }
  }, [searchType, searchTerm, pageNum, pageCount, buildComponents])

  return (
    <div className='beverage-list'>
      { isLoading ? <SpinnerLoader /> : components }
    </div>
  )
}


export default React.memo(BeverageList)
