import {
  get     as IDB_get,
  getMany as IDB_getMany,
  set     as IDB_set,
  update  as IDB_update,
  del     as IDB_del,
  delMany as IDB_delMany
} from 'idb-keyval'


class DeviceStore {
  constructor() {
    if (DeviceStore._instance) return DeviceStore._instance
    DeviceStore._instance = this
    this.keyStore = 'device-ids'
    this.init()
  }

  async init() {
    const keys = await IDB_get(this.keyStore)
    if (!keys) await IDB_set(this.keyStore, [])
  }

  async setDevice(device) {
    await IDB_update(this.keyStore, ids => {
      if (!ids.includes(device._id)) return [...ids, device._id]
      return ids
    })
    await IDB_set(device._id, device)
  }

  async setDevices(devices) {
    return await Promise.allSettled(devices.map(async device => {
      const entry = await IDB_get(device._id)
      if (entry) {
        return IDB_update(device._id, () => device)
      } else {
        return IDB_set(device._id, device)
      }
    }))
  }

  async deleteDevice(deviceId) {
    const ids = await IDB_get(this.keyStore)
    const idIndex = ids.findIndex(id => id === deviceId)
    let newIds = []
    if (idIndex !== -1) {
      newIds = [...ids.slice(0, idIndex), ...ids.slice(idIndex + 1)]
    }

    if (newIds.length) {
      await IDB_update(this.keyStore, ids => [...ids, ...newIds])
    }

    await IDB_del(deviceId)
  }

  async getDevice(id) {
    return await IDB_get(id)
  }

  async getDevices(ids) {
    return (await IDB_getMany(ids)).filter(device => !!device)
  }

  async clearDevices() {
    let keysToDelete = []
    for (const key of this.devices.keys()) {
      keysToDelete = [...keysToDelete, key]
    }

    await IDB_delMany(keysToDelete)
    await IDB_update(this.keyStore, () => [])
  }
}


const deviceStore = new DeviceStore()

export default deviceStore
