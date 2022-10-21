import storageService from '../../Storage/Storage'
import { BEVERAGES_STORE_NAME } from '../../../shared/constants/db-store-names'


class BeverageStore {
  constructor() {
    if (BeverageStore._instance) return BeverageStore._instance
    BeverageStore._instance = this
  }

  async getBeverage(id) {
    return await storageService.get(BEVERAGES_STORE_NAME, id)
  }

  async getBeverages(ids) {
    return (await storageService.getMany(BEVERAGES_STORE_NAME, ids)).filter(device => !!device)
  }

  async setBeverage(device) {
    await storageService.set(BEVERAGES_STORE_NAME, device)
  }

  async setBeverages(devices) {
    await storageService.setMany(BEVERAGES_STORE_NAME, devices)
  }
}

const beverageStore = new BeverageStore()

export default beverageStore
