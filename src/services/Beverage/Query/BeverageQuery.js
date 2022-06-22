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
    const unique = new Set()
    let newQueries = this.queries[type][term] || []
    newQueries.forEach(id => unique.add(id))
    beverages.forEach(beverage => {
      if (!unique.has(beverage._id)) {
        newQueries = [...newQueries, beverage._id]
      }
    })

    this.queries = {
      ...this.queries,
      [type]: {
        ...this.queries[type],
        [term]: newQueries
      }
    }
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
