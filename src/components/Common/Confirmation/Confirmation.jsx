import React from 'react'

import FormButtons from '../Form/FormButtons/FormButtons'

import './Confirmation.css'


function Confirmation({ data, dismiss }) {
  const { actionMessage } = data

  const handleOnClick = action => {
    let data = null
    if (action === 'submit') {
      data = { confirm: true }
    }

    dismiss(data)
  }

  return (
    <div className='confirmation-container'>
      <h1 className='confirmation-header'>
        { actionMessage || 'Please Confirm' }
      </h1>
      <FormButtons
        isDisabled={ false }
        customClass='confirmation-buttons'
        onClick={ handleOnClick }
      />
    </div>
  )
}


export default Confirmation
