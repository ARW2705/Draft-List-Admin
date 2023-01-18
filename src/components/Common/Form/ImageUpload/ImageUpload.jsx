import React, { useState } from 'react'

import FileInput   from '../FileInput/FileInput'
import ImageEditor from '../../ImageEditor/ImageEditor'

import './ImageUpload.css'


function ImageUpload({ config, handleOnChange, customClass }) {
  const [ image, setImage ] = useState(null)

  const handleOnImageCrop = image => handleOnChange(config.name, image)
  const handleChange = (_, value) => setImage(value)

  return (
    <div className='form-image-upload-container'>
      <ImageEditor
        image={ image }
        onImageCrop={ handleOnImageCrop }
      />
      <FileInput
        config={ config }
        handleOnChange={ handleChange }
        customClass={ customClass }
      />
    </div>
  )
}


export default React.memo(ImageUpload)
