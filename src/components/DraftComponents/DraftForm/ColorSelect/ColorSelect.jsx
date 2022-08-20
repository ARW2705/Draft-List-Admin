import React, { useState } from 'react'

import FormInput from '../../../Common/Form/Input/Input'

import { pattern } from '../../../../shared/validators/validators'

import './ColorSelect.css'


function ColorSelect({ onSelect: handleOnSelect, beverageSRM }) {
  const [ config, setConfig ] = useState({
    name: 'color-select',
    label: 'Add Custom Color',
    value: beverageSRM || ''
  })

  const validators = [pattern(/^#([\da-f]{3}){1,2}$/)]
  
  const handleSelect = (name, value, errors) => {
    setConfig(prevProps => ({ ...prevProps, value }))
    if (!Object.keys(errors).length) handleOnSelect(value)
  }

  return (
    <div className='color-select'>
      <FormInput
        config={ config }
        validators={ validators }
        handleOnChange={ handleSelect }
        customClass='color-select'
      />
    </div>
  )
}


export default React.memo(ColorSelect)
