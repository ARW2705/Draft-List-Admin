import storageService from '../../Storage/Storage'


class DeviceStore {
  constructor() {
    if (DeviceStore._instance) return DeviceStore._instance
    DeviceStore._instance = this
    this.keyStore = 'device-ids'
    this.devices = new Map()
    this.loadDevices()
  }

  setDevice(device) {
    this.devices.set(device._id, device)
    this.storeDevice(device)
  }

  deleteDevice(deviceId) {
    this.devices.delete(deviceId)
    this.removeDeviceFromStorage(deviceId)
  }

  getDevice(id) {
    return this.devices.get(id)
  }

  getDevices(ids) {
    return ids.map(id => this.getDevice(id)).filter(device => !!device)
  }

  async clearDevices() {
    let keysToDelete = []
    for (const key of this.devices.keys()) {
      keysToDelete = [...keysToDelete, key]
    }
    this.devices.clear()
    await storageService.delMany([this.keyStore, ...keysToDelete])
  }

  async loadDevices() {
    const deviceIds = await storageService.get(this.keyStore)
    if (!deviceIds) {
      storageService.set(this.keyStore, [])
    }

    const devices = await storageService.getMany(deviceIds)
    if (devices.length) devices.forEach(device => this.setDevice(device))
    
    console.log('loaded devices from storage', this.devices)
  }

  async storeDevice(device) {
    await storageService.update(this.keyStore, ids => ([...ids, device._id]))
    await storageService.set(device._id, device)
  }

  async removeDeviceFromStorage(deviceId) {
    const ids = await storageService.get(this.keyStore)
    const idIndex = ids.findIndex(id => id === deviceId)
    let newIds = []
    if (idIndex !== -1) {
      newIds = [...ids.slice(0, idIndex), ...ids.slice(idIndex + 1)]
    }

    if (newIds.length) {
      await storageService.update(this.keyStore, newIds)
    }

    await storageService.del(deviceId)
  }
}


const deviceStore = new DeviceStore()

export default deviceStore
