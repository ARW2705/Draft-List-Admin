import { get, patch, post } from '../../HttpClient/HttpClient'
import { deviceRouteURL } from './device-route-url'


function buildFormData(beverageData) {
  const { data, image } = beverageData
  const formData = new FormData()
  formData.append('data', JSON.stringify(data))
  if (image) {
    formData.append('image', image)
  }
  return formData
}

async function getDeviceById(id) {
  return await get(`${deviceRouteURL}/${id}`)
}

async function postDevice(deviceData) {
  return await post(
    deviceRouteURL,
    buildFormData(deviceData),
    { 'Content-Type': 'multipart/form-data' }
  )
}

async function patchDevice(deviceId, deviceData) {
  return await patch(
    `${deviceRouteURL}/${deviceId}`,
    buildFormData(deviceData),
    { 'Content-Type': 'multipart/form-data' }
  )
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
