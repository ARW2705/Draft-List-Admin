import React, { useCallback, useEffect, useState } from 'react'

import SearchBar  from '../../../Common/SearchBar/SearchBar'
import SimpleView from '../../../Common/SimpleView/SimpleView'
import Spinner    from '../../../Common/Loaders/Spinner/Spinner'

import { getBeverageById, getPreviousBeverages, getBeveragesByQuery } from '../../../../services/Beverage/Beverage'

import './BeverageSelect.css'


function BeverageSelect({ onSelect: handleOnSelect }) {
  const [ searchResult, setSearchResult ] = useState(null)
  const [ previousBeverages, setPreviousBeverages ] = useState(null)

  const handleClick = useCallback(async (_, { _id }) => {
    handleOnSelect(await getBeverageById(_id))
  }, [handleOnSelect])

  const buildPreviousList = useCallback(beverageList => {
    if (!beverageList.length) return <div>No previously used beverages...</div>

    return (
      <div className='previous-beverage-list-container'>
        {
          beverageList.map(beverage => (
            <SimpleView
              key={ beverage._id }
              onClick={ handleClick }
              keysToDisplay={ [beverage.title ? 'title' : 'name', 'source', 'style'] }
              data={ beverage }
              customClass='beverage-view'
            />
          ))
        }
      </div>
    )
  }, [handleClick])

  const handleSearchOnSubmit = async searchTerm => {
    const { beverages, errors } = await getBeveragesByQuery('name', searchTerm, 0, 1)
    const beverage = beverages[0]
    setSearchResult(
      beverages.length
      ? <SimpleView
          onClick={ handleClick }
          keysToDisplay={ [beverage.title ? 'title' : 'name', 'source', 'style'] }
          data={ beverage }
          customClass='beverage-view'
        />
      : <div>{ `'${searchTerm}' not found` }</div>
    )
  }

  useEffect(() => {
    async function getRecentBeverages() {
      const { beverages, errors } = await getPreviousBeverages(0, 5)
      console.log('got previous', beverages)
      setPreviousBeverages(buildPreviousList(beverages))
    }
    getRecentBeverages()
  }, [buildPreviousList])

  return (
    <div className='beverage-selection-container'>
      <SearchBar
        handleOnSubmit={ handleSearchOnSubmit }
        label='Beverage Name'
      />
      { searchResult ?? <></> }
      <div className='most-recent-list-container'>
        { previousBeverages ?? <Spinner /> }
      </div>
    </div>
  )
}


export default React.memo(BeverageSelect)
