import React from 'react'

import Button  from '../Button/Button'
import Divider from '../Divider/Divider'

import './ButtonGroup.css'


function ButtonGroup({ buttons, customClass = '' }) {
  if (!buttons || !buttons.length) return <></>

  return (
    <div className={`draft-buttons-container ${customClass}`}>
      {
        buttons.map((buttonProps, index) => {
          const button = <Button key={ index } { ...buttonProps } />
          if (index === 0) return button
          return <>
            <Divider color='light' direction='vertical' />
            { button }
          </>
        })
      }
    </div>
  )
}


export default React.memo(ButtonGroup)
