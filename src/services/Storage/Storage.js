import {
  get as _get,
  getMany as _getMany,
  set as _set,
  setMany as _setMany,
  update as _update,
  clear as _clear,
  del as _del,
  delMany as _delMany
} from 'idb-keyval'


class Storage {
  constructor() {
    if (Storage._instance) return Storage._instance
    Storage._instance = this
  }

  async set(key, val) {
    try {
      await _set(key, val)
      console.log(`${key} stored`)
    } catch(error) {
      console.log(`Failed to store ${key}: ${error}`)
    }
  }

  async setMany(items) {
    try {
      await _setMany(items)
      console.log('items stored')
    } catch(error) {
      console.log(`Failed to set: ${error}`)
    }
  }

  async get(key) {
    return await _get(key)
  }

  async getMany(keys) {
    return await _getMany(keys)
  }

  async update(key, updateFn) {
    await _update(key, updateFn)
  }

  async del(key) {
    await _del(key)
  }

  async delMany(keys) {
    await _delMany(keys)
  }

  async clear() {
    await _clear()
  }
}

const storage = new Storage()

export default storage
