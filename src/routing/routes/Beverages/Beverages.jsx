import React, { useEffect, useState, useCallback } from 'react'

import { getAuthoredBeverages, getPreviousBeverages } from '../../../services/Beverage/Beverage'

import BeverageCategory from '../../../components/BeverageCategory/BeverageCategory'
import SearchBar from '../../../components/Common/SearchBar/SearchBar'
import DropDown from '../../../components/Common/DropDown/DropDown'
import Beverage from '../../../components/Beverage/Beverage'

import './Beverages.css'


function Beverages() {
  const [ authoredListPage, setAuthoredListPage ] = useState(0)
  const [ previousListPage, setPreviousListPage ] = useState(0)
  const [ pageCount, setPageCount ] = useState(25)
  const [ selectedPage, setSelectedPage ] = useState('authored')
  const [ searchLabel, setSearchLabel ] = useState('Search...')
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
      setListComponents(getAuthoredBeverages(authoredListPage, pageCount))
    } else if (selectedPage === 'previous') {
      setSearchLabel('Search previously used')
      setListComponents(getPreviousBeverages(previousListPage, pageCount))
    } else if (selectedPage === 'search') {
      // TODO: write search logic
      setSearchLabel('Search by name, source, or style')
    } else {
      throw new Error(`Unknown beverage category: ${selectedPage}`)
    }
  }, [selectedPage, authoredListPage, previousListPage, pageCount, setListComponents])

  const handleSearchOnSubmit = () => {
    console.log('bevs handle submit')
  }

  const handleSearchOnSelect = selectionName => {
    console.log('bevs handle select', selectionName)
    setSearchLabel(`Search by ${selectionName}`)
  }

  const handleSelectCategory = page => {
    console.log('bevs handle select', page)
    setSelectedPage(page)
  }

  return (
    <main className='route Beverages'>
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
      </div>
      { components }
    </main>
  )
}


export default Beverages
