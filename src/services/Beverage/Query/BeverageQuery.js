import getPaginated from '../../../shared/utilities/get-paginated'


class BeverageQuery {
  constructor() {
    if (BeverageQuery._instance) return BeverageQuery._instance
    BeverageQuery._instance = this
    this.storageKey = 'queries'
    const storedQueries = this.loadCache()
    if (storedQueries) {
      this.queries = storedQueries
    } else {
      this.queries = {
        name: {},
        source: {},
        style: {}
      }
    }
  }

  getIdsByQuery(type, term, page, count) {
    const fromCache = this.queries[type][term]
    if (fromCache?.length) {
      return getPaginated(fromCache, page, count)
    }
    return []
  }

  cacheQuery(type, term, beverages) {
    const fromCurrentQuery = this.queries[type][term] || []
    this.queries = {
      ...this.queries,
      [type]: {
        ...this.queries[type],
        [term]: [...fromCurrentQuery, ...(beverages.map(beverage => beverage._id))]
      }
    }
    console.log('query cache update', this.queries)
  }

  clearCache() {
    this.queries = {
      name: {},
      source: {},
      style: {}
    }
    this.storeCache()
  }

  loadCache() {
    return JSON.parse(localStorage.getItem(this.storageKey))
  }

  storeCache() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.queries))
  }
}

const beverageQueryCache = new BeverageQuery()


export default beverageQueryCache
