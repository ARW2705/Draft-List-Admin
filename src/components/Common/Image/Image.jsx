import React, { useEffect, useState } from 'react'

import { getImage } from '../../../services/Image/Image'

import defaultImage from '../../../assets/images/hops-and-grains_1280x640.png'

import './Image.css'


function Image({ imageURL, alt, customClass }) {
  const defaultImageAlt = 'hops and grains'
  const [ imageAlt, setImageAlt ] = useState(defaultImageAlt)
  const [ fullImageURL, setFullImageURL ] = useState(defaultImage)

  useEffect(() => {
    if (imageURL) {
      async function getAsyncImage() {
        setImageAlt(alt || imageURL)
        setFullImageURL(await getImage(imageURL))
      }
      getAsyncImage()
    }
  }, [imageURL, alt])

  const handleImageError = error => {
    console.log('image not found', error.target.src)
    setImageAlt(defaultImageAlt)
    setFullImageURL(defaultImage)
  }

  return (
    <img
      className={ `image ${customClass}` }
      src={ fullImageURL }
      alt={ imageAlt }
      onError={ handleImageError }
    />
  )
}


export default React.memo(Image)
