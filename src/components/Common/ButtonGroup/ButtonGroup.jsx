import React from 'react'

import Button from '../Button/Button'

import './ButtonGroup.css'


function ButtonGroup({ buttons, customClass = '' }) {
  if (!buttons || !buttons.length) return <></>

  return (
    <div className={`draft-buttons-container ${customClass}`}>
      { buttons.map((buttonProps, index) => <Button key={ index } { ...buttonProps } />) }
    </div>
  )
}


export default React.memo(ButtonGroup)
