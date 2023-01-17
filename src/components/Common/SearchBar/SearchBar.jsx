import React, { useEffect, useState } from 'react'

import Button    from '../Button/Button'
import FormInput from '../Form/Input/Input'

import './SearchBar.css'


function SearchBar({ handleOnSubmit, label = 'Search...', customClass = '' }) {
  const defaultConfig = {
    label,
    name: 'search',
    value: '',
    type: 'text'
  }
  const [ config, setConfig ] = useState(defaultConfig)
  const [ showResetButton, setShowResetButton ] = useState(false)

  const handleOnChange = (_, value) => {
    setConfig(prevProps => ({ ...prevProps, value }))
  }

  const handleKeyPress = event => {
    if (event.key.toLowerCase() === 'enter') {
      event.preventDefault()
      event.stopPropagation()
      setShowResetButton(true)
      handleOnSubmit(config.value)
    }
  }

  const handleResetClick = () => {
    setShowResetButton(false)
    setConfig(defaultConfig)
    handleOnSubmit(null)
  }

  const handleSearchClick = () => {
    setShowResetButton(true)
    handleOnSubmit(config.value)
  }

  useEffect(() => {
    setConfig(prevProps => ({ ...prevProps, label }))
  }, [label])

  return (
    <div
      className={ `search-bar ${customClass}` }
      onKeyDown={ handleKeyPress }
    >
      <FormInput
        config={ config }
        handleOnChange={ handleOnChange }
        value={ config.value }
        customClass='search-input'
      />
      {
        showResetButton
        && (
          <Button
            text='Reset'
            isIcon={ true }
            isDisabled={ false }
            customClass='reset-button'
            name='reset-button'
            onClick={ handleResetClick }
          />
        )
      }
      <Button
        text='Search'
        isIcon={ true }
        isDisabled={ false }
        customClass='search-button'
        name='search-button'
        onClick={ handleSearchClick }
      />
    </div>
  )
}


export default React.memo(SearchBar)
