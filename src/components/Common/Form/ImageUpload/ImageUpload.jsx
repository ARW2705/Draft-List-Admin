import React, { useState } from 'react'

import FileInput   from '../FileInput/FileInput'
import ImageEditor from '../../ImageEditor/ImageEditor'

import './ImageUpload.css'


function ImageUpload({ config, handleOnChange, customClass }) {
  const [ image, setImage ] = useState(null)
  const handleOnImageCrop = image => handleOnChange(config.name, image)
  const handleChange = (_, value) => setImage(value)

  //TODO: scroll down to show image and crop button when changing
  //from no image to image

  return (
    <div className='form-image-upload-container'>
      {
        image
        && (
          <ImageEditor
            image={ image }
            onImageCrop={ handleOnImageCrop }
          />
        )
      }
      <FileInput
        config={ config }
        handleOnChange={ handleChange }
        customClass={ customClass }
      />
    </div>
  )
}


export default React.memo(ImageUpload)
