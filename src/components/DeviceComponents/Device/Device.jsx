import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useMediaQueries } from '../../../shared/hooks/media-query/media-queries-hook'

import { selectDevice } from '../../../services/device/store/device.selector'

import ButtonGroup from '../../Common/ButtonGroup/ButtonGroup'
import Image       from '../../Common/Image/Image'
import Locale      from '../../Locale/Locale'

import './Device.css'


function Device({ deviceId }) {
  const device = useSelector(state => selectDevice(state, deviceId))
  const { name, title, imageURL, locale, draftList } = device
  const [ activeDraftCount, setActiveDraftCount ] = useState(null)
  const { xs: isExtraSmallScreen, sm: isSmallScreen } = useMediaQueries(['xs', 'sm'])

  useEffect(() => {
    setActiveDraftCount(draftList.length)
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

  const buttons = [
    {
      customClass: 'device-edit-button',
      isFlat: true,
      name: 'edit-device',
      ariaLabel: 'edit this draft',
      text: 'Edit Device',
      onClick: () => handleOnClick('edit')
    },
    {
      customClass: 'draft-count-button',
      isFlat: true,
      name: 'draft-count-button',
      ariaLabel: 'nav to drafts by device',
      text: `${activeDraftCount} Active Draft${activeDraftCount === 1 ? '' : 's'}`,
      onClick: () => handleOnClick('draft')
    }
  ]

  return (
    <article className='device'>
      <Image
        imageURL={ imageURL }
        alt='device logo'
        customClass='device-image'
      />
      <div className='device-identifier'>
        <span>{ title ? title : name }</span>
        <Locale { ...locale } />
      </div>
      <ButtonGroup
        customClass='device-buttons'
        buttons={ buttons }
        direction={ isExtraSmallScreen || isSmallScreen ? 'vertical' : 'horizontal' }
        dividerColor='primary-light'
      />
    </article>
  )
}


export default React.memo(Device)
