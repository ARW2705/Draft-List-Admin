import React from 'react'

import Button from '../../Button/Button'

import './FormButtons.css'


function FormButtons({ isDisabled = false, customClass = '', onClick: handleOnClick }) {
  return (
    <div className={`form-button-container ${customClass}`}>
      <Button
        text='Cancel'
        customClass='form-button'
        name='cancel-button'
        onClick={ () => handleOnClick('cancel') }
      />
      <Button
        text='Submit'
        customClass='form-button'
        isDisabled={ isDisabled }
        name='submit-button'
        onClick={ () => handleOnClick('submit') }
      />
    </div>
  )
}


export default React.memo(FormButtons)
