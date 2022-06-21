import getPaginated from '../../../shared/utilities/get-paginated'


class BeverageQuery {
  constructor() {
    if (BeverageQuery._instance) return BeverageQuery._instance
    BeverageQuery._instance = this
    this.queries = {
      name: {},
      source: {},
      style: {}
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
        [term]: [...fromCurrentQuery, ...(beverages.map(beverage => beverage._id))]
      }
    }
  }
}

const beverageQueryCache = new BeverageQuery()


export default beverageQueryCache
