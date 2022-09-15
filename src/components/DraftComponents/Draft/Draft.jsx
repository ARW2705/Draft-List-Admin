import React, { useEffect, useState } from 'react'

import { getBeverageById } from '../../../services/Beverage/Beverage'

import SpinnerLoader from '../../Common/Loaders/Spinner/Spinner'

import './Draft.css'


function Draft({ draft, onClick: handleOnClick }) {
  const { container } = draft
  const { quantity, containerInfo, contentColor } = container
  const { type, name: containerName, capacity } = containerInfo
  const [ beverage, setBeverage ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    async function getBeverage() {
      setBeverage(await getBeverageById(draft.beverage))
      setIsLoading(false)
    }
    getBeverage()
  }, [draft.beverage])

  return (
    <div className='draft-container'>
      {
        isLoading
        ? <SpinnerLoader />
        : (
          <>
            <span>•{ beverage.title || beverage.name }</span>
            <span>•{ containerName }</span>
            <span>•Remaining: { Math.floor(quantity * 100 / capacity) } %</span>
          </>
        )
      }
    </div>
  )
}


export default React.memo(Draft)
