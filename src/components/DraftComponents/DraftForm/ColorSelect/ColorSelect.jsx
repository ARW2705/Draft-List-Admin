import React, { useState } from 'react'
import { SliderPicker } from 'react-color'

import FormInput from '../../../Common/Form/Input/Input'

import { pattern } from '../../../../shared/validators/validators'

import './ColorSelect.css'


function ColorSelect({ onSelect: handleOnSelect, beverageSRM }) {
  const [ config, setConfig ] = useState({
    name: 'color-select',
    label: 'Add Custom Color',
    value: beverageSRM || ''
  })

  const handleSelect = (_, value, errors) => {
    if (!Object.keys(errors).length) {
      setConfig(prevProps => ({ ...prevProps, value }))
      handleOnSelect(value)
    }
  }

  return (
    <div className='color-select-container'>
      <FormInput
        config={ config }
        validators={ [pattern(/^#([\da-fA-F]{3}){1,2}$/)] }
        handleOnChange={ handleSelect }
      />
      <SliderPicker
        color={ config.value }
        onChangeComplete={ ({ hex }) => handleSelect(null, hex, {}) }
      />
    </div>
  )
}


export default React.memo(ColorSelect)
