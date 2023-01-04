import React, { Fragment } from 'react'

import Button  from '../Button/Button'
import Divider from '../Divider/Divider'

import './ButtonGroup.css'


function ButtonGroup({ buttons, direction = 'horizontal', dividerColor = 'primary', customClass = '' }) {
  if (!buttons || !buttons.length) return <></>

  const isHorizontal = direction === 'horizontal'

  return (
    <div className={`buttons-container button-direction-${direction} ${customClass}`}>
      {
        buttons.map((buttonProps, index) => {
          if (index === 0) return <Button key={ index } { ...buttonProps } />
          
          return (
            <Fragment key={ index }>
              <Divider color={ dividerColor } direction={ isHorizontal ? 'vertical' : 'horizontal'} />
              <Button { ...buttonProps } />
            </Fragment>
          )
        })
      }
    </div>
  )
}


export default React.memo(ButtonGroup)
