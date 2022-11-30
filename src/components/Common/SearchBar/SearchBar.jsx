import React, { useEffect, useState } from 'react'

import Button    from '../Button/Button'
import FormInput from '../Form/Input/Input'

import './SearchBar.css'


function SearchBar({ label, handleOnSubmit, customClass }) {
  const defaultConfig = {
    name: 'search',
    value: '',
    type: 'text',
    label: label || 'Search...'
  }
  const [ config, setConfig ] = useState(defaultConfig)
  const [ showResetButton, setShowResetButton ] = useState(false)

  const handleOnChange = (_, value) => {
    setConfig(prevProps => ({ ...prevProps, value }))
  }

  const handleKeyPress = event => {
    event.stopPropagation()
    if (event.key.toLowerCase() === 'enter') {
      handleOnSubmit(config.value)
    }
  }

  const handleOnClick = ({ name }) => {
    if (name === 'search-button') {
      setShowResetButton(true)
      handleOnSubmit(config.value)
    } else if (name === 'reset-button') {
      setShowResetButton(false)
      setConfig(defaultConfig)
      handleOnSubmit(null)
    }
  }

  useEffect(() => {
    setConfig(prevProps => ({ ...prevProps, label }))
  }, [label])

  return (
    <div
      className={ `search-bar ${ customClass || '' }` }
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
            text='reset'
            isIcon={ true }
            isDisabled={ false }
            customClass='reset-button'
            name='reset-button'
            onClick={ handleOnClick }
          />
        )
      }
      <Button
        text='Search'
        isIcon={ true }
        isDisabled={ false }
        customClass='search-button'
        name='search-button'
        onClick={ handleOnClick }
      />
    </div>
  )
}


export default SearchBar
