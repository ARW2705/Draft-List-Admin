import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectDevice } from '../../../services/device/store/device.selector'

import Button  from '../../Common/Button/Button'
import Divider from '../../Common/Divider/Divider'
import Image   from '../../Common/Image/Image'
import Locale  from '../../Locale/Locale'

import './Device.css'


function Device({ deviceId }) {
  const device = useSelector(state => selectDevice(state, deviceId))
  const { name, title, imageURL, locale, draftList } = device
  const [ activeDraftCount, setActiveDraftCount ] = useState(null)

  useEffect(() => {
    setActiveDraftCount(draftList.reduce((acc, curr) => acc + curr.isActive ? 1 : 0, 0))
  }, [draftList])

  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = action => {
    if (action === 'edit') {
      navigate(`${location.pathname}/form`, { state: { device } })
    } else if (action === 'draft') {
      // TODO: navigate to drafts - draftlist will prioritize drafts belonging to this device
      console.log('nav to drafts of device', device)
    } else {
      throw new Error(`Invalid click action: ${action}`)
    }
  }

  return (
    <article className='device'>
      <Image
        imageURL={ imageURL }
        alt='device logo'
        customClass='device-image'
      />
      <div className='right-side'>
        <div className='device-identifier'>
          <span>{ title ? title : name }</span>
          <Locale { ...locale } />
        </div>
        <div className='device-button-container'>
          <Button
            text='Edit Device'
            customClass='device-edit-button'
            onClick={ () => handleOnClick('edit') }
            isFlat={ true }
          />
          <Divider color='secondary-dark' />
          <Button
            text={ `${activeDraftCount} Active Drafts`}
            customClass='draft-count-button'
            ariaLabel='nav to drafts by device'
            onClick={ () => handleOnClick('draft') }
            isFlat={ true }
          />
        </div>
      </div>
    </article>
  )
}


export default React.memo(Device)
