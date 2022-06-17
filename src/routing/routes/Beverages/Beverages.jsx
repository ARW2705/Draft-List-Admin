import React, { useEffect, useState } from 'react'

import { getAuthoredBeverages } from '../../../services/Beverage/Beverage'

import Beverage from '../../../components/Beverage/Beverage'


function Beverages() {
  const [ authoredListPage, setAuthoredListPage ] = useState(0)
  const [ pageCount, setPageCount ] = useState(25)
  const [ components, setComponents ] = useState([])

  const buildComponents = beverages => {
    return beverages.map(beverage => {
      return <Beverage className='beverage-container' key={ beverage._id } beverage={ beverage } />
    })
  }

  useEffect(() => {
    async function getAuthored() {
      const { beverages, errors } = await getAuthoredBeverages(authoredListPage, pageCount)
      // TODO: decide what to do with errors at this point
      if (beverages.length) {
        setComponents(buildComponents(beverages))
      }
      console.log(beverages)
    }
    getAuthored()
  }, [authoredListPage, pageCount])

  return (
    <main className="route Beverages">
      { components }
    </main>
  )
}

export default Beverages
