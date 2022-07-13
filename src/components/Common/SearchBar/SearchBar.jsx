import React, { useEffect, useState } from 'react'

import Button    from '../Button/Button'
import FormInput from '../Form/Input/Input'

import './SearchBar.css'


function SearchBar({ label, handleOnSubmit }) {
  const [ config, setConfig ] = useState({
    name: 'search',
    value: '',
    type: 'text',
    label: label || 'Search...'
  })

  const handleOnChange = (_, value) => {
    setConfig(prevProps => ({ ...prevProps, value }))
  }

  const handleSubmit = event => {
    event.stopPropagation()
    const { type, key } = event
    if (type === 'click' || (type === 'keydown' && key.toLowerCase() === 'enter')) {
      handleOnSubmit(config.value)
    }
  }

  useEffect(() => {
    setConfig(prevProps => ({ ...prevProps, label }))
  }, [label])

  return (
    <div
      className='search-bar'
      onKeyDown={ handleSubmit }
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
        onClick={ handleSubmit }
      />
    </div>
  )
}


export default SearchBar
