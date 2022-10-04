import { getDeviceById as getDeviceByIdFromServer, postDevice, patchDevice, confirmDevice } from './Http/DeviceHttp'
import deviceStore from './Store/DeviceStore'
import userService from '../User/User'
import buildGapRequests from '../../shared/utilities/build-gap-requests'


async function getDevices() {
  const idList = userService.getDeviceList()
  let storedDevices = deviceStore.getDevices(idList)
  if (idList.length === storedDevices.length) {
    return { devices: storedDevices, errors: [] }
  }

  const responses = await Promise.allSettled(
    buildGapRequests(idList, storedDevices, getDeviceByIdFromServer)
  )
  let devices = [], errors = []
  responses.forEach(response => {
    if (response.status === 'fulfilled') {
      devices = [...devices, response.value]
    } else {
      errors = [...errors, response.reason]
    }
  })

  deviceStore.setDevices(devices)
  return { devices, errors }
}

function getDeviceById(deviceId) {
  if (!userService.getDeviceList().includes(deviceId)) {
    throw new Error('Device does not belong to user')
  }
  return deviceStore.getDevice(deviceId) 
}

async function addNewDevice(device) {
  const deviceResponse = await postDevice(device)
  deviceStore.setDevice(deviceResponse)
  await userService.refreshUserDataFromServer()
  return deviceResponse
}

async function updateDevice(deviceId, deviceData) {
  const deviceResponse = await patchDevice(deviceId, deviceData)
  deviceStore.setDevice(deviceResponse)
  return deviceResponse
}

async function confirm(confirmation) {
  return await confirmDevice(confirmation)
}

function addDraftToDevice(deviceId, newDraft) {
  const device = deviceStore.getDevice(deviceId)
  device.draftList = [...device.draftList, newDraft._id]
  deviceStore.setDevice(device)
}


export {
  getDevices,
  getDeviceById,
  addNewDevice,
  updateDevice,
  confirm,
  addDraftToDevice
}
