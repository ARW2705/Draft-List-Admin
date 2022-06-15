class BeverageStore {
  constructor() {
    if (BeverageStore._instance) return BeverageStore._instance
    BeverageStore._instance = this
    this.beverages = {} // core beverage defs
  }

  getBeverage(id) {
    return this.beverages[id]
  }

  getBeverages(ids) {
    return ids.map(id => this.getBeverage(id)).filter(beverage => !!beverage)
  }

  setBeverage(beverage) {
    this.beverages = { ...this.beverages, ...beverage }
  }

  setBeverages(beverages) {
    this.setBeverage(beverages.reduce((acc, curr) => ({ ...acc, [curr._id]: curr}), {}))
  }
}

const beverageStore = new BeverageStore()

export default beverageStore
