import React, { useEffect, useState } from 'react'

import ImagePreview from '../ImagePreview/ImagePreview'
import ImageCrop from '../ImageCrop/ImageCrop'

import 'react-image-crop/dist/ReactCrop.css'
import './ImageEditor.css'


function ImageEditor({ image }) {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    setPreview(null)
  }, [image])

  const resetCrop = () => {
    setPreview(null)
  }

  const showCropPreview = (image64, crop) => {
    const canvas = document.createElement('canvas')
    const scaleX = image64.naturalWidth / image64.width
    const scaleY = image64.naturalHeight / image64.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      image64,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
    setPreview(canvas.toDataURL('image/webp', 1))
  }

  return (
    <>
    {
      image
      && (
        <section className='image-editor'>
          {
            !preview
            && (
              <ImageCrop
                image={ image }
                showCropPreview={ showCropPreview }
              />
            )
          }
          {
            preview
            && (
              <ImagePreview
                preview={ preview }
                resetCrop={ resetCrop }
              />
            )
          }
        </section>
      )
    }
    </>
  )
}


export default ImageEditor
