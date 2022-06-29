import React, { useState } from 'react'

import FileInput from '../FileInput/FileInput'
import ImageEditor from '../../ImageEditor/ImageEditor'

import './ImageUpload.css'


function ImageUpload({ config, handleOnChange, customClass }) {
  const [image, setImage] = useState(null)
  const handleChange = (name, value) => {
    setImage(value)
    console.log('iu change', name, value)
  }

  return (
    <div className='form-input-container image-upload'>
      <FileInput
        config={ config }
        handleOnChange={ handleChange }
        customClass={ customClass }
      />
    { image && <ImageEditor image={ image }/> }
    </div>
  )
}


export default React.memo(ImageUpload)
