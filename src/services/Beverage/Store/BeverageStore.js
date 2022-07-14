class BeverageStore {
  constructor() {
    if (BeverageStore._instance) return BeverageStore._instance
    BeverageStore._instance = this
    this.storageKey = 'beverages'
    this.beverages = {} // core beverage defs
  }

  getBeverage(id) {
    return this.beverages[id]
  }

  getBeverages(ids) {
    return ids.map(id => this.getBeverage(id)).filter(beverage => !!beverage)
  }

  setBeverage(beverage) {
    if (beverage.hasOwnProperty('_id')) {
      beverage = this.prepareBeverage(beverage)
    }
    this.beverages = { ...this.beverages, ...beverage }
    console.log('new beverage store', this.beverages)
  }

  prepareBeverage(beverage) {
    return { [beverage._id]: beverage }
  }

  setBeverages(beverages) {
    this.setBeverage(beverages.reduce((acc, curr) => ({ ...acc, ...this.prepareBeverage(curr)}), {}))
  }

  clearBeverages() {
    this.beverages = {}
    this.storeBeverages()
  }

  loadBeverages() {
    this.beverages = JSON.parse(localStorage.getItem(this.storageKey))
  }

  storeBeverages() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.beverages))
  }
}

const beverageStore = new BeverageStore()

export default beverageStore
