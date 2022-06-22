import React, { useEffect, useState, useCallback } from 'react'

import { getAuthoredBeverages, getPreviousBeverages, getBeveragesByQuery } from '../../../services/Beverage/Beverage'

import DropDown from '../../../components/Common/DropDown/DropDown'
import BeverageCategory from '../../../components/BeverageCategory/BeverageCategory'
import SearchBar from '../../../components/Common/SearchBar/SearchBar'
import Beverage from '../../../components/Beverage/Beverage'
import FormError from '../../../components/Common/Form/FormError/FormError'

import './Beverages.css'


function Beverages() {
  const [ pageNum, setPageNum ] = useState(0)
  const [ pageCount, setPageCount ] = useState(10)
  const [ selectedPage, setSelectedPage ] = useState('authored')
  const [ searchType, setSearchType ] = useState(null)
  const [ searchLabel, setSearchLabel ] = useState('Search...')
  const [ searchError, setSearchError ] = useState(null)
  const [ components, setComponents ] = useState([])

  const buildComponents = beverages => {
    return beverages.map(beverage => {
      return (
        <Beverage
          className='beverage-container'
          key={ beverage._id }
          beverage={ beverage }
        />
      )
    })
  }

  const setListComponents = useCallback(
    async beverageList => {
      const { beverages, errors } = await beverageList
      // TODO: decide what to do with errors at this point
      if (beverages.length) {
        setComponents(buildComponents(beverages))
      }
      console.log(beverages)
    }, []
  )

  useEffect(() => {
    if (selectedPage === 'authored') {
      setSearchLabel('Search authored by user')
      setListComponents(getAuthoredBeverages(pageNum, pageCount))
    } else if (selectedPage === 'previous') {
      setSearchLabel('Search previously used')
      setListComponents(getPreviousBeverages(pageNum, pageCount))
    } else if (selectedPage === 'search') {
      // TODO: write search logic
      setSearchLabel('name, source, or style')
    } else {
      throw new Error(`Unknown beverage category: ${selectedPage}`)
    }
  }, [selectedPage, pageNum, pageCount, setListComponents])

  const handleSearchOnSubmit = async value => {
    console.log('bevs handle submit', value, searchType)
    let errors = {}
    if (!value.length) {
      errors = { value: 'Please enter a search term' }
    }

    if (!searchType) {
      errors = { ...errors, type: 'Please select a query type' }
    }

    if (Object.keys(errors).length) {
      setSearchError(errors)
    } else {
      setSearchError(null)
      setListComponents(getBeveragesByQuery(searchType, value, pageNum, pageCount))
    }
  }

  const handleSearchOnSelect = selectionName => {
    setSearchLabel(`Search by ${selectionName}`)
    setSearchType(selectionName)
  }

  const handleSelectCategory = page => {
    setSelectedPage(page)
  }

  return (
    <main className="route Beverages">
      <BeverageCategory handleSelectCategory= { handleSelectCategory } />
      <div className='search-container'>
        {
          selectedPage === 'search'
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
      { components }
    </main>
  )
}

export default Beverages
