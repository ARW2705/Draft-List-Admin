import storageService from '../../Storage/Storage'
import {
  QUERY_NAME_STORE_NAME,
  QUERY_SOURCE_STORE_NAME,
  QUERY_STYLE_STORE_NAME
} from '../../../shared/constants/db-store-names'
import getPaginated from '../../../shared/utilities/get-paginated'


class BeverageQuery {
  constructor() {
    if (BeverageQuery._instance) return BeverageQuery._instance
    BeverageQuery._instance = this
  }

  getQueryStoreName(type) {
    switch(type) {
      case 'name':
        return QUERY_NAME_STORE_NAME
      case 'source':
        return QUERY_SOURCE_STORE_NAME
      case 'style':
        return QUERY_STYLE_STORE_NAME
      default:
        throw new Error(`Invalid query term: ${type}`)
    }
  }

  async getByQuery(type, term, page, count) {
    const fromDB = storageService.get(this.getQueryStoreName(type), term)
    if (fromDB?.length) {
      return page && count ? getPaginated(fromDB, page, count) : fromDB
    }
    return []
  }

  async setQuery(type, term, beverages) {
    const unique = new Set()
    let newQueries = await this.getByQuery(type, term)
    newQueries.forEach(id => unique.add(id))
    beverages.forEach(beverage => {
      if (!unique.has(beverage._id)) {
        newQueries = [...newQueries, beverage._id]
      }
    })

    return await storageService.set(this.getQueryStoreName(type), newQueries, term)
  }
}

const beverageQueryCache = new BeverageQuery()


export default beverageQueryCache
