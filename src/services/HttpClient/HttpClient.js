import axios from 'axios'

import intercept from './interceptors/interceptors'


intercept(axios) // apply interceptors to axios instance

async function request(config) {
  const response = await axios(config)
  return response.data
}

function get(url, params = {}) {
  return request({ method: 'get', url, params })
}

function post(url, data) {
  return request({ method: 'post', url, data })
}

function patch(url, data) {
  return request({ method: 'patch', url, data })
}

export {
  get,
  post,
  patch
}
