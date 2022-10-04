import React, { useEffect, useState } from 'react'

import DropDown from '../../../Common/DropDown/DropDown'

import { getAllContainers } from '../../../../services/Container/Container'

import './ContainerSelect.css'


function ContainerSelect({ onSelect: handleOnSelect }) {
  const [ containerOptions, setContainerOptions ] = useState([])
  const [ containers, setContainers ] = useState([])

  const handleSelect = name => {
    for (const key in containers) {
      if (containers[key].name.toLowerCase() === name.toLowerCase()) {
        handleOnSelect(containers[key])
      }
    }
  }

  useEffect(() => {
    async function getContainers() {
      const containers = await getAllContainers()
      let containerNames = []
      for (const key in containers) {
        containerNames = [...containerNames, containers[key].name]
      }
      setContainers(containers)
      setContainerOptions(containerNames)
    }
    getContainers()
  }, [])

  return (
    <div className='container-selection'>
      <DropDown
        title='Select a Container'
        items={ containerOptions }
        customClass='container-dropdown'
        onSelect={ handleSelect }
      />
    </div>
  )
}


export default React.memo(ContainerSelect)
