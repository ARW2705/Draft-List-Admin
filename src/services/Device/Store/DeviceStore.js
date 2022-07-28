class DeviceStore {
  constructor() {
    if (DeviceStore._instance) return DeviceStore._instance
    DeviceStore._instance = this
    this.storageKey = 'devices'
    this.devices = {} // core device defs
  }

  getDevice(id) {
    return this.devices[id]
  }

  getDevices(ids) {
    return ids.map(id => this.getDevice(id)).filter(device => !!device)
  }

  setDevice(device) {
    if (device.hasOwnProperty('_id')) {
      device = this.prepareDevice(device)
    }
    this.devices = { ...this.devices, ...device }
    console.log('new device store', this.devices)
  }

  setDevices(devices) {
    this.setDevice(devices.reduce((acc, curr) => ({ ...acc, ...this.prepareDevice(curr)}), {}))
  }

  prepareDevice(device) {
    return { [device._id]: device }
  }

  clearDevices() {
    this.devices = {}
    this.storeDevices()
  }

  loadDevices() {
    this.devices = JSON.parse(localStorage.get(this.storageKey))
  }

  storeDevices() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.devices))
  }
}

const deviceStore = new DeviceStore()

export default deviceStore
