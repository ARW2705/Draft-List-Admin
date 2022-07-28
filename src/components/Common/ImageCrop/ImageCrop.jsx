import React, { useEffect, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'

import Button from '../Button/Button'

import './ImageCrop.css'


function ImageCrop({ image, showCropPreview }) {
  const [ imageSrc, setImageSrc ] = useState('')
  const [ crop, setCrop ] = useState(null)
  const [ completedCrop, setCompletedCrop ] = useState(null)
  const [ aspect, setAspect ] = useState(1) // TODO: decide if aspect other than 1 should be supported
  const [ image64, setImage64 ] = useState(null)

  useEffect(() => {
    setImage64(null)
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImageSrc(reader.result.toString() || '')
    })
    reader.readAsDataURL(image)
  }, [image])

  const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: mediaWidth / 2,
          height: mediaHeight / 2
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    )
  }

  const onImageLoad = ({ currentTarget }) => {
    setImage64(currentTarget)
    if (aspect) {
      const { width, height } = currentTarget
      const centeredCrop = centerAspectCrop(width, height, aspect)
      setCrop(centeredCrop)
      setCompletedCrop(centeredCrop)
    }
  }

  const handleComplete = croppedImage => setCompletedCrop(croppedImage)
  const handleChange = croppedImage => setCrop(croppedImage)
  const handleClick = () => {
    showCropPreview(image64, completedCrop)
  }

  return (
    <div className='image-crop-container'>
      <Button
        text='Crop'
        name='image-crop'
        customClass='crop-button'
        isDisabled={ false }
        onClick={ handleClick }
      />
      <ReactCrop
        crop={ crop }
        onChange={ handleChange }
        onComplete={ handleComplete }
        aspect={ aspect }
      >
        <img
          src={ imageSrc }
          alt='preview with crop'
          onLoad={ onImageLoad }
        />
      </ReactCrop>
    </div>
  )
}


export default ImageCrop
