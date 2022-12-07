import React, { useEffect, useState } from 'react'

import Overlay from '../../Overlay/Overlay'

import './Spinner.css'


function Spinner({ text, customClass = '' }) {
  const [ messageText, setMessageText ] = useState('Loading...')

  useEffect(() => {
    if (text && text.length < 12) setMessageText(text)
  }, [text])

  return (
    <div className={ `spinner-container ${customClass}` }>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className='spinner-svg'
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="42"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          textLength="75%"
        >
          { messageText }
        </text>
      </svg>
    </div>
  )
}


export default React.memo(Overlay(Spinner))
