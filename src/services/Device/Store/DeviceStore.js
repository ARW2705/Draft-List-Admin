import storageService from '../../Storage/Storage'
import { DEVICES_STORE_NAME } from '../../../shared/constants/db-store-names'


class DeviceStore {
  constructor() {
    if (DeviceStore._instance) return DeviceStore._instance
    DeviceStore._instance = this
  }

  async getDevice(id) {
    return await storageService.get(DEVICES_STORE_NAME, id)
  }

  async getDevices(ids) {
    return (await storageService.getMany(DEVICES_STORE_NAME, ids)).filter(device => !!device)
  }

  async setDevice(device) {
    await storageService.set(DEVICES_STORE_NAME, device)
  }

  async setDevices(devices) {
    await storageService.setMany(DEVICES_STORE_NAME, devices)
  }
}


const deviceStore = new DeviceStore()

export default deviceStore
