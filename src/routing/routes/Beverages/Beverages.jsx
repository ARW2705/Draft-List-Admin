import React, { useEffect, useState } from 'react'

import { getAuthoredBeverages } from '../../../services/Beverage/Beverage'


function Beverages() {
  const [ authoredListPage, setAuthoredListPage ] = useState(0)
  const [ pageCount, setPageCount ] = useState(25)
  const [ beverageList, setBeverageList ] = useState([])

  useEffect(() => {
    async function getAuthored() {
      const beverages = await getAuthoredBeverages(authoredListPage, pageCount)
      console.log(beverages)
      setBeverageList(beverages)
    }
    getAuthored()
  }, [ authoredListPage, pageCount ])

  return (
    <main className="route Beverages">
      Test Beverages
    </main>
  )
}

export default Beverages
