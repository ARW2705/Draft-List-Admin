import React, { useCallback, useEffect, useRef, useState } from 'react'

import Button     from '../../../Common/Button/Button'
import SearchBar  from '../../../Common/SearchBar/SearchBar'
import SimpleView from '../../../Common/SimpleView/SimpleView'
import Spinner    from '../../../Common/Loaders/Spinner/Spinner'

import { getBeverageById, getBeverageList, getBeveragesByQuery } from '../../../../services/Beverage/Beverage'
import toTitleCase from '../../../../shared/utilities/title-case'

import './BeverageSelect.css'


function BeverageSelect({ onSelect: handleOnSelect }) {
  const initialBuild = useRef(true)
  const [ searchResult, setSearchResult ] = useState(null)
  const [ previousBeverages, setPreviousBeverages ] = useState(null)

  const handleClick = useCallback(async _id => {
    handleOnSelect(await getBeverageById(_id))
  }, [handleOnSelect])

  const buildPreviousList = useCallback(beverageList => {
    if (!beverageList.length) return <div>No previously used beverages...</div>

    return (
      <ul className='previous-beverage-list'>
        {
          beverageList.map((beverage, index) => (
            <li
              key={ index }
              className='beverage-list-item'
            >
              <Button
                content={
                  <>
                    <span>{ toTitleCase(beverage.title || beverage.name) }</span>
                    <span>{ toTitleCase(beverage.source) }</span>
                    <span>{ toTitleCase(beverage.style) }</span>
                  </>
                }
                onClick ={ () => handleClick(beverage._id) }
                customClass='list-button'
                name='select beverage button'
                ariaLabel='select beverage'
                isFlat={ true }
              />
            </li>
          ))
        }
      </ul>
    )
  }, [handleClick])

  const handleSearchOnSubmit = async searchTerm => {
    let result = <></>
    if (searchTerm !== null) {
      const { beverages } = await getBeveragesByQuery('name', searchTerm, 0, 1)
      const beverage = beverages[0]
      if (beverage) {
        result = (
          <SimpleView
            keysToDisplay={ [beverage.title ? 'title' : 'name', 'source', 'style'] }
            data={ beverage }
            customClass='beverage-view'
          />
        )
        handleOnSelect(beverage)
      } else {
        result = <div>{ `'${searchTerm}' not found` }</div>
      }
    }

    setSearchResult(result)
  }

  useEffect(() => {
    async function getRecentBeverages() {
      const { beverages } = await getBeverageList(0, 5)
      console.log('got previous', beverages)
      setPreviousBeverages(buildPreviousList(beverages))
    }
    
    if (initialBuild.current) {
      getRecentBeverages()
      initialBuild.current = false
    }
  }, [buildPreviousList])

  return (
    <div className='beverage-selection'>
      <h2>Select a Beverage</h2>
      <SearchBar
        handleOnSubmit={ handleSearchOnSubmit }
        label='Beverage Name'
      />
      { searchResult ?? <></> }
      <div className='most-recent-list'>
        <h3>Most Recent Beverages</h3>
        { previousBeverages ?? <Spinner /> }
      </div>
    </div>
  )
}


export default React.memo(BeverageSelect)
