import React, { useEffect, useState } from 'react'

import Button from '../../Common/Button/Button'
import Locale from '../../Locale/Locale'
import Divider from '../../Common/Divider/Divider'
import Image from '../../Common/Image/Image'

import './Device.css'


function Device({ device, onClick: handleOnClick }) {
  const { name, title, imageURL, locale, draftList } = device
  const [ activeDraftCount, setActiveDraftCount ] = useState(null)

  useEffect(() => {
    setActiveDraftCount(draftList.reduce((acc, curr) => acc + curr.isActive ? 1 : 0, 0))
  }, [draftList])

  return (
    <article className='device'>
      <Image
        imageURL={ imageURL }
        alt='device logo'
        customClass='device-image'
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
            isFlat={ true }
          />
          <Divider color='secondary-dark' />
          <Button
            text={ `${activeDraftCount} Active Drafts`}
            customClass='draft-count-button'
            ariaLabel='nav to drafts by device'
            onClick={ () => handleOnClick('draft', device) }
            isFlat={ true }
          />
        </div>
      </div>
    </article>
  )
}


export default React.memo(Device)
