import React, { useEffect, useState } from 'react'

import Button from '../../Common/Button/Button'
import Locale from '../../Locale/Locale'

import { IMAGE_BASE_URL } from '../../../shared/constants/image-base-url'

import { getImage } from '../../../services/Image/Image'

import './Device.css'


function Device({ device, onClick: handleOnClick }) {
  const { name, title, imageURL, locale, draftList } = device
  const [ fullImageURL, setFullImageURL ] = useState('')
  const [ activeDraftCount, setActiveDraftCount ] = useState(null)

  useEffect(() => {
    setActiveDraftCount(draftList.reduce((acc, curr) => acc + curr.isActive ? 1 : 0, 0))
  }, [draftList])

  useEffect(() => {
    if (imageURL) {
      async function getAsyncImage() {
        setFullImageURL(await getImage(`${IMAGE_BASE_URL}/${imageURL}`))
      }
      getAsyncImage()
    } else {
      setFullImageURL('')
    }
  }, [imageURL])

  return (
    <article className='device'>
      <img
        className='device-image'
        src={ fullImageURL }
        alt='device logo'
      />
      <div className='right-side'>
        <div className='device-identifier'>
          <span>{ title ?? name }</span>
          <Locale { ...locale } />
        </div>
        <div className='device-button-container'>
          <Button
            text='Edit Device'
            customClass='device-edit-button'
            onClick={ () => handleOnClick('edit', device) }
          />
          <Button
            text={ `Active drafts: ${activeDraftCount}`}
            customClass='draft-count-button'
            ariaLabel='nav to drafts by device'
            onClick={ () => handleOnClick('draft', device) }
          />
        </div>
      </div>
    </article>
  )
}


export default React.memo(Device)
