import React, { useEffect, useState } from 'react'

import toTitleCase from '../../../shared/utilities/title-case'

import './SimpleView.css'


function SimpleView({ keysToDisplay, data, customClass, onClick: handleOnClick }) {
  const [ datapoints, setDatapoints ] = useState([])
  
  useEffect(() => {
    setDatapoints(
      keysToDisplay.map(key => {
        return data.hasOwnProperty(key) 
          ? <span key={ key } className='simple-view-item'>{ toTitleCase(data[key]) }</span>
          : null
      })
      .filter(elem => elem !== null)
    )
  }, [keysToDisplay, data])

  return (
    <div
      className={ `simple-view-container ${customClass || ''}` }
      onClick={ e => handleOnClick(e, data) }
    >
      { datapoints }
    </div>
  )
}


export default React.memo(SimpleView)
