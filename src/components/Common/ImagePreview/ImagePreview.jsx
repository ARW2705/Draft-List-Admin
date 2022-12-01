import React from 'react'

import Button from '../Button/Button'

import './ImagePreview.css'


function ImagePreview({ preview, resetCrop }) {
  const handleClick = () => {
    resetCrop()
  }

  return (
    <div className='image-preview'>
      <Button
        text='Revert Crop'
        name='revert-crop'
        customClass='crop-button'
        isDisabled={ false }
        onClick={ handleClick }
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
