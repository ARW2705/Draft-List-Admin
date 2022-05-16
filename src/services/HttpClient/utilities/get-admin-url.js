import { BASE_URL } from './base-url'

const getClientURL = endpoint => {
  return `${BASE_URL}/devices/admin/${endpoint}`
}

export default getClientURL
