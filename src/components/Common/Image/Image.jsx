import React, { useEffect, useState } from 'react'

import { getImage } from '../../../services/Image/Image'

import './Image.css'


function Image({ imageURL, alt, customClass }) {
  const [ fullImageURL, setFullImageURL ] = useState('')

  useEffect(() => {
    if (imageURL) {
      async function getAsyncImage() {
        setFullImageURL(await getImage(imageURL))
      }
      getAsyncImage()
    } else {
      setFullImageURL('')
    }
  }, [imageURL])

  return (
    <img
      className={ `image ${customClass}` }
      src={ fullImageURL }
      alt={ alt || imageURL }
    />
  )
}


export default React.memo(Image)
