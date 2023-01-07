import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectImage } from '../../../services/image/store/image.selector'
import { getImageAsBase64 } from '../../../services/image/store/image.thunk'

import defaultImage from '../../../assets/images/hops-and-grains_1280x640.png'

import './Image.css'


function Image({ imageURL, alt, customClass }) {
  const defaultImageAlt = 'hops and grains'
  const [ imageAlt, setImageAlt ] = useState(defaultImageAlt)
  const [ base64Image, setbase64Image ] = useState(defaultImage)
  const image = useSelector(state => selectImage(state, imageURL))
  const dispatch = useDispatch()

  useEffect(() => {
    if (imageURL) {
      async function getAsyncImage() {
        setImageAlt(alt || imageURL)
        if (image) {
          setbase64Image(image)
        } else {
          const getImageAsBase64Thunk = getImageAsBase64(imageURL)
          dispatch(getImageAsBase64Thunk)
        }
      }
      getAsyncImage()
    }
  }, [imageURL, alt, image, dispatch])

  const handleImageError = error => {
    console.log('image not found', error.target.src)
    setImageAlt(defaultImageAlt)
    setbase64Image(defaultImage)
  }

  return (
    <img
      className={ `image ${customClass}` }
      src={ base64Image }
      alt={ imageAlt }
      onError={ handleImageError }
    />
  )
}


export default React.memo(Image)
