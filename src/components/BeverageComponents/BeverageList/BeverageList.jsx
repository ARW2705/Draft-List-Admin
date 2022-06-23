import React, { useEffect, useState } from 'react'

import { getAuthoredBeverages, getPreviousBeverages, getBeveragesByQuery } from '../../../services/Beverage/Beverage'

import Beverage from '../../../components/BeverageComponents/Beverage/Beverage'

import './BeverageList.css'


function BeverageList({ listConfig }) {
  const { listType, pageNum, pageCount, searchType, searchTerm } = listConfig
  const [ components, setComponents ] = useState([])

  const buildComponents = beverages => {
    if (!beverages.length) return <p className='empty-list'>Nothing here...</p>

    return beverages.map(beverage => {
      return (
        <Beverage
          className='beverage-container'
          key={ beverage._id }
          beverage={ beverage }
        />
      )
    })
  }

  useEffect(() => {
    async function getQuery() {
      const { beverages, errors } = await getBeveragesByQuery(searchType, searchTerm, pageNum, pageCount)
      setComponents(buildComponents(beverages))
    }

    if (listType === 'search' && searchType && searchTerm) {
      getQuery()
    }
  }, [listType, searchType, searchTerm, pageNum, pageCount])

  useEffect(() => {
    async function getList() {
      if (listType === 'search') return
      
      let getter = { beverages: [], errors: [] }
      if (listType === 'authored') {
        getter = await getAuthoredBeverages(pageNum, pageCount)
      } else if (listType === 'previous') {
        getter = await getPreviousBeverages(pageNum, pageCount)
      } else {
        throw new Error (`Unknown Beverage list type: ${listType}`)
      }

      const { beverages, errors } = getter
      setComponents(buildComponents(beverages))
    }
    getList()
  }, [listType, pageNum, pageCount])

  return (
    <section className='BeverageList'>
      { components }
    </section>
  )
}


export default React.memo(BeverageList)
