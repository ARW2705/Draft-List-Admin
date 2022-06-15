import beverageStore from '../Store/BeverageStore'
import { get } from '../../HttpClient/HttpClient'
import { beverageRouteURL } from '../../shared/urls/beverage'
import { getPage } from '../../shared/utilities/get-page'


class BeverageQueryCache {
  constructor() {
    if (BeverageQueryCache._instance) return BeverageQueryCache._instance
    BeverageQueryCache._instance = this
    this.queries = {}
  }

  async getCache(term, page, limit) {
    const fromCache = this.queries[term]
    if (fromCache) {
      const selectedPage = getPage(fromCache, page, limit)
      if (selectedPage.length === limit) return selectedPage
    }
    
    const response = await get(beverageRouteURL, { term })
    this.setCache(response)
    return response
  }

  setCache(response) {

  }

  setQueriedCache(type, key, beverages) {
    switch(type) {
      case 'name':
        this.setBeveragesQueriedByName(key, beverages)
        break
      case 'source':
        this.setBeveragesQueriedBySource(key, beverages)
        break
      case 'style':
        this.setBeveragesQueriedByStyle(key, beverages)
        break
      default:
        throw new Error(`Cannot set query with type ${type}`)
    }
  }

  setBeveragesQueriedByName(name, beverages) {
    this.queriedNames = { ...this.queriedNames, [name]: beverages.map(beverage => beverage._id) }
    beverageStore.setBeverages(beverages)
  }

  setBeveragesQueriedBySource(source, beverages) {
    this.queriedSources = { ...this.queriedSources, [source]: beverages.map(beverage => beverage._id) }
    beverageStore.setBeverages(beverages)
  }

  setBeveragesQueriedByStyle(style, beverages) {
    this.queriedStyles = { ...this.queriedStyles, [style]: beverages.map(beverage => beverage._id) }
    beverageStore.setBeverages(beverages)
  }
}

const beverageQueryCache = new BeverageQueryCache()

export default beverageQueryCache
