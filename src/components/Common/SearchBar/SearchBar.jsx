import React, { useEffect, useState } from 'react'

import Button    from '../Button/Button'
import FormInput from '../Form/Input/Input'

import './SearchBar.css'


function SearchBar({ label, handleOnSubmit, customClass }) {
  const [ config, setConfig ] = useState({
    name: 'search',
    value: '',
    type: 'text',
    label: label || 'Search...'
  })

  const handleOnChange = (_, value) => {
    setConfig(prevProps => ({ ...prevProps, value }))
  }

  const handleKeyPress = event => {
    event.stopPropagation()
    if (event.key.toLowerCase() === 'enter') {
      handleOnSubmit(config.value)
    }
  }

  const handleOnClick = () => {
    handleOnSubmit(config.value)
  }

  useEffect(() => {
    setConfig(prevProps => ({ ...prevProps, label }))
  }, [label])

  return (
    <div
      className={ `search-bar ${ customClass }` }
      onKeyDown={ handleKeyPress }
    >
      <FormInput
        config={ config }
        handleOnChange={ handleOnChange }
        customClass='search-input'
      />
      <Button
        text='search'
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
