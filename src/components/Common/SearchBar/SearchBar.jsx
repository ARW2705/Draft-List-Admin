import React, { useEffect, useState } from 'react'

import Button from '../Button/Button'
import FormInput from '../Form/Input/Input'

import './SearchBar.css'


function SearchBar({ label, handleOnSubmit }) {
  const [ config, setConfig ] = useState({
    name: 'search',
    value: '',
    type: 'text',
    label: label || 'Search...'
  })

  const handleOnChange = (name, value) => {
    setConfig(prevProps => ({ ...prevProps, value }))
  }

  const handleSubmit = event => {
    const { type, target, key } = event
    if (
      (type === 'click' && target.name === 'search-button')
      || (type === 'keydown' && key.toLowerCase() === 'enter')
    ) {
      handleOnSubmit(config.value)
    }
  }

  useEffect(() => {
    setConfig(prevProps => {
      return { ...prevProps, label}
    })
  }, [label])

  return (
    <section
      className='SearchBar'
      onClick={ handleSubmit }
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
      />
    </section>
  )
}


export default SearchBar
