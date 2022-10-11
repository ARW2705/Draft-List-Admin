import { get, set, update, clear } from 'idb-keyval'


class Storage {
  constructor() {
    if (Storage._instance) return Storage._instance
    Storage._instance = this
  }

  async setItem(key, val) {
    try {
      await set(key, val)
      console.log(`${key} stored`)
    } catch(error) {
      console.log(`Failed to store ${key}: ${error}`)
    }
  }

  async getItem(key) {
    return await get(key)
  }

  updateItem(key, newVal) {
    update(key, () => newVal)
  }

  clearItems() {
    clear()
  }
}

const storage = new Storage()

export default storage
