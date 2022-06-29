import React from 'react'

import Button from '../Button/Button'

import './ImagePreview.css'


function ImagePreview({ preview, resetCrop }) {
  const handleClick = event => {
    event.preventDefault()
    const { target } = event
    if (target.name === 'revert-crop') {
      resetCrop()
    }
  }

  return (
    <div
      className='image-preview'
      onClick={ handleClick }
    >
      <Button
        text='Revert Crop'
        name='revert-crop'
        customClass='crop-button'
        isDisabled={ false }
      />
      <div>
        <img
          className='crop-preview'
          src={ preview }
          alt='crop preview'
        />
      </div>
    </div>
  )
}


export default React.memo(ImagePreview)
