import { BASE_URL } from './base-url.js'

const getImageURL = endpoint => {
  return `${BASE_URL}/images/client/${endpoint}`
}

export default getImageURL
