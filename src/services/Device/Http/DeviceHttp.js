import { get, patch, post } from '../../HttpClient/HttpClient'
import { deviceRouteURL } from './device-route-url'


async function getDeviceById(id) {
  return await get(`${deviceRouteURL}/${id}`)
}

async function postDevice(deviceData) {
  return await post(deviceRouteURL, deviceData)
}

async function patchDevice(device) {
  return await patch(`${deviceRouteURL}/${device._id}`, device)
}

async function confirmDevice(confirmation) {
  return await post(`${deviceRouteURL}/confirm`, confirmation)
}


export {
  getDeviceById,
  postDevice,
  patchDevice,
  confirmDevice
}
