import { getDeviceById as getDeviceByIdFromServer, postDevice, patchDevice, confirmDevice } from './Http/DeviceHttp'
import deviceStore from './Store/DeviceStore'
import userService from '../User/User'
import buildGapRequests from '../../shared/utilities/build-gap-requests'
import { parseAllSettled } from '../../shared/utilities/parse-all-settled'


async function getDevices() {
  const idList = userService.getDeviceList()
  const storedDevices = await deviceStore.getDevices(idList)
  if (idList.length === storedDevices.length) {
    return { devices: storedDevices, errors: [] }
  }

  const responses = await Promise.allSettled(
    buildGapRequests(idList, storedDevices, getDeviceByIdFromServer)
  )
  const { values: devices, errors } = parseAllSettled(responses)
  deviceStore.setDevices(devices)
  return { devices, errors }
}

async function getDeviceById(deviceId) {
  if (!userService.getDeviceList().includes(deviceId)) {
    throw new Error('Device does not belong to user')
  }
  return await deviceStore.getDevice(deviceId) 
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

async function addDraftToDevice(deviceId, newDraft) {
  const device = await deviceStore.getDevice(deviceId)
  device.draftList = [...device.draftList, newDraft._id]
  deviceStore.setDevice(device)
}

async function archiveDraft(deviceId, draftId) {
  const device = await getDeviceById(deviceId)
  const targetDraftIndex = device.draftList.findIndex(draft => draft === draftId)
  if (targetDraftIndex === -1) {
    throw new Error('Draft does not belong to device')
  }

  const draftToArchive = device.draftList[targetDraftIndex]
  device.draftList = [...device.draftList.slice(0, targetDraftIndex), ...device.draftList.slice(targetDraftIndex + 1)]
  const previousDraftIndex = device.previousDraftList.findIndex(previous => previous.draft === draftId)
  
  if (previousDraftIndex === -1) {
    device.previousDraftList = [...device.previousDraftList, { count: 1, draft: draftToArchive }]
  } else {
    device.previousDraftList[previousDraftIndex].count++
  }

  const updatedDevice = await updateDevice(deviceId, { data: device })
  return updatedDevice.draftList
}


export {
  getDevices,
  getDeviceById,
  addNewDevice,
  updateDevice,
  confirm,
  addDraftToDevice,
  archiveDraft
}
