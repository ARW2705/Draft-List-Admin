import React from 'react'

import Button from '../../Button/Button'

import './ErrorPage.css'


function ErrorPage({ error, onDismiss: handleOnDismiss }) {
  return (
    <div className='error-container'>
      <div className='error-text'>
        <h1>{ error.publicName || error.name }</h1>
        <p>{ error.publicMessage || error.message }</p>
      </div>
      <Button
        onClick={ handleOnDismiss }
        customClass='error-button'
        text='RESET'
      />
    </div>
  )
}


export default ErrorPage
