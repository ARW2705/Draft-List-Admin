import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Spinner from '../../Common/Loaders/Spinner/Spinner'
import SearchBar from '../../Common/SearchBar/SearchBar'
import BeverageSimpleView from '../../BeverageComponents/BeverageSimpleView/BeverageSimpleView'

import { addNewDraft, updateDraft } from '../../../services/Draft/Draft'
import { getPreviousBeverages, getBeveragesByQuery } from '../../../services/Beverage/Beverage'
import createForm from '../../../shared/form/create-form'
import Button from '../../Common/Button/Button'


function DraftForm() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ previousBeverages, setPreviousBeverages ] = useState(null)
  const [ searchResult, setSearchResult ] = useState(null)
  const formData = useRef({ beverage: null, container: null })

  const navigate = useNavigate()
  const navigateBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const submitForm = useCallback(() => {
    console.log('submitting')

  }, [navigateBack])

  const buildPreviousList = useCallback(beverageList => {
    if (!beverageList.length) return <div>No previously used beverages...</div>

    return (
      <div className='previous-beverage-list-container'>
        {
          beverageList.map(beverage => (
            <BeverageSimpleView
              key={ beverage._id }
              onClick={ handleBeverageClick }
              { ...beverage }
            />
          ))
        }
      </div>
    )
  }, [])

  useEffect(() => {
    async function getRecentBeverages() {
      const { beverages, errors } = await getPreviousBeverages(0, 5)
      console.log('got previous', beverages)
      setPreviousBeverages(buildPreviousList(beverages))
    }
    getRecentBeverages()
  }, [buildPreviousList])
  
  const handleSearchOnSubmit = async searchTerm => {
    console.log('search', searchTerm)
    const { beverages, errors } = await getBeveragesByQuery('name', searchTerm, 0, 1)
    setSearchResult(
      beverages.length
      ? <BeverageSimpleView
          onClick={ handleBeverageClick }
          { ...beverages[0] }
        />
      : <div>{ `'${searchTerm}' not found` }</div>
    )
  }

  const handleBeverageClick = (_, beverageId) => {
    console.log(beverageId)
    formData.current = { ...formData.current, beverage: beverageId }
  }

  return (
    <div className='draft-form-container'>
      {
        isLoading
        && (
          <Spinner
            isBlocking={ true }
            text='Submitting'
          />
        )
      }
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
      <div className='container-selection-contaienr'>

      </div>
    </div>
  )
}


export default DraftForm
