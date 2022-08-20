import React, { useEffect, useState } from 'react'

import { getBeverageById } from '../../../services/Beverage/Beverage'

import './Draft.css'


function Draft({ draft, onClick: handleOnClick }) {
  const { container } = draft
  const { quantity, containerInfo, contentColor } = container
  const { type, name, capacity } = containerInfo
  const [ beverage, setBeverage ] = useState(null)

  useEffect(() => {
    async function getBeverage() {
      setBeverage(await getBeverageById(draft.beverage))
    }
    getBeverage()
  }, [setBeverage, draft.beverage])

  return (
    <div className='draft-container'>
      <span>{ beverage.title || beverage.name }</span>
      <span>{ name }</span>
    </div>
  )
}


export default React.memo(Draft)
