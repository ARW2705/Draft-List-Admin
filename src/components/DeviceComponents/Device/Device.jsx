import React, { useEffect, useState } from 'react'

import Locale from '../../Locale/Locale'

import { IMAGE_BASE_URL } from '../../../shared/constants/image-base-url'

import './Device.css'


function Device({ device, onClick: handleOnClick }) {
  const { name, title, imageURL, locale, draftList } = device
  const [ activeDraftCount, setActiveDraftCount ] = useState(null)
  const [ fullImageURL, setFullImageURL ] = useState('')
  
  useEffect(() => {
    setFullImageURL(`${IMAGE_BASE_URL}/${imageURL}`)
  }, [imageURL])
  
  useEffect(() => {
    setActiveDraftCount(draftList.reduce((acc, curr) => acc + curr.isActive ? 1 : 0, 0))
  }, [draftList])

  return (
    <article
      className='device'
      onClick={ () => handleOnClick(device) }
    >
      <img
        className='device-image'
        src={ fullImageURL }
        alt='device logo'
      />
      <div className='device-identifier'>
        <span>{ title ?? name }</span>
        <Locale { ...locale } />
      </div>
      <div className='active-draft-count'>
        Active drafts: <span>{ activeDraftCount }</span>
      </div>
    </article>
  )
}


export default React.memo(Device)
