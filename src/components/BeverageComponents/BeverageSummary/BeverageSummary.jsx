import React from 'react'

import './BeverageSummary.css'


function BeverageSummary({ source, abv, ibu, srm, description }) {
  return (
    <div className='BeverageSummary'>
      <p>{ source }</p>
      <p>{ abv }</p>
      <p>{ ibu }</p>
      <p>{ srm }</p>
      <p>{ description }</p>
    </div>
  )
}


export default React.memo(BeverageSummary)
