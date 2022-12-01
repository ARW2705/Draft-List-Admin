import React, { useRef, useState } from 'react'

import FormInput from '../Form/Input/Input'
import FormButtons from '../Form/FormButtons/FormButtons'

import './Quantity.css'


function Quantity({ data, dismiss }) {
  const { quantity: currentQuantity, customData } = data
  const [ config, setConfig ] = useState({
    name: 'new-quantity',
    type: 'number',
    label: `${customData ? 'Change' : 'Reduce'} Quantity in Ounces`,
    value: '',
    min: 0,
    max: currentQuantity
  })
  const reduceQuantityAmount = useRef(0)

  const handleOnChange = (_, value) => {
    let setValue = parseFloat(value)
    setValue = setValue >= 0 ? setValue : 0
    reduceQuantityAmount.current = setValue
    setConfig(prevProps => ({ ...prevProps, value: setValue }))
  }

  const handleOnClick = action => {
    let data = null
    if (action === 'submit') {
      data = { quantity: currentQuantity - reduceQuantityAmount.current }
    }
  
    dismiss(data)
  }

  return (
    <div className='quantity'>
      <h1 className='current-quantity'>
        Current Quantity <span>{ currentQuantity } oz</span>
      </h1>
      <FormInput
        config={ config }
        value={ config.value }
        customClass='new-quantity-input'
        handleOnChange={ handleOnChange }
      />
      <FormButtons
        isDisabled={ false }
        customClass='quantity-buttons'
        onClick={ handleOnClick }
      />
    </div>
  )
}


export default Quantity
