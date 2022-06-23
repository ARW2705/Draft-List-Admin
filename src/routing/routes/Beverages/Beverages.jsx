import React, { useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import BeverageCategory from '../../../components/BeverageComponents/BeverageCategory/BeverageCategory'
import BeverageList     from '../../../components/BeverageComponents/BeverageList/BeverageList'
import DropDown         from '../../../components/Common/DropDown/DropDown'
import FormError        from '../../../components/Common/Form/FormError/FormError'
import SearchBar        from '../../../components/Common/SearchBar/SearchBar'
import BeverageForm     from '../../../components/Forms/Beverage/Beverage'

import './Beverages.css'


function Beverages() {
  const [ searchLabel, setSearchLabel ] = useState('Search...')
  const [ searchError, setSearchError ] = useState(null)
  const [ listConfig, setListConfig ] = useState({
    listType: 'authored',
    pageNum: 0,
    pageCount: 25,
    searchType: '',
    searchTerm: ''
  })

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
    setListConfig(prevProps => ({ ...prevProps, listType }))
  }

  return (
    <main className="route Beverages">
      <Routes>
        <Route
          path='/'
          element={
            <>
              <BeverageCategory handleSelectCategory= { handleSelectCategory } />
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
              <BeverageList listConfig={ listConfig } />
            </>
          }
        />
        <Route path='/form' element={ <BeverageForm /> } />
      </Routes>
    </main>
  )
}

export default Beverages
