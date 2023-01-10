import React, { useState } from 'react'

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

  const [ listConfig    , setListConfig     ] = useState(defaultConfig)
  const [ searchError   , setSearchError    ] = useState(null)
  const [ searchLabel   , setSearchLabel    ] = useState(defaultSearchLabel)
  const [ resetDropDown , setResetDropDown  ] = useState(0)

  const handleSearchOnSubmit = searchTerm => {
    if (searchTerm === null) {
      setSearchError(null)
      setListConfig(defaultConfig)
      onConfigUpdate(defaultConfig)
      setSearchLabel(defaultSearchLabel)
      setResetDropDown(prevProps => prevProps + 1)
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
      const updateConfig = { ...listConfig, searchTerm }
      setListConfig(updateConfig)
      onConfigUpdate(updateConfig)
    }
  }

  const handleSearchOnSelect = searchType => {
    setSearchLabel(searchType)
    setListConfig(prevProps => ({ ...prevProps, searchType: searchType.toLowerCase() }))
  }

  return(
    <div className='beverage-query'>
      <div className='search-container'>
        <DropDown
          key={ resetDropDown }
          customClass='search-by-menu'
          title='Search By'
          items={ ['Name', 'Source', 'Style'] }
          onSelect={ handleSearchOnSelect }
        />
        <SearchBar
          handleOnSubmit={ handleSearchOnSubmit }
          label={ searchLabel }
          customClass='beverage-search-bar'
        />
      </div>
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
  )
}


export default React.memo(BeverageQuery)
