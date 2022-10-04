import React, { useEffect, useState } from 'react'

import DropDown  from '../../../components/Common/DropDown/DropDown'
import SearchBar from '../../../components/Common/SearchBar/SearchBar'
import FormError from '../../../components/Common/Form/FormError/FormError'

import './BeverageQuery.css'


function BeverageQuery({ onConfigUpdate }) {
  const defaultSearchLabel = 'Search...'
  const defaultConfig = {
    pageNum: 0,
    pageCount: 25,
    searchType: '',
    searchTerm: ''
  }

  const [ searchLabel, setSearchLabel ] = useState(defaultSearchLabel)
  const [ searchError, setSearchError ] = useState(null)
  const [ listConfig, setListConfig ] = useState(defaultConfig)

  useEffect(() => {
    onConfigUpdate(listConfig)
  }, [onConfigUpdate, listConfig])

  const handleSearchOnSubmit = searchTerm => {
    if (searchTerm === null) {
      setSearchError(null)
      setListConfig(defaultConfig)
      return
    }

    let errors = {}
    if (!searchTerm.length) {
      errors = { searchTerm: 'Please enter a search term' }
    }

    if (!listConfig.searchType.length) {
      errors = { ...errors, type: 'Please select a query type' }
    }

    if (Object.keys(errors).length) {
      setSearchError(errors)
    } else {
      setSearchError(null)
      setListConfig(prevProps => ({ ...prevProps, searchTerm }))
    }
  }

  const handleSearchOnSelect = searchType => {
    setSearchLabel(searchType)
    setListConfig(prevProps => ({ ...prevProps, searchType }))
  }

  return(
    <div className='beverage-query'>
      <div className='search-container'>
        <DropDown
          customClass='search-by-menu'
          title='Search By'
          items={ ['Name', 'Source', 'Style'] }
          onSelect={ handleSearchOnSelect }
        />
        <SearchBar
          handleOnSubmit={ handleSearchOnSubmit }
          label={ searchLabel }
          customClass='shrink-to-dropdown'
        />
        {
          searchError
          && (
            <FormError
              customClass='search-bar-error'
              name='search'
              errors={ searchError }
            />
          )
        }
      </div>
    </div>
  )
}


export default React.memo(BeverageQuery)
