import { openDB } from 'idb'
import {
  DEVICES_STORE_NAME,
  BEVERAGES_STORE_NAME,
  DRAFTS_STORE_NAME,
  IMAGES_STORE_NAME,
  CONTAINERS_STORE_NAME,
  QUERY_NAME_STORE_NAME,
  QUERY_SOURCE_STORE_NAME,
  QUERY_STYLE_STORE_NAME
} from '../../shared/constants/db-store-names'


class Storage {
  constructor() {
    if (Storage._instance) return Storage._instance
    Storage._instance = this
    this.dbName = 'draft-list-admin-db'
    this.initDB()
  }

  async initDB() {
    this._db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore(IMAGES_STORE_NAME)
        db.createObjectStore(QUERY_NAME_STORE_NAME)
        db.createObjectStore(QUERY_SOURCE_STORE_NAME)
        db.createObjectStore(QUERY_STYLE_STORE_NAME)
        
        db.createObjectStore(DEVICES_STORE_NAME   , { keyPath: '_id' })
        db.createObjectStore(DRAFTS_STORE_NAME    , { keyPath: '_id' })
        db.createObjectStore(CONTAINERS_STORE_NAME, { keyPath: '_id' })
        
        const beverageStore = db.createObjectStore(BEVERAGES_STORE_NAME , { keyPath: '_id' })
        beverageStore.createIndex('name', 'name')
        beverageStore.createIndex('source', 'source')
        beverageStore.createIndex('style', 'style')
      }
    })
  }

  promisifyAll(promises, allowPartial = false) {
    return allowPartial ? Promise.allSettled(promises) : Promise.all(promises)
  }

  async get(storeName, key) {
    return this._db.get(storeName, key)
  }

  async getMany(storeName, keys) {
    return await this.promisifyAll(keys.map(key => this._db.get(storeName, key)))
  }

  async getAll(storeName) {
    return await this._db.getAll(storeName)
  }

  async set(storeName, value, key) {
    let args = [storeName, value]
    if (key) args = [...args, key]

    return await this._db.put(...args)
  }

  async setMany(storeName, keyVals) {
    const tx = this._db.transaction(storeName, 'readwrite')
    await this.promisifyAll(
      [
        ...keyVals.map(keyVal => Array.isArray(keyVal) ? tx.store.put(...keyVal) : tx.store.put(keyVal)),
        tx.done
      ],
      true
    )
  }

  clear() {
    [
      DEVICES_STORE_NAME,
      BEVERAGES_STORE_NAME,
      DRAFTS_STORE_NAME,
      IMAGES_STORE_NAME,
      CONTAINERS_STORE_NAME,
      QUERY_NAME_STORE_NAME,
      QUERY_SOURCE_STORE_NAME,
      QUERY_STYLE_STORE_NAME
    ]
    .forEach(storeName => this._db.clear(storeName))
  }
}


const storage = new Storage()

export default storage


