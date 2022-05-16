import React, { useState, useEffect } from 'react'

import DraftCallout from '../DraftCallout/DraftCallout'

import deviceService from '../../services/Device/Device.service'

import './DeviceCallout'


function DeviceCallout(props) {
  const { deviceId } = props

  const [ device, setDevice ] = useState({
    isLoading: true,
    title: '',
    imageURL: '',
    locale: {},
    draftComponents: []
  })

  useEffect(() => {
    const subscription = deviceService.getDeviceById(deviceId)
      .subscribe(device => {
        const { name, title, imageURL, locale, draftList } = device
        const useTitle = title || name
        const draftComponents = draftList.map(draft => {
          return <DraftCallout key={ draft._id } draft={ draft } />
        })

        setDevice({
          draftComponents,
          imageURL,
          locale,
          isLoading: false,
          title: useTitle,
        })
      })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <section className="DeviceCallout">
      { device.draftComponents }
    </section>
  )
}

export default React.memo(DeviceCallout)
