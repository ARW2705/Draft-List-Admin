import React, { useEffect, useRef, useState } from 'react'

import { useMediaQuery } from '../../../shared/hooks/media-query/media-query-hook'

import ImageCrop    from '../ImageCrop/ImageCrop'
import ImagePreview from '../ImagePreview/ImagePreview'

import 'react-image-crop/dist/ReactCrop.css'
import './ImageEditor.css'


function ImageEditor({ image, onImageCrop }) {
  const [ preview, setPreview ] = useState(null)
  const previewRef = useRef()
  const cropRef = useRef()
  const isExtraSmallScreen = useMediaQuery('xs')

  useEffect(() => {
    let targetRef = null
    if (previewRef.current) targetRef = previewRef
    if (cropRef.current) targetRef = cropRef

    if (targetRef) {
      const headerOffset = window.innerHeight * (isExtraSmallScreen ? 0.08 : 0.1)
      setTimeout(() => {
        document.querySelector('#app-root')
          .scrollTo({
            behavior: 'smooth',
            top: targetRef.current.offsetTop - headerOffset
          })
      }, 100)
    }
  }, [image, preview, previewRef, cropRef, isExtraSmallScreen])

  const resetCrop = () => setPreview(null)
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

    const croppedImage = canvas.toDataURL('image/webp', 1)
    setPreview(croppedImage)
    onImageCrop(croppedImage)
  }

  if (!image) return <></>

  return (
    <div className='image-editor'>
      {
        preview
        ? (
          <ImagePreview
            containerRef={ previewRef }
            preview={ preview }
            resetCrop={ resetCrop }
          />
        )
        : (
          <ImageCrop
            containerRef={ cropRef }
            image={ image }
            showCropPreview={ showCropPreview }
          />
        )
      }
    </div>
  )
}


export default ImageEditor
