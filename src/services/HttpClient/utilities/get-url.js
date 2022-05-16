import { BASE_URL } from './base-url'

const getBeverageURL = endpoint => {
  const route = endpoint ? `/${endpoint}` : ''
  return `${BASE_URL}/beverages${route}`
}

const getDeviceURL = endpoint => {
  const route = endpoint ? `/${endpoint}` : ''
  return `${BASE_URL}/devices/admin${route}`
}

const getDraftURL = endpoint => {
  const route = endpoint ? `/${endpoint}` : ''
  return `${BASE_URL}/draft${route}`
}

const getImageURL = endpoint => {
  return `${BASE_URL}/images/client/${endpoint}`
}

const getUserURL = endpoint => {
  const route = endpoint ? `/${endpoint}` : ''
  return `${BASE_URL}/users${route}`
}

export {
  getBeverageURL,
  getDeviceURL,
  getDraftURL,
  getImageURL,
  getUserURL
}
