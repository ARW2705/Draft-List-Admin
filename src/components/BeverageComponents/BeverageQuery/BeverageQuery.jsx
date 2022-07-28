import React, { useEffect, useState } from 'react'

import BeverageCategory from '../../../components/BeverageComponents/BeverageCategory/BeverageCategory'
import DropDown         from '../../../components/Common/DropDown/DropDown'
import SearchBar        from '../../../components/Common/SearchBar/SearchBar'
import FormError        from '../../../components/Common/Form/FormError/FormError'

import './BeverageQuery.css'


function BeverageQuery({ onConfigUpdate }) {
  const defaultSearchLabel = 'Search...'

  const [ searchLabel, setSearchLabel ] = useState(defaultSearchLabel)
  const [ searchError, setSearchError ] = useState(null)
  const [ searchClass, setSearchClass ] = useState('')
  const [ listConfig, setListConfig ] = useState({
    listType: 'authored',
    pageNum: 0,
    pageCount: 25,
    searchType: '',
    searchTerm: ''
  })

  useEffect(() => {
    onConfigUpdate(listConfig)
    setSearchClass(listConfig.listType === 'search' ? 'shrink-to-dropdown' : '')
  }, [onConfigUpdate, listConfig])

  const handleSearchOnSubmit = async searchTerm => {
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

  const handleSelectCategory = listType => {
    setSearchLabel(defaultSearchLabel)
    setListConfig(prevProps => ({ ...prevProps, listType }))
  }

  return(
    <div className='beverage-query'>
      <BeverageCategory handleSelectCategory={ handleSelectCategory } />
      <div className='search-container'>
        {
          listConfig.listType === 'search'
          && (
            <DropDown
              customClass='search-by-menu'
              title='Search By'
              items={ ['Name', 'Source', 'Style'] }
              handleOnSelect={ handleSearchOnSelect }
            />
          )
        }
        <SearchBar
          handleOnSubmit={ handleSearchOnSubmit }
          label={ searchLabel }
          customClass={ searchClass }
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
