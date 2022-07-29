import React from 'react'

import Overlay from '../../Overlay/Overlay'

import './Spinner.css'


function Spinner({ text = 'Loading...', customClass = '' }) {
  return (
    <div className={ `spinner-container ${customClass}` }>
      <svg
        className='spinner-svg'
        viewBox="0 0 100 100"
      >
        <circle
          cx="50%"
          cy="50%"
          r="42"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          { text }
        </text>
      </svg>
    </div>
  )
}


export default React.memo(Overlay(Spinner))
