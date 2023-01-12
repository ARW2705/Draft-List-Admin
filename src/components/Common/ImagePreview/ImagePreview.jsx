import React from 'react'

import Button from '../Button/Button'

import './ImagePreview.css'


function ImagePreview({ preview, resetCrop }) {
  return (
    <div className='image-preview-container'>
      <div className='image-preview'>
        <img
          src={ preview }
          alt='crop preview'
        />
      </div>
      <Button
        text='Revert Crop'
        name='revert-crop'
        customClass='revert-button'
        isDisabled={ false }
        onClick={ resetCrop }
      />
    </div>
  )
}


export default React.memo(ImagePreview)
